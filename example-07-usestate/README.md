# CS732 examples - `useState()`
This project contains examples of adding state to components using the `useState()` React hook. This allows us to add state to functional components without converting them to class components.

We need to import it as so:

```js
import { useState } from 'react';
```

When we call `useState()`, two values are returned. The first is the stateful value itself, the second is a function we can call to update that value. `useState()` itself takes one argument - the initial value, which will be used if that particular state hasn't been initialized yet.

For example, the first line in the below snippet sets us up to use a stateful int value, initialized with the value `0`. Then, the JSX contains a `<p>` which uses the stateful value, and a `<button>` which updates it.

Calling an update function will cause the component to be rerendered, thus displaying the updated value to the user.

```js
const [counter, setCounter] = useState(0);

...

<p>The value is: {counter}</p>
<button onClick={() => setCounter(counter + 1)}>Increment</button>
```

For further exmaples, see:

- [AddArticleComponent](./src/AddArticleComponent.js) shows how we can use `useState()` to properly keep track of a user's input into form controls (e.g. `<input>`, `<textarea>`)

- [App](./src/App.js) shows how we can store and update more complex data - an entire array of articles in this case.