---
title: Getting Started
description: Getting started as a contributor on the Why Grief Matters website
---

:::tip
Don't have a GitHub account? Read the [Developer Essentials](/developers/start-here/00-essentials) page first
:::

If you're a developer looking to get started on the Grief Matters website. We're happy to have you here. Read on!

## Clone and run the project

### Clone the repo

**Start from a fork**

1. Navigate to the `https://github.com/grief-matters/whygriefmatters.org` repo
2. [Fork the repo](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/working-with-forks/fork-a-repo#forking-a-repository) to your personal GitHub account
3. [Clone the fork](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/working-with-forks/fork-a-repo#cloning-your-forked-repository) you just created
4. It's a good idea to [sync your fork](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/working-with-forks/fork-a-repo#configuring-git-to-sync-your-fork-with-the-upstream-repository) with our upstream repo to make sure you keep up with changes

### Build and Run

1. `cd` into the project directory on your local machine
2. Create a file named `.env` in the root of your project and add to it the following environment variables:

   ```json
   SANITY_STUDIO_PROJECT_ID = "vg3sb730"
   SANITY_STUDIO_DATASET = "production"
   SANITY_STUDIO_API_VERSION = "2023-07-16"
   ```

   :::note
   Our Sanity CMS uses a public API - so these environment variables do not need to be treated as secrets.
   :::

3. Ensure you have a recent LTS version of Node installed. If you use NVM there is a `.nvmrc` file in the project so you can just run `nvm use` to switch to a version you know the project supports.
4. At the root of the project run `npm install` to install all dependencies
5. Finally, run `astro dev` to build an run the project in development mode
6. If everything worked as expected you should see the project running at http://localhost:4321

:::caution
If `astro dev` is not working and you see something like `zsh: command not found: astro` you're probably using NVM.

You have choices:

1. Use NPX `npx astro dev`
2. Install Astro globally by running `npm install -g astro`
3. Just use `npm run dev` instead

Logged in this [GitHub issue](https://github.com/withastro/astro/issues/2266)

:::
