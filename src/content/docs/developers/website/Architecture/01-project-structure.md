---
title: Project Structure
---

### Model

Files in the **Model** folder collect together the queries, Zod schemas and Types required to build the data models our Astro components need. They serve both the `client` and to provide types to the Astro components.

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

Styling in our project is done at the component level using Tailwind classes or the `<style>` tag. The `styles` folder contains `main.css` and is only used for config-like CSS.

### UI

We follow a relatively "atomic" approach, but it is far from stable. We have `primitives` for the core UI building blocks from which higher level abstractions can be built, but we've not settled into a definite pattern as yet.

## Design System

[[TODO]]

## GitHub

A special folder used by GitHub e.g. Issues Templates, Workflows
