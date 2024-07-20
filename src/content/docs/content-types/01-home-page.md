---
title: "Home Page"
---

The **Home Page** content type is a singleton content type that determines the content that will be seen on the main home page of the website.

:::note[Singleton]
If a content type is a **singleton** it means there can only be one.
:::

The Home Page is a simple content type that has a **Hero Image** field and a **Feature Panels** field. The **Feature Panels** are [references](../../sanity-intro#references) to instances of the [Featured Content](../featured-content) content type. There can be as many or as few as needed and they work together to build the main home page of the website. Each panel will be presented on the home page within its own section in the same order that they appear within the **Feature Panels** list.

:::note
There are some aspects of the **Home Page** that can not be controlled via the Sanity document, for example the layout of the Mission and Core Values sections (although the wording of these elements is controlled via the [organization content type](../organization))
:::

Below is an example of a completed Home Page

![The Home Page content type within Sanity Studio](@assets/home-page-01@2x.png)
