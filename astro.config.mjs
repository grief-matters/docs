import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";

// https://astro.build/config
export default defineConfig({
  integrations: [
    starlight({
      title: "Why Grief Matters",
      social: {
        github: "https://github.com/grief-matters",
      },
      sidebar: [
        {
          label: "Content Editors",
          items: [
            {
              label: "Start Here",
              autogenerate: { directory: "content-editors/start-here" },
            },
            {
              label: "Content Editing",
              autogenerate: { directory: "content-editors/content-editing" },
            },
            {
              label: "Content Types",
              autogenerate: { directory: "content-editors/content-types" },
            },
          ],
        },
        {
          label: "Developers",
          items: [
            {
              label: "Start Here",
              autogenerate: { directory: "developers/start-here" },
            },
            {
              label: "Sanity CMS",
              autogenerate: { directory: "developers/sanity-cms" },
            },
            {
              label: "Website",
              autogenerate: { directory: "developers/website" },
            },
          ],
        },
      ],
    }),
  ],
});
