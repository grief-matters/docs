---
title: Architecture
---

What do **_we_** mean when use the term architecture at **Grief Matters**?

Architecture is the set of conventions, structure and design choices, that make your path forward as a contributing developer intuitive.

Good architecture should act as a guide, so you spend less time finding your way, and more time building.

## Guiding Principles

Our architecture serves as a guide, not a diktat. If you identify something that's not working, is confusing, or just slowing you down, let someone know. Propose a change!

If you do propose a change, make sure it aligns to our guiding principles:

### 1. Break out _when_ not _if_

We introduce new abstractions and extract code **_when_** things get difficult, not **_if_** they might be in the future.

### 2. Simplicity! Forever and Always!

If there is a simple solution to a specific problem, choose it!

### 3. It's Just Text

Sometimes we have ideas that start out great enough but become really painful when scaled or when something else changes. Don't be precious - it's just text. We can always write more.

But that's closely related to...

### 4. If It Aint Broke

There's simply no motivation to change something if it's a solved problem for us and working well. If that wheel is already invented - leave it rolling.

## CMS vs. Website: What Goes Where?

One of the core objectives of a headless CMS is to decouple content from presentation. A good way to explain this is that the CMS should only ever define **what** should be presented; and never **how** it should be presented.

In reality, this can be hard to reason, and the distinction between the two blurry. For example, we have a `HomePage` content type that describes the content for the home page that, at first glance, appears to have structures defined within it intrinsically linked to the presentation (e.g. `Feature Panel` and `Row of Three`). What gives? These blurry lines are created ny wanting to use familiar language, whilst we use the term 'Home Page' we could have perhaps used something like `LeadingContent` or `EntryPoint` to _unwebify_ the term (for now, HomePage will do fine 😅).

In a nutshell, if you find yourself having to introduce or reshape content in the website project, then its likely better done through new or changed content types in the CMS. On the flip-side, you should never find yourself creating things in the CMS like "Fancy Heading" or "Left Aligned Paragraph".

A great example of getting this wrong would be the original top-level navigation. Initially this was reshaped from the "Topics" in the CMS to make it fit our navigation needs. Taking a step back, defining top-level navigation as a content type in the CMS makes more sense. Abstracting it further, we could use the term `ContentPathways`. In reality we're probably only ever going to use this for top-level navigation of the website, but trying to remove the "webbyness" of the concept helps us to make good decisions about content definitions.

## End-to-End

We can break down the process of how data flows from the Sanity Content Lake to our web pages into a few steps:

1. Define a data model to establish the structure and validation rules for our data.
2. Create functions to fetch and validate data according to these models.
3. Invoke these functions within our Astro component scripts and inject the data into our component templates.
4. Compose pages by combining our Astro components.

Let's dive deeper into each step

### Defining The Data Model

We use the term **Model** to represent the structures that define and validate the shape of data used throughout the application. By establishing clear rules for data, we ensure that incoming data from the backend aligns with our expectations. This approach simplifies data management, minimizes errors, and enhances maintainability across the project.

Our models consist of three components co-located in a single file inside the `model` folder, named after what best describes the entity we are defining, using a singular noun. For example, the one we'll be using in the following sections is named `population.ts`

The three components that make up a model are...

#### Zod Schemas

Zod schemas define the structure and rules for validating data, ensuring it matches the expected format and types.

The schemas use the naming convention `z{entity}` (`z` for Zod). For more information on building Zod schemas see the [docs](https://zod.dev). But there's plenty of existing schemas to reference.

Here's an example based on our "population" Sanity content type:

```ts
export const zPopulation = z.object({
  name: z.string(),
  slug: z.string(),
  description: z.string().nullable(),
  underserved: z.boolean(),
});
```

:::tip
Don't be scared of breaking out chunks of schema into their own smaller schemas if it helps with readability, or if you're using the same structures over and again.
:::

#### GROQ Queries

[GROQ](https://www.sanity.io/docs/groq) is a query language for retrieving and manipulating data from Sanity's Content Lake.

We define our queries as part of our model as its much easier to manage them alongside the schemas (when you change a query, you normally need to update the Zod schema).

The queries use the naming convention `g{entity}Query` and `g{entity}Projection`. A complete GROQ query will usually include a selector (almost always `*` meaning everything), passed through a filter, followed by a projection. For our purposes, a snippet of GROQ that will work as a complete, is named using the `g{entity}Query` convention. Those using the `g{entity}Projection` convention will usually be wrapped inside of a larger query using a template literal.

GROQ queries are written as template literals, passed through the `groq` template tag, which provides syntax highlighting and other features (provided via the [Sanity extension](https://marketplace.visualstudio.com/items?itemName=sanity-io.vscode-sanity)).

Here's an example that fetches a specific "population" document where `slug.current` matches the given parameter:

```ts
export const gPopulationQuery = groq`
*[_type == "population" && slug.current == $population][0]{
  name,
  "slug": slug.current,
  description,
  underserved
}
`;
```

If we were to extract the projection (purely to illustrate how the naming conventions are applied) it might look something like this:

```ts
const gPopulationProjection = groq`
  name,
  "slug": slug.current,
  description,
  underserved
`;

export const gPopulationQuery = groq`
*[_type == "population" && slug.current == $population][0]{
  ${gPopulationProjection}
}
`;
```

Using GROQ effectively is outside of the scope of these docs, but I'd encourage you to [read up](https://www.sanity.io/docs/groq) and [experiment](https://groq.dev)

#### Inferred Types

Finally, we create the TypeScript types that we can use throughout our application, using Zod's `infer` function:

```ts
export type Population = z.infer<typeof zPopulation>;
```

### Defining Functions To Fetch And Validate Data

We keep everything to do with fetching data and validating against our models inside `src/common/client.ts`.

This file contains an instance of a [Sanity client](https://www.sanity.io/docs/js-client)...

```ts
export const client = createClient({
  projectId: import.meta.env.SANITY_STUDIO_PROJECT_ID,
  dataset: import.meta.env.SANITY_STUDIO_DATASET,
  useCdn: true,
  apiVersion: import.meta.env.SANITY_STUDIO_API_VERSION,
});
```

...and a bunch of functions that return type-safe data that can be imported into our components where needed.

Here's an example that fetches all "populations" (the content type we modelled in [the previous section](#defining-the-data-model)):

```ts
export async function getPopulations(): Promise<Population[]> {
  const populations = await client
    .fetch(gPopulationsQuery)
    .then((result) => zPopulation.array().parse(result));

  return populations;
}
```

There's not a lot to it. We call the client's `fetch` function (`client.fetch(query, params = {})`) using the query that we defined in our model, then using the `parse` function on our Zod schema o validate the result. If the data does not conform to our model, Zod will throw an error.

And it really is that simple.

The `client.fetch` function also accepts a `params` object as a second argument if your query uses [parameters](https://www.sanity.io/docs/groq-parameters). See `getCategoriesByFilter` in the `client` as an example.

:::note
Most things inside the "client" are Sanity related. If we fetch data from other sources in the future we _might_ want to co-locate that stuff here so we don't need to care what comes from where inside our components. There's also stuff in there that we _might_ want to move elsewhere at some point such as the `imageBuilder`, but for now it's fine.
:::

### Getting Data In Your Components

[[TODO]]

## Project Structure

### Model

Files in the **Model** folder collect together the queries, Zod schemas and Types required to build the data models our Astro components need. They serve both the `client` and to provide types to the component.

### Common

A home for everything non-Astro that is shared throughout the project. It contains some important files like the `client` and the `design-system` but also files containing a single helper like `route`.

As a rule fo thumb, if you need a helper across more than 3 components, consider sticking it in here somewhere.

### Layouts

The Astro team describe these as:

> We conventionally use the term “layout” for Astro components that provide common UI elements shared across pages such as headers, navigation bars, and footers.

This is pretty much true for our project. **Layouts** is for Astro components responsible for laying out a page, or a section of a page. These won't usually contain anything data related, or much in terms of rendering logic. That should be left to their children. A minimal prop interface is ok if it is necessary to the layout, `ResourcePageLayout` is a good example of this as it uses the `Astro.slots` api to conditionally build the layout.

### Pages

**Pages** are responsible for handling routing, data loading, and overall page layout for every page in the website. It shouldn't contain anything that doesn't ultimately render at a specific path.

Read more about the concept in the [Astro docs](https://docs.astro.build/en/basics/astro-pages/)

### Styles

Should not be used for general styling purposes (all of that should be done at a component level using Tailwind). This should be very much for setting up really "base" CSS config stuff, and is unlikely to extend beyond `main.css`

### UI

We follow a relatively "atomic" approach, but it is far from stable. We have `primitives` for the core UI building blocks from which higher level abstractions can be built, but we've not settled into a definite pattern as yet.

## Design System

[[TODO]]

## GitHub

Where anything GitHub related goes e.g. Issues Templates, Workflows
