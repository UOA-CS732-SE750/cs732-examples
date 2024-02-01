# CS732 examples - useRef()

`useRef()` is a hook which can be used to get a reference to a value which is _not_ needed for re-rendering purposes. The object returned by `useRef()` will have a prop called `current`, which will return the current value of that ref. You can change this value at any time, and this will not cause React to re-render any components.

```jsx
const ref = useRef(0); // Initial value of 0; ignored after the first render. ref will always be the same object.

console.log(ref.current); // Prints 0
```

One common use case is to obtain a reference to an HTML element which we can use later on. For example, in [FormWithUseRef.jsx](./src/FormWithUseRef.jsx), on lines 5 and 17 we are creating a reference to the `<input>` element.

When the button is clicked, our `handleClick` function will be called. Here, we are using `ref.current` which will get us a reference to that input element, then obtaining the text the user has typed using its `value` property.

Compare this approach to the one given in [FormWithUseState.jsx](./src/FormWithUseState.jsx). In this example, we're tracking the user's text using a stateful variable, and ensuring the stateful variable (line 4) and input (line 19) are always in sync, via the input's `value` and `onChange` props.

The benefit of using this stateful approach is that we can immediately update the UI whenever the user's text changes. The drawback is that if we don't _need_ to update the UI immediately, then we are causing unnecessary re-renders which may impact performance. Therefore, it is preferable to use the `useRef()` approach unless you need these immediate UI updates.
