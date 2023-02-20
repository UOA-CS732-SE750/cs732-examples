# CS732 examples - Context example one
This project contains a demo of how we can use `React.createContext()` and `useContext()` to provide global state.

1. In [auth-context.js](./src/auth-context.js), we're creating the Context object itself - `AuthContext`. We're importing it whenever we need it.

2. In [App.jsx](./src/App.jsx), we're establishing an `<AuthContext.Provider>`, which will make its `value` available to all descendants. In this case, the value is a `user`, which will either be `undefined` (when not authenticated), or an object with a `username` property (when authenticated).

3. In [UserInfoPage.jsx](./src/UserInfoPage.jsx), we're accessing the value stored in `AuthContext.Provider`, by using the `useContext()` hook. This value will be the user that was added in `App.jsx`, if any.

4. Back in `App.jsx`, when we modify the `user` state, the updated user will cause the `Provider`, and thus its descendents, to re-render. Upon re-rendering, `UserInfoPage` will obtain the updated `user` via `useContext()` to display the appropriate message.