# CS732 examples - Simple components, boolean logic, and iteration
This project contains examples of simple React components, along with an example of boolean logic and iteration.

## A simple React component
Consider the code in [AboutMe.js](./src/AboutMe.js). This shows a simple component called `AboutMe`. It accepts two properties - `name` and `like` - and renders the information supplied in those props.

For example, if the following JSX were rendered:
```jsx
<AboutMe name="Andrew" like="Pie" />
```

Then, the result would be:
```html
<div>
    <h1>About me</h1>
    <p>Hello, my name is Andrew, and I like Pie!</p>
</div>
```

There are two versions of the component given - one uses object dereferencing, the other does not.

## Conditionals in JSX
We can use the JavaScript ternary operator to conditionally render components. The first component given will be rendered if the condition is ["truthy"](https://developer.mozilla.org/en-US/docs/Glossary/Truthy), or the second component otherwise. Either can be `null`, in which case nothing will be rendered in that case.

For example, the following will render "Heads" if a number is greater than 0.5, or "Tails" otherwise.

```jsx
{number > 0.5 ? <p>Heads</p> : <p>Tails</p>}
```

If we only want to render somthing if a value is truthy, and nothing otherwise, we can use `&&` instead of `?`. For example, the following two lines are functionally identical:

```jsx
{number > 0.5 ? <p>Heads</p> : null}
```

```jsx
{number > 0.5 && <p>Heads</p>}
```

An example conditional can be seen in [App.js](./src/App.js) - the list of articles is rendered only if there are one or more articles to display. Otherwise a backup message is displayed.

## Iteration in JSX
We can use the `map()` function of JavaScript arrays to convert elements in an array into an array of JSX components to render. An example of this can be seen in [App.js](./src/App.js):

```jsx
{articles.map(article => <ArticleView key={article.id} article={article} />)}
```

**Note:** As you can see in the above example, it is good practice to give each rendered element in a list a `key` property, with a value that's unique to the content being rendered (in this case, an article's `id` works well). This is for efficiency reasons so the React engine better knows when it needs to re-render child components. Failure to include the `key` property will result in a warning being displayed in the browser's debug console, along with potentially a less efficient application.