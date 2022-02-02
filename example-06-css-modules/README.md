# CS732 examples - CSS modules
This project contains examples of styling using CSS modules. These allow you to break up your CSS code and localize it to particular React components.

As an example, we can see the file [ArticleView.module.css](./src/ArticleView.module.css), which contains CSS code intended to style the `ArticleView` React component. In [ArticleView.js](./src/ArticleView.js), we can see the following CSS module import line:

```js
import styles from './ArticleView.module.css';
```

Then we can access any of the CSS classes defined within the CSS module, via the imported `styles` variable. An example can be seen where we style a `<div>` with the `.article` class by using `<div className={styles.article}>...`.

When the React code is compiled, the build engine will automatically rename all CSS class selectors defined in the module files to make sure that they don't conflict with any other CSS class selectors that have been defined. This way, any CSS defined in a module is guaranteed to be local to that module.

Remember that any CSS defined within modules **must** start with a class selector. For example, the following are OK:

```css
.article { ... }

.article p { ... }

.article:hover { ... }

.article .subArticle { ... }
```

But the following are not:

```css
p { ... }

#container { ... }

#container .article { ... }
```

This is because the postprocessor only renames CSS class names, not element or id names.