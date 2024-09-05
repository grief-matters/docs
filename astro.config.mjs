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
          autogenerate: { directory: "developers" },
        },
      ],
      // sidebar: [
      //   {
      //     label: "Content Editing",
      //     items: [
      //       {
      //         label: "Getting Started",
      //         items: [
      //           {
      //             label: "Intro to Sanity",
      //             link: "getting-started/document-search",
      //           },
      //         ],
      //       },
      //       {
      //         label: "Intro to Sanity",
      //         link: "content-editing/sanity-intro",
      //       },
      //       {
      //         label: "Sanity User Interface",
      //         link: "content-editing/user-interface",
      //       },
      //       {
      //         label: "Images",
      //         link: "content-editing/images",
      //       },
      //       {
      //         label: "Document Editing",
      //         items: [
      //           {
      //             label: "Creating",
      //             link: "content-editing/creating-documents",
      //           },
      //           {
      //             label: "Editing",
      //             link: "content-editing/editing-documents",
      //           },
      //           {
      //             label: "Document States",
      //             link: "content-editing/document-states",
      //           },
      //           {
      //             label: "Document Actions",
      //             link: "content-editing/document-actions",
      //           },
      //         ],
      //       },
      //       {
      //         label: "Content Types",
      //         autogenerate: {
      //           directory: "content-types",
      //         },
      //       },
      //     ],
      //   },
      //   {
      //     label: "Development",
      //     autogenerate: {
      //       directory: "development",
      //     },
      //   },
      // ],
    }),
  ],
});
