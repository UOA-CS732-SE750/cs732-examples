# CS732 examples - Context example two
This project contains a demo of how we can use `React.createContext()` and `useContext()` to provide global state. It differs from the previous example in that this time, the value of the context is being modified in one sibling component, while being read in another.

1. In [auth-context.js](./src/auth-context.js), we're creating the Context object itself - `AuthContext`. We're importing it whenever we need it.

2. In [App.js](./src/App.js), we're establishing an `<AuthContext.Provider>`, which will make its `value` available to all descendants. In this case, the value is a `user` (which will either be `undefined` (when not authenticated), or an object with a `username` property (when authenticated)), along with a `setUser()` function which can be used to update the `user` value.

3. In [UserInfoPage.js](./src/UserInfoPage.js), we're accessing the value stored in `AuthContext.Provider`, by using the `useContext()` hook. This value will include the user that was added in `App.js`, if any.

4. In [LoginPage.js](./src/LoginPage.js), we also access the value stored in `AuthContext.Provider`. In this case, we're making use of the `setUser()` function supplied here. Calling this function will cause the `user` state in `App.js` to be changed, which will in turn cause `AuthContext.Provider` and all its children to be re-rendered, due to the changed context value.