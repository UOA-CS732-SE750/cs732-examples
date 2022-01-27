# COMPSCI 732 / SOFTENG 750 Examples Repository
This repository contains example code demonstrating various React / Node.js / Express / MongoDB features.

## Index

- *[Example 00](./example-00-javascript-examples)*: Doesn't demonstrate any MERN-stack code per se, but introduces advanced JavaScript language features which are used often in the creation of such apps. These features may be unfamiliar to you if you've learned programming in other languages, and they aren't introduced in COMPSCI 719. So it might pay to check them out!

- *[Example 01](./example-01-my-first-react-app)*: Demonstrates about the simplest React app possible. No toolchains or libraries required other than React itself.

- *[Example 02](./example-02-my-first-react-app-jsx)*: Shows how we can use Babel to transpile JSX code into a format which can be interpreted by all browsers.

- *[Example 03](./example-03-cra-default)*: Shows the default output of the `create-react-app` tool, as of January 27th, 2022.

- *[Example 04](./example-04-components-logic-loops)*: Demonstrates simple React components with props, use of the ternary operator (`?`) and `&&` for conditional rendering, and iteration using the `map()` function.

- *[Example 05](./example-05-css-imports)*: Demonstrates how to import and use raw CSS files in react webapps.

- *[Example 06](./example-06-css-modules)*: Demonstrates how to import and use CSS modules.

- *[Example 07](./example-07-usestate)*: Demonstrates how to give components local state using the `useState()` hook.

- *[Example 08](./example-08-useeffect)*: Demonstrates how to have components give side-effects using the `useEffect()` hook.

- *[Example 09](./example-09-routing-01)*: Demonstrates basic use of the `react-router-dom` package.

- *[Example 10](./example-10-routing-02)*: Demonstrates mode advanced use of the `react-router-dom` package, along with React portals.

- *[Example 11](./example-11-context-01)*: Shows how to use the React Context API. Shows how to set up a context using `React.createContext()`, and how to obtain its value using `useContext()`.

- *[Example 12](./example-12-context-02)*: Expands on Example 11 by showing how we can set up a context whose value can be modified from child classes, with appropriate re-rendering occurring as expected.

- *[Example 13](./example-13-redux-01)*: Shows off the [Redux](https://redux.js.org/) state management package, separately from React. Redux is powerful and widely used. Knowledge of it isn't strictly examinable for this course, but as it is so widely used, proficiency with the package is a useful skill.

- *[Example 14](./example-14-redux-02)*: Shows how we can integrate React and Redux with the [React Redux](https://react-redux.js.org/) package.

- *[Example 15](./example-15-localstorage-01)*: Shows how we can use the local storage API provided by all modern browsers to persist key-value pairs which will be local to a given origin. This example shows just usage of `localStorage`, without React.

- *[Example 16](./example-16-localstorage-02)*: Shows how we can integrate local storage into our React apps. Two methods are shown.

- *[Example 17](./example-17-material-ui)*: Shows off one of our previous examples, rewritten with [Material UI](https://material-ui.com/).

- *[Example 18](./example-18-encapsulating-state)*: Demonstrates one way we can encapsulate stateful values, and their mutator functions, in a context provider wrapper component.

- *[Example 19](./example-19-express)*: A simple example of a Node.js / Express web server.

- *[Example 20](./example-20-routes-fetch-axios)*: Shows a simple example of using `fetch()` and `axios` from client-side code. Also demonstrates one possible way in which Express Router can be used to more appropriately organize your server route handler code.

- *[Example 21](./example-21-react-express)*: Demonstrates how we can use a create-react-app frontend in combination with a Node.js / Express backend.

- *[Example 22](./example-22-service-worker)*: Demonstrates how we can use a service worker to cache files, enabling "offline mode" for your webapp.

- *[Example 23](./example-23-mongoose)*: Demonstrates how to use the `mongoose` package to communicate with a MongoDB instance. This example shows off just interaction with the database - there's no Express or React code here.

- *[Example 24](./example-24-fullstack)*: Demonstrates how we can use the entire MERN stack to create a full-stack web application.

- *[Example 25](./example-25-jest)*: Demonstrates how we can test our JS code using Jest. Several use cases are explored, such as basic testing, setup / teardown, testing exceptions, testing async code, and mocking.

- *[Example 26](./example-26-testing-backend)*: Shows how we can test our MongoDB database schema, and our Express routes.

- *[Example 27](./example-27-testing-frontend)*: Shows how we can test our React code using shallow testing and snapshot testing, as well as some more complex test cases.
