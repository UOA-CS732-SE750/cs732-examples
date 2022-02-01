# CS732 examples - Lecture 02 - Example 17 - MUI Example
This project contains our article viewer running example, rewritten to use [MUI v5](https://mui.com/) (formerly Material UI).

To install Material UI:

```sh
yarn add @mui/material @emotion/react @emotion/styled
```

And optionally, if Material icons are required:

```sh
yarn add @mui/icons-material
```

In addition, you'll need to add the following fonts to [index.html](./public/index.html):

```html
<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
```

Once that's done, any MUI components can be used individually - there's no requirement that you convert your entire webapp to MUI all at once. You can use whatever parts of it suit you.

This project shows off several MUI components. It also shows how we can integrate MUI with React Router. React Router's `Link` and `NavLink` components can be rendered by MUI by setting the `component` prop of different MUI componets. Examples of this can be seen in:

- [ArticlesDrawer.js](./src/ArticlesDrawer.js) line 24, where we are rendering MUI `<ListItem>`s,
- [RR6-Integration.js](./src/RR6-Integration.js) line 54, where we are rendering MUI `<Tab>`s, and
- [GalleryCard.js](./src/GalleryCard.js) line 24, where we are rendering MUI `<Button>`s.

There's no way we could possibly cover the entirety of MUI in one lecture. For more information and examples, I would encourage you to check out the following resources in addition to this example project:

- MUI homepage: <https://mui.com/>
- MUI examples: <https://mui.com/getting-started/example-projects/>
