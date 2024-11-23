---
title: Working With Data
---

We can break down the process of how data flows from the Sanity Content Lake to our web pages into a few steps:

1. Define a data model to establish the structure and validation rules for our data.
2. Create functions to fetch and validate data according to these models.
3. Invoke these functions within our Astro component scripts and inject the data into our component templates.
4. Compose pages by combining our Astro components.

Let's dive deeper into each step

### Defining The Data Model

We use the term **Model** to refer to the structures that define and validate the shape of data used throughout the site. By establishing clear rules for data, we ensure that incoming data from the backend aligns with our expectations. This approach simplifies data management, minimizes errors, and enhances maintainability across the project.

Our models consist of three components co-located in a single file inside the `model` folder, named after what best describes the entity we are defining, using a singular noun. For example, the one we'll be using in the following sections is named `population.ts`

The three components that make up a model are...

#### Zod Schemas

Zod schemas define the structure and rules for validating data, ensuring they match what we expect.

The schemas use the naming convention `z{entity}` (`z` for Zod). For more information on building Zod schemas see the [docs](https://zod.dev) but there's plenty of existing schemas to reference.

Here's an example based on our **'population'** Sanity content type:

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

:::tip
Sanity's API will return `null` on properties you project that don't exist, so you'll usually want to use`nullable` as opposed to `optional`
:::

#### GROQ Queries

[GROQ](https://www.sanity.io/docs/groq) is a query language for retrieving and manipulating data from Sanity's Content Lake.

We define our queries as part of our model as its much easier to manage them alongside the schemas that validate them (when you change a query, you normally need to update the Zod schema).

The queries use the naming convention `g{entity}Query` and `g{entity}Projection`. A complete GROQ query will usually include a **selector** (almost always `*` meaning everything), passed through a **filter**, followed by a **projection**.

For our purposes, a snippet of GROQ that will work as a complete query is named using the `g{entity}Query` convention. Snippets using the `g{entity}Projection` convention will need to be wrapped inside of a larger query using a template literal.

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

:::tip
It's easiest to write and test queries inside the ["Vision"](#) plugin within the Sanity Studio.
:::

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
