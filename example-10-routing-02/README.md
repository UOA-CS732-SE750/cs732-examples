# CS732 examples - Lecture 02 - Example 10 - Routing 02
This project contains further examples of how to do routing with [React Router](https://reactrouter.com/).

It also shows how to use a [Portal](https://reactjs.org/docs/portals.html) to render an element outide of the main React DOM.

To install React Router (Portals don't require a separate install):

```sh
npm install -S react-router-dom
```

Useful imports (may not need all of these in every file):

```js
import { BrowserRouter as Router, Switch, Route, useParams,
         Link, NavLink, useLocation, useRouteMatch, useHistory } from 'react-router-dom';

import ReactDOM from 'react-dom';
```


## Nested routing
It is often the case that we want to have multiple layers of routing. For instance, in the webapp included in this example project, we have a main page ([App](./src/App.js)) wich contains a top navbar linking to both a [Gallery](./src/GalleryPage.js) page and an [Articles](./src/ArticlesPage.js) page. Then, within the articles page, we have a [Sidebar](./src/ArticleSidebar.js) linking to individual articles, to be displayed in the main window.

To accomplish this, we can easily have nested `<Switch>` blocks. In this case, we have one in ([App](./src/App.js)) which picks between the Gallery and Articles pages, and then one in [ArticlesPage](./src/ArticlesPage.js) which picks between different articles. We also have a second `<Switch>` in `ArticlesPage`, which will additionally render the ["New article" dialog](./src/NewArticleDialog.js) if the `path` includes `/newArticle` at the end of it. As this `<Switch>` is separate, it will always be checked regardless of which article is rendered.


## Obtaining the URL / Path / Location
Sometimes it is useful for us to be able to obtain information about where the user is navigating to, within our code. We can obtain different variations on this information using the `useRouteMatch()` and `useLocation()` hooks, as shown here:

```js
const { url, path } = useRouteMatch();
const { pathname } = useLocation();
```

- `url` will contain the matched *URL*, which caused the current `<Route>` to be rendered. For example, if we had `<Route path="/articles/:id">`, and this matched the URL `/articles/3`, then the value of `url` will be `/articles/3`.

- `path` will contain the matched *path*, which caused the current `<Route>` to be rendered. For example, if we had `<Route path="/articles/:id">`, and this matched the URL `/articles/3`, then the value of `path` will be `/articles/:id`.

- `pathname` will be the current *root-relative* path. For example, in the above example, it would be `/articles/3`.

The difference between `url` and `pathname` depends on *where* in the `<Switch>` hierarchy we call the function. For example, consider the following code:

```jsx
function TopLevel() {
    const { pathname } = useLocation();
    const { url } = useRouteMatch();
    return (
        <Switch>
            <Route path="/articles">
                <Articles />
            </Route>
        </Switch>
    );
}

function Articles() {
    const { pathname } = useLocation();
    const { url } = useRouteMatch();
    return (
        <Switch>
            <Route path="/articles/comments">
                <Comments />
            </Route>
        </Switch>
    );
}

function Comments() {
    const { pathname } = useLocation();
    const { url } = useRouteMatch();

    return ...
}
```

Let's say we have navigated to http://localhost:3000/articles/comments. In this case, the value of `pathname` will be `/articles/comments` in all three of the above functions, whereas the value of `url` will differ:
- In `TopLevel()`, `url` = `"/"`
- In `Articles()`, `url` = `"/articles"`
- In `Comments()`, `url` = `"/articles/comments"`

Generally, `url` is used for forming `<Link>`s, while `path` is used for defining `<Route>`s. We can see exmaples of this in [ArticleSidebar](./src/ArticleSidebar.js) and [ArticlesPage](./src/ArticlesPage.js) respectively. Here, we're using these dynamic paths to provide proper nested routing. The way we have written these components, we could later decided to change the base URL of our articles pages to something other than `/articles`, and these components would work with the new URL with no extra code.


## Programmatically navigating
Sometimes, we need to programmatically perform client-side navigation from within our JavaScript code, rather than as a result of user interaction or the `<Redirect>` component. To do this, we can access React Router's `history` object via the `useHistory()` hook:

```js
const history = useHistory();
```

This object has several methods we can use to navigate. For example:

- `goBack()` acts as though the user pressed the browser's "back" button.
- `push(path)` navigates to the given `path`. Similar behaviour to if the user clicked a link to that path.
- `replace(path)` replaces the current item in the history stack with the new one. Useful if you need to navigate, but not allow the user to go back.

We can see examples of `history` interaction in [App](./src/App.js). Here, when the user cancels the "add article" dialog, we will go back one in the history. And, when the user adds a new article, we will automatically navigate to the newly added article's page.


## React portals
*Note*: This topic is unrelated to routing.

Occasionally, we might want to render a React component at a given place in the React DOM, but have its corresponding HTML elements be rendered somewhere else in the page. The most common example of this is where we might have a dialog box be rendered which appears over the top of all other page elements - however, there are many other potential applications.

To achieve this, we can use a React portal. Essentially, we supply the `ReactDOM.createPortal()` function with a React component, and any HTML DOM element (obtained, for example, using the `document.querySelector()` function). The HTML elements associated with the given React component will be added to the given HTML DOM element, rather than where they would normally be added.

For example, in [index.html](./public/index.html) we have defined a `<div>` like so:

```html
<div id="modal-root"></div>
```

Then, in the [Modal](./src/Modal.js) component, we obtain a reference to it:

```js
const modalRoot = document.querySelector('#modal-root');
```

Finally, we can render any components we like inside `modalRoot` like so:

```jsx
function RenderInsideModalRoot() {
    return ReactDOM.createPortal(
        <p>I'm rendered inside modalRoot!</p>,
        modalRoot
    );
}
```

(See [Modal](./src/Modal.js) for a more comprehensive example)