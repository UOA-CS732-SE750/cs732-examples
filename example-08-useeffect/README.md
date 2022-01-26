# CS732 examples - Lecture 01 - Example 08 - useEffect()
This project contains examples the `useEffect()` React hook. This hook is used to run extra code, which produces side-effects, after a functional React component is rendered / rerendered.

We import it as follows:

```js
import { useEffect } from 'react';
```

Then we can use it simply like so, inside a react component function:

```js
useEffect(() => {
    // My function
});
```

The supplied function will be called after every render of the component.

Sometimes we want our effect function to clean up after itself. To do this we can return an additional function as shown below. This additional function will be called when the component unmounts, or just before the component is rerendered before the effect function is called again):

```js
useEffect(() => {
    // My effect code

    return () => {
        // My cleanup code
    }
});
```

Sometimes, we don't want the effect function to be re-run every time the component is rerendered. In this case we can supply an optional second argument. If we do, then the effect function (and the prior cleanup function) is only run if the second argument has changed since the last time the component was rendered:

```js
useEffect(() => {
    // My effect code

    return () => {
        // My cleanup code
    }
}, valueToCheck); // The code above will only be run if valueToCheck has changed.
                  // Usually this will be some kind of stateful value.
```

For further examples, see:

- [Counter](./src/Counter.js) shows a simple use of `useEffect()` to update a non-React area of the DOM (`document.title` in this case).

- [Timer](./src/Timer.js) shows how we can use `useEffect()` to start a timer - and to clean up after ourselves by stopping it when required.