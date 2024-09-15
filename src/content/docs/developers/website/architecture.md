---
title: Architecture
---

Before we get into it, **Architecture** is a pretty loaded term and can scare people off.

The big picture: It’s like a map that shows how different components (like files, services, or modules) connect and interact.
Organizing code: Just like arranging tools in a toolbox, architecture helps keep code organized, so it’s easy to understand and work with.
Guidelines, not rules: It gives us a flexible framework to make decisions about where to put things or how to solve problems in a consistent way.
Scalability and maintainability: Good architecture makes the codebase easier to grow and maintain without getting messy over time.

## End to End

Let's start with a high-level vision for how things should fit together and the levels of abstraction we're broadly aiming for.

But first...

#### CMS vs. Website: What Goes Where?

One of the core objectives of a headless CMS is that the content should not be intrinsically linked to the presentation of a particular channel (e.g. the website). In reality, there is necessary coupling between the two. For example, inside of our CMS we define a `HomePage` content type; its only purpose is to define the content of the homepage. But... an important mental model to adopt is that the CMS will only ever define the **what**; never the **how**. Perhaps a better name for the `HomePage` would be `LeadingContent` or `EntryPoint` to _unwebify_ the term (for now, HomePage will do fine 😅).

A great example of getting this wrong would be when we we're defining **what** to show in the top-level navigation inside of this project. That's a red flag 🚩

Taking a step back, defining top-level navigation as a content type in the CMS makes more sense. Abstracting it further, we could use the term `ContentPathways`. In reality we're probably only ever going to use this for top-level navigation of the website, but trying to remove the "webbyness" of the concept helps us to make good decisions about content definitions.

## Project Structure

#### Model

Files in the **Model** folder collect together the queries, Zod schemas and Types required to build the data models our Astro components need. They serve both the `client` and to provide types to the component.

#### Common

A home for everything non-Astro that is shared throughout the project. It contains some important files like the `client` and the `design-system` but also files containing a single helper like `route`.

As a rule fo thumb, if you need a helper across more than 3 components, consider sticking it in here somewhere.

As time goes on natural patterns will emerge, but a guiding principle should always be; break out **when** not **if**.

#### Layouts

The Astro team describe these as:

> We conventionally use the term “layout” for Astro components that provide common UI elements shared across pages such as headers, navigation bars, and footers.

This is pretty much true for our project. **Layouts** is for Astro components responsible for laying out a page, or a section of a page. These won't usually contain anything data related, or much in terms of rendering logic. That should be left to their children. A minimal prop interface is ok if it is necessary to the layout, `ResourcePageLayout` is a good example of this as it uses the `Astro.slots` api to conditionally build the layout.

#### Pages

**Pages** are responsible for handling routing, data loading, and overall page layout for every page in the website. It shouldn't contain anything that doesn't ultimately render at a specific path.

Read more about the concept in the [Astro docs](https://docs.astro.build/en/basics/astro-pages/)

#### Styles

Should not be used for general styling purposes (all of that should be done at a component level using Tailwind). This should be very much for setting up really "base" CSS config stuff, and is unlikely to extend beyond `main.css`

#### UI

We follow a relatively "atomic" approach, but it is far from stable. We have `primitives` for the core UI building blocks from which higher level abstractions can be built, but we've not settled into a definite pattern as yet.

## Design System

## GitHub

Where anything GitHub related goes e.g. Issues Templates, Workflows
