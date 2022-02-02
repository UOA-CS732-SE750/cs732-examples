# CS732 examples - Styling with CSS imports
This project contains examples of styling using standard CSS imports. There is a CSS file named [index.css](./src/index.css), which is imported within [index.js](./src/index.js) using the following line:

```js
import './index.css';
```

This will make sure the contents of `index.css` is available to the browser when viewing the web app. Any CSS selectors defined in the file are **global** - they apply to the entire site, and all React components within it.

As an example, you can see class selectors for `.container`, `.articleContainer`, and `.article`, which are referenced in [App.js](./src/App.js) and [ArticleView.js](./src/ArticleView.js) via the `className` property on various `<div>`s (note that this is different to the property name in raw HTML - there, you would write `class=` instead of `className=`).