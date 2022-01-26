# CS732 examples - Lecture 02 - Example 17 - Material UI Example
This project contains our article viewer running example, rewritten to use [Material UI](https://material-ui.com/).

To install Material UI:

```sh
npm install @material-ui/core
```

And optionally, if Material icons are required:

```sh
npm install @material-ui/icons
```

In addition, you'll need to add the following fonts to [index.html](./public/index.html):

```html
<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
```

Once that's done, any Material UI components can be used individually - there's no requirement that you convert your entire webapp to Material UI all at once. You can use whatever parts of it suit you.

This project shows off several Material UI components. It also shows how we can integrate Material UI with React Router. React Router's `Link` and `NavLink` components can be rendered by Material UI by setting the `component` prop of different Material UI componets. Examples of this can be seen in:
- [App.js](./src/App.js) where we are rendering Material UI `<Tab>`s,
- [ArticleSidebar.js](./src/ArticleSidebar.js) where we are rendering Material UI `<ListItem>`s, and
- [GalleryCard.js](./src/GalleryCard.js) where we are rendering Material UI `<Button>`s.

There's no way we could possibly cover the entirety of Material UI in one lecture. For more information and examples, I would encourage you to check out the following resources in addition to this example project:

- Material UI homepage: <https://material-ui.com/>
- Material UI examples: <https://material-ui.com/getting-started/example-projects/>
