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

**Direct access**

If you have direct access to the repo you can just clone the repo and get started.

1. Navigate to the https://github.com/grief-matters/whygriefmatters.org
2. Clone the repo using your [preferred method](https://docs.github.com/en/repositories/creating-and-managing-repositories/cloning-a-repository)

**Start from a fork**

1. Navigate to the https://github.com/grief-matters/whygriefmatters.org repo
2. [Fork the repo](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/working-with-forks/fork-a-repo#forking-a-repository) to your personal GitHub account
3. [Clone the fork](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/working-with-forks/fork-a-repo#cloning-your-forked-repository) you just created
4. It's a good idea to [sync your fork](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/working-with-forks/fork-a-repo#configuring-git-to-sync-your-fork-with-the-upstream-repository) with our upstream repo to make sure you keep up with changes

### Build and Run

1. `cd` into the project directory on your local machine
2. In order to run the project for local dev you'll need to add a `.dev.vars` file to the root of the project with the contents (replacing the secrets with the keys you've been given):

   ```sh
   SANITY_AUTH_TOKEN="sk[token]"
   CLERK_SECRET_KEY="sk_test_[key]"
   ```

   :::note
   This is where the Cloudflare adapter picks up its environment secrets. Non-secret variables are stored in `wrangler.toml`
   :::

3. In order to build the project locally using `npm run build` (e.g. to test the site still builds prior to PR) you'll need to add a `.env` file to the root project with the contents:

   ```sh
   # Sanity Env Variables
   SANITY_STUDIO_API_VERSION="2023-07-16"
   SANITY_STUDIO_DATASET="production"
   SANITY_STUDIO_PROJECT_ID="vg3sb730"
   SANITY_AUTH_TOKEN="sk[token]"

   # Clerk Env Variables
   PUBLIC_CLERK_PUBLISHABLE_KEY="pk_test_[key]"
   CLERK_SECRET_KEY="sk_test_[key]"
   ```

4. Ensure you have a recent LTS version of Node installed. If you use NVM there is a `.nvmrc` file in the project so you can just run `nvm use` to switch to a version you know the project supports.
5. At the root of the project run `npm install` to install all dependencies
6. Finally, run `npm run dev` to build an run the project in development mode
7. If everything worked as expected you should see the project running at http://localhost:4321

:::tip
You can also use `npm run dev-host` if you want to expose over your local network e.g. for testing on other devices
:::
