# CS732 examples - Lecture 02 - Example 16 - Local storage example two - With React
This project contains two examples showing how we can integrate the use of local storage (`localStorage`) into our React apps.

## useLocalStorage() hook
The first example shows a custom hook we have written - (useLocalStorage)[./src/useLocalStorage.js]. The hook essentially wraps a call to `useState()` - but adds the side-effect (using `useEffect()`) of saving the stateful value to `localStorage` under a given `key` whenever it is updated.

Its usage can be seen in `Counter.js`(./src/Counter.js). The benefit of this approach is that it is relatively simple and we can see what's going on - we have achieved `localStorage` integration with only a few lines of code and have encapsulated it in a custom hook to promote code reuse. The drawback is that the behaviour isn't as expected if we try to share the value with another component. When one component updates the value in local storage, that change will not automatically cause a re-render of any component other than the one which changed the value.

To get around this issue, we could combine our `useLocalStorage()` function with React's Context mechanism as seen in [Example 12](../example-12-context-02). Something like this:

```jsx
const MyContext = React.createContext(initialValue);

function MyParent() {
    const [counter, setCounter] = useLocalStorage('counter');
    return (
        <MyContext.Provider value={[counter, setCounter]}>
            <CounterIncrementer />
            <CounterViewer />
        </MyContext.Provider>
    );
}

function CounterIncrementer() {
    const [counter, setCounter] = useContext(MyContext);
    return (
        <button onClick={() => setCounter(counter + 1)}>Increment</button>
    );
}

function CounterViewer() {
    const [counter, setCounter] = useContext(MyContext);
    return (
        <p>The current count is: {counter}</p>
    );
}
```

Alternatively, we could use a ready-made third-party solution: the `npm` package `use-persisted-state`.

## use-persisted-state package
This package provides a more robust solution than our custom hook above. The package is open source - you can find the GitHub at: <https://github.com/donavon/use-persisted-state>. First, we must install it in our project as follows:

```sh
yarn add use-persisted-state
```

Then, in our code, its usage is slightly different. We import a function called `createPersistedState()`, supplying the local storage key as an argument. This doesn't return a value / setter pair as with `useState()` or our custom hook above. Rather, this function itself returns a hook that we can then use within our functional components as expected.

We can see its usage in [LoginPage.js](./src/LoginPage.js) and [UserInfoPage.js](./src/UserInfoPage.js). Both of these components are setup to access the local storage value with the key `auth`. Furthermore, we can see that when we modify this state within `LoginPage`, the changes are reflected in `UserInfoPage`. This is true *even within different browser tabs / windows*!

## Summary
As we can see, we were able to use our knowledge of `useState()`, `useEffect()`, and `localStorage` to quickly put together a custom hook which is sufficient for many of our needs. And we were able to come up with an addition using React's Context API if we need to share and modify the same local storage value on multiple components.

However, as we have also seen, a third-party package already exists- `use-persisted-state` - which offers the same functionality plus more. This is often true when developing modern software, but *especially* in the web development domain - it is often the case that someone will have solved a particular problem before. It is perfectly OK (given appropriate licensing & credit where credit is due) to integrate third-party solutions into your own projects to help you save time and energy, allowing you to devote your effort to the specific requirements of your project.