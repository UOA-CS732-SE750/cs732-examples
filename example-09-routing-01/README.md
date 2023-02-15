# CS732 examples - Routing 01
This project contains an example of how to do routing with [React Router](https://reactrouter.com/), **version 6** **Note:** These examples are **not** backwards compatible with older versions of React Router. If you look up other examples online, *make sure you're only looking at RR6 examples!*.

To install:

```sh
npm install react-router-dom
```

Useful imports (may not need all of these in every file):

```js
import { BrowserRouter, Routes, Route, useParams, Link, NavLink } from 'react-router-dom';
```

## The basics
To set up routing, we enclose our page in a `<BrowserRouter>` component. Within that `BrowserRouter`, we may have any other React components as normal. We may also have one or more `<Routes>` components. Within each `Routes`, we may have any number of `<Route>` components. `Route`s have an `element` prop, which contains a component which will only be rendered if the current URL path matches the `path` prop of that `Route`.

For example, if the following JSX were defined:

```jsx
<BrowserRouter>
    <div>
        <h1>This will always be rendered</h1>
        <p>Hello, React Router!</p>
        <Routes>
            <Route path="/page1" element={<p>Welcome to page one!</p>} />
            <Route path="/page2" element={<p>Welcome to page two!</p>} />
        </Routes>
    </div>
</BrowserRouter>
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
To add a default option which will be rendered if nothing else is for a particular `Routes` block, then we can use `<Route path="*" element={...} />`. This will match any `path`. If we use this, we should put it last within the `Routes` block. These blocks will only render the first matching `Route`, so this default will only be rendered if there are no other matches.

For example, if the following React is defined:

```jsx
<BrowserRouter>
    <div>
        <Routes>
            <Route path="/page1" element={<p>Welcome to page one!</p>} />
            <Route path="*" element={<p>Default!</p>} />
        </Routes>
    </div>
</BrowserRouter>
```

Then, if we navigate to `/page1` then we'll see the text "Welcome to page one!". If we navigate to any other URL within our app, we'll see the text "Default!".

An example of a `Routes` block with a default `Route` can be seen in the [App](./src/App.jsx) component.

## Links
We can add hyperlinks which perform client-side routing (i.e. they do not cause a request to be sent to the server) using React Router's `<Link>` and `<NavLink>` components, as so:

```jsx
<Link to="/page1">Page one</Link>
<NavLink to="/page2" className={({ isActive }) => isActive && "myActiveLinkCSS"}>Page two</NavLink>
```

Both will render an HTML anchor (`<a>`) which, when clicked, will perform client-side routing to the path specified in the `to` prop. Links can be absolute (starting with `/`) or relative (see Example 10 for more on this).

The difference between the two is that a `<NavLink>`'s `className` prop can accept a function. The function is supplied with a single arg, with an `isActive` prop, and should return the CSS class name to use, if any. As shown in the example above, we can conditionally apply CSS classes, based on the value of `isActive`. This lets us easily create links with different styles when active.

Examples of `NavLink`s can be seen in the [ArticleNavBar](./src/ArticleNavBar.jsx) component.

## Path params
Sometimes we want to render similar things for multiple different paths - for example, an article viewer might always contain the same React component to render an article - the only difference is which article is actually being rendered.

We can use path parameters to allow us to programmatically read parts of the current URL. For example, we could have the article's `id` be part of the URL, and then read the `id` from the URL to load and display the corresponding article.

To set up a `Route` with path parameters, we preface one section of the path with a `:`, like so:

```jsx
<Route path="/articles/:id" element={<ArticleViewer />} />
```

This has introduced a path parameter named `id`. It will match any path, and the matched value will be available for use by any React components rendered in this route (our `ArticleViewer` in this case). For example, if the URL is http://localhost:3000/articles/4, then the `id` path parameter would have the value `4`.

Within any component rendered by a `Route`'s `element` prop, we can use the `useParams()` hook to obtain these values.

For example:

```jsx
function ArticleViewer() {
    const { id } = useParams();
    return (
        <p>The article id is {id}!</p>
    );
}
```

An example of path parameter usage can be seen in the [App](./src/App.jsx) component.