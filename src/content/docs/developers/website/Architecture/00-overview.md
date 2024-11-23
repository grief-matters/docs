---
title: Architecture Overview
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

In reality, this can be hard to reason, and the distinction between the two blurry. A good working example is how we've defined **'Core Content Groups'** for use in the top-level navigation of the site. Whilst we know in advance the primary purpose is to create site navigation, we've tried to model the content in a way that it could be used elsewhere if needed.

In a nutshell, if you find yourself having to introduce or reshape content in the website project, then its likely better done through new or changed content types in the CMS. On the flip-side, you should never find yourself creating things in the CMS like "Fancy Heading" or "Left Aligned Paragraph".
