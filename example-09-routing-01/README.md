# CS732 examples - Lecture 02 - Example 09 - Routing 01
This project contains an example of how to do routing with [React Router](https://reactrouter.com/).

To install:

```sh
npm install -S react-router-dom
```

Useful imports (may not need all of these in every file):

```js
import { BrowserRouter as Router, Switch, Route, useParams, Link, NavLink, useRouteMatch } from 'react-router-dom';
```
## The basics
To set up routing, we enclose our page in a `<Router>` component. Within that `Router`, we may have any other React components as normal. We may also have one or more `<Switch>` components. Within each `Switch`, we may have any number of `<Route>` components. Children of `Route`s will only be rendered if the current URL path matches the `path` prop of that `Route`.

For example, if the following JSX were defined:

```jsx
<Router>
    <div>
        <h1>This will always be rendered</h1>
        <p>Hello, React Router!</p>
        <Switch>
            <Route path="/page1">
                <p>Welcome to page one!</p>
            </Route>
            <Route path="/page2">
                <p>Welcome to page two!</p>
            </Route>
        </Switch>
    </div>
</Router>
```

Then, if the application's path were, for example, http://localhost:3000/page1, then the following HTML would be rendered:

```html
<div>
    <h1>This will always be rendered</h1>
    <p>Hello, React Router!</p>
    <p>Welcome to page one!</p>
</div>
```

If there are no matches in the `Switch`, then nothing will be rendered there. For example, if the URL were to point to http://localhost:3000/nonexistant for the above React code, the following will be rendered:

```html
<div>
    <h1>This will always be rendered</h1>
    <p>Hello, React Router!</p>
</div>
```

## Adding a default route
To add a default option which will be rendered if nothing else is for a particular `Switch`, then we can use `<Route path="*">...</Route>`. This will match any `path`. If we use this, we should put it last within the `Switch`. `Switch`es will only render the first matching `Route`, so this default will only be rendered if there are no other matches.

For example, if the following React is defined:

```jsx
<Router>
    <div>
        <Switch>
            <Route path="/page1">
                <p>Welcome to page one!</p>
            </Route>
            <Route path="*">
                <p>Default!</p>
            </Route>
        </Switch>
    </div>
</Router>
```

Then, if we navigate to `/page1` then we'll see the text "Welcome to page one!". If we navigate to any other URL within our app, we'll see the text "Default!".

An example of a `Switch` with a default `Route` can be seen in the [App](./src/App.js) component.

## Links
We can add hyperlinks which perform client-side routing (i.e. they do not cause a request to be sent to the server) using React Router's `<Link>` and `<NavLink>` components, as so:

```jsx
<Link to="/page1">Page one</Link>
<NavLink to="/page2" activeClassName="myActiveLinkCSS">Page two</NavLink>
```

Both will render an HTML anchor (`<a>`) which, when clicked, will perform client-side routing to the path specified in the `to` prop. The difference between the two is that a `<NavLink>` will additionally apply the given CSS class to the hyperlink, when that link's path matches the current URL. This lets us easily create links with different styles when active.

Examples of `NavLink`s can be seen in the [ArticleNavBar](./src/ArticleNavBar.js) component.

## Path params
Sometimes we want to render similar things for multiple different paths - for example, an article viewer might always contain the same React component to render an article - the only difference is which article is actually being rendered.

We can use path parameters to allow us to programmatically read parts of the current URL. For example, we could have the article's `id` be part of the URL, and then read the `id` from the URL to load and display the corresponding article.

To set up a `Route` with path parameters, we preface one section of the path with a `:`, like so:

```jsx
<Route path="/articles/:id">
    <ArticleViewer />
</Route>
```

This has introduced a path parameter named `id`. It will match any path, and the matched value will be available for use by any React components rendered in this route (our `ArticleViewer` in this case). For example, if the URL is http://localhost:3000/articles/4, then the `id` path parameter would have the value `4`.

Within any component that's a child of a `Route`, we can use the `useParams()` hook to obtain these values.

For example:

```jsx
function ArticleViewer() {
    const { id } = useParams();
    return (
        <p>The article id is {id}!</p>
    );
}
```

An example of path parameter usage can be seen in the [App](./src/App.js) component.