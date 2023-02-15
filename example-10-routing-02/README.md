# CS732 examples - Routing 02
This project contains further examples of how to do routing with [React Router](https://reactrouter.com/), **version 6** **Note:** These examples are **not** backwards compatible with older versions of React Router. If you look up other examples online, *make sure you're only looking at RR6 examples!*

To install React Router (Portals don't require a separate install):

```sh
npm install react-router-dom
```

Useful imports (may not need all of these in every file):

```js
import { BrowserRouter, Routes, Route, Outlet, Navigate, useParams,
         Link, NavLink, useLocation, useNavigate } from 'react-router-dom';

import ReactDOM from 'react-dom';
```

## Nested routing
It is often the case that we want to have multiple layers of routing. For instance, in the webapp included in this example project, [our webapp](./src/App.jsx) contains two top-level pages, [`/gallery`](./src/GalleryPage.jsx) and [`/articles`](./src/ArticlesPage.jsx). Within the `/articles` page, we can drill down and view an article with a particular id([`/articles/:id`](./src/ArticleView.jsx)), or add new articles ([`/articles/newArticle`](./src/NewArticleForm.jsx)). The top-level routes share the same navbar, while all the articles routes share a sidebar. Therefore, our tree of routes could be similar to the following:

- `/` (display a page with a navbar, shared with all child routes)
  - `/articles` (add the articles sidebar to the page)
    - `/articles/:id` (add the article view with the given article id to the page)
    - `/articles/newArticle` (add the "new article" form to the page)
  - `/gallery` (add the galler view to the page)
  - `*` (wildcard, display error page on any other URL)

To do this, in ([App.jsx](./src/App.jsx)), we can see a *nested* Route structure similar to the list shown above, where some `<Route>` components contain child `<Route>` components.

For example, consider the following React code:

```jsx
<BrowserRouter>
    <Routes>
        <Route path="/" element={<Page />}>
            <Route path="employees" element={<Employees />}>
                <Route path=":id" element={<SingleEmployee />} />
                <Route path="new" element={<NewEmployeeForm />} />
            </Route>
            <Route path="about" element={<About />} />
        </Route>
    </Routes>
</BrowserRouter>
```

In the above code:
- If we navigate anywhere beginning with `/` (i.e. anywhere on our site), a `<Page>` component will be rendered.
- If we navigate to anywhere beginning with `/about`, the `<About>` component will be added to the `<Page>` component.
- If we navigate to anywhere beginning with `/employees`, the `<Employees>` component will be added to the `<Page>` component.
- If we navigate to `new` relative to `employees`, e.g. `/employees/new`, the `<NewEmployeeForm>` component will be added to the `<Employees>` component.
- If we navigate to `:id` (path param) within the employees section, e.g. `/employees/4`, the `<SingleEmployee>` component will be added to the `<Employees>` component.

In this way, we can nest our `Route`s, and use them to build up our page bit by bit, with different components corresponding to different parts of the URL.

**But wait**: How does React Router know *where* within the `<Page>` component, for example, to render the `<Employees>` component?

### The `<Outlet>` component
The solution is simple! React Router provides a component called `<Outlet>`, which can be placed anywhere in your React component hierarchy. React Router will render all components coming from child routes at that location in your hierarchy.

For instance, in the above example, if our `Page` and `About` components are defined as such:

```js
function Page() {
    return (
        <>
            <nav>...Navbar stuff here</nav>

            <main>
                <Outlet />
            </main>
        </>
    )
}

funciton About() {
    return (
        <p>React Router is awesome!!</p>
    );
}
```

Then, if we navigate to `/about`, the resulting component hierarchy that is rendered will be:

```html
<nav>...Navbar stuff here</nav>
<main>
    <p>React Router is awesome!!</p>
</main>
```

As another example see how `Outlet`s are used in [PageWithNavbar](./src/PageWithNavbar.jsx) and [ArticlesPage](./src/ArticlesPage.jsx).


## Obtaining the URL / Path / Location
Sometimes it is useful for us to be able to obtain information about where the user is navigating to, within our code. We can obtain different such information using the `useLocation()` hook, as shown here:

```js
const { pathname } = useLocation();
```

As an example, in the `PageNotFound` component located within [`ErrorPages.js](./src/ErrorPages.jsx), we're obtaining the pathname and displaying it to the user, to let them know that they mistyped a URL.


## Programmatically navigating
Sometimes, we need to programmatically perform client-side navigation from within our JavaScript code, rather than as a result of user interaction. We can do this either *declaratively* with the `<Navigate>` component, or programmatically with the `useNavigate()` hook.

### `<Navigate>`
If we render a `Navigate` component, React Router will automatically redirect the user elsewhere, based on that component's `to` prop. For example, consider the following:

```jsx
<Routes>
    <Route path="/">
        <Route path="article" element={<Articles />} />
        <Route index element={<Navigate to="articles" replace />} />
    </Route>
</Routes>
```

If we navigate to `/articles`, the `Articles` component will be rendered. Instead, if we navigate to exactly `/` (as determined by the second nested route's `index` prop), the `Navigate` component will be renered, which will cause React Router to navigate to `/articles` (you can use either absolute or relative links, just as with `Link`s and `NavLink`s).

The `replace` prop is a boolean value, and is optional. If supplied, React Router will *replace* the top of the browser's history stack with the given path, rather than pushing a new item to the stack. The result is that, if you use `replace`, the user won't be able to "go back" using the browser's "back" button. If you don't use `replace`, then they *will* be able to go back.

For an example, we can see in [`App.js`](./src/App.jsx) how we're using `Navigate` twice:
- On line 59, if the user has navigated to the root path `/`, we redirect them to the articles pages
- On line 71, if the user has navigated to `/articles`, we redirect them to the page for the first article in the list (e.g. `/articles/1`).

### `useNavigate()`
We can achieve similar functionality programmatically rather than declaratively, using the `useNavigate()` hook:

```js
const navigate = useNavigate();
```

This hook gives us back a function (`navigate`), which we can call to do React Router page navigation. The first argument is a string representing the path to navigate to. This can be absolute or relative. The second argument is configuration options, if required. The most commonly used config option is `replace`, which works the same as the `replace` prop in the `Navigate` component (see above). For more info about possible config options, see [its doc page online](https://reactrouter.com/docs/en/v6/api#usenavigate).

For an example, we can see in `App.jsx` line 47, when the user adds a new article, we redirect the user to that new article's page.