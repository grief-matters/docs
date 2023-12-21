import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";

export default defineConfig({
  integrations: [
    starlight({
      title: "Why Grief Matters",
      social: {
        github: "https://github.com/grief-matters",
      },
      sidebar: [
        {
          label: "Content Editing",
          items: [
            {
              label: "Getting Started",
              link: "content-editing/getting-started",
            },
            { label: "Intro to Sanity", link: "content-editing/sanity-intro" },
            {
              label: "Sanity User Interface",
              link: "content-editing/user-interface",
            },
            { label: "Images", link: "content-editing/images" },
            {
              label: "Document Editing",
              items: [
                {
                  label: "Creating",
                  link: "content-editing/creating-documents",
                },
                {
                  label: "Editing",
                  link: "content-editing/editing-documents",
                },
                {
                  label: "Document States",
                  link: "content-editing/document-states",
                },
                {
                  label: "Document Actions",
                  link: "content-editing/document-actions",
                },
                {
                  label: "Content Types",
                  autogenerate: { directory: "content-editing/content-types" },
                },
              ],
            },
          ],
        },
        {
          label: "Development",
          autogenerate: { directory: "development" },
        },
      ],
    }),
  ],
});
