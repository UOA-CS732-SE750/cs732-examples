# COMPSCI 732 / SOFTENG 750 Examples Repository
This repository contains example code demonstrating various React / Node.js / Express / MongoDB features.

## Index

- *[JavaScript examples](./example-00-javascript-examples)*: Doesn't demonstrate any MERN-stack code per se, but introduces advanced JavaScript language features which are used often in the creation of such apps. These features may be unfamiliar to you if you've learned programming in other languages, and they aren't introduced in COMPSCI 719. So it might pay to check them out!

- *[My First React App](./example-01-my-first-react-app)*: Demonstrates about the simplest React app possible. No toolchains or libraries required other than React itself.

- *[My First JSX App](./example-02-my-first-react-app-jsx)*: Shows how we can use Babel to transpile JSX code into a format which can be interpreted by all browsers.

- *[create-react-app](./example-03-cra-default)*: Shows the default output of the `create-react-app` tool, as of January 27th, 2022.

- *[Components, Logic & Loops](./example-04-components-logic-loops)*: Demonstrates simple React components with props, use of the ternary operator (`?`) and `&&` for conditional rendering, and iteration using the `map()` function.

- *[CSS Imports](./example-05-css-imports)*: Demonstrates how to import and use raw CSS files in react webapps.

- *[CSS Modules](./example-06-css-modules)*: Demonstrates how to import and use CSS modules.

- *[useState() Hook](./example-07-usestate)*: Demonstrates how to give components local state using the `useState()` hook.

- *[useEffect() Hook](./example-08-useeffect)*: Demonstrates how to have components give side-effects using the `useEffect()` hook.

- *[Routing Examples](./example-09-routing-01)*: Demonstrates basic use of React Router, **version 6** *(NOT backwards compatible with older versions)*.

- *[More Routing Examples](./example-10-routing-02)*: Demonstrates mode advanced use of React Router.

- *[React Context API](./example-11-context-01)*: Shows how to use the React Context API. Shows how to set up a context using `React.createContext()`, and how to obtain its value using `useContext()`.

- *[More Context](./example-12-context-02)*: Expands on the previous example by showing how we can set up a context whose value can be modified from child classes, with appropriate re-rendering occurring as expected.

- *[Local Storage](./example-13-localstorage-01)*: Shows how we can use the local storage API provided by all modern browsers to persist key-value pairs which will be local to a given origin. This example shows just usage of `localStorage`, without React.

- *[Local Storage with React](./example-14-localstorage-02)*: Shows how we can integrate local storage into our React apps. Two methods are shown.

- *[MUI](./example-15-mui)*: Shows off one of our previous examples, rewritten with [MUI](https://mui.com/).

- *[Encapsulating State](./example-16-encapsulating-state)*: Demonstrates one way we can encapsulate stateful values, and their mutator functions, in a context provider wrapper component.

- *[Node.js / Express](./example-17-express)*: A simple example of a Node.js / Express web server.

- *[Express Routers, fetch(), and axios](./example-18-routes-fetch-axios)*: Shows a simple example of using `fetch()` and `axios` from client-side code. Also demonstrates one possible way in which Express Router can be used to more appropriately organize your server route handler code.

- *[Express with React](./example-19-react-express)*: Demonstrates how we can use a create-react-app frontend in combination with a Node.js / Express backend.

- *[Service Workers](./example-20-service-worker)*: Demonstrates how we can use a service worker to cache files, enabling "offline mode" for your webapp.

- *[MongoDB & Mongoose](./example-21-mongoose)*: Demonstrates how to use the `mongoose` package to communicate with a MongoDB instance. This example shows off just interaction with the database - there's no Express or React code here.

- *[The MERN Stack](./example-22-fullstack)*: Demonstrates how we can use the entire MERN stack to create a full-stack web application.

- *[Testing with Jest](./example-23-jest)*: Demonstrates how we can test our JS code using Jest. Several use cases are explored, such as basic testing, setup / teardown, testing exceptions, testing async code, and mocking.

- *[Testing your Backend](./example-24-testing-backend)*: Shows how we can test our MongoDB database schema using [`mongodb-memory-server`](https://www.npmjs.com/package/mongodb-memory-server), and our Express routes using [`supertest`](https://www.npmjs.com/package/supertest).

- *[Testing your Frontend](./example-25-testing-frontend)*: Shows how we can test our React code using the [React testing library](https://testing-library.com/docs/react-testing-library/intro/).
