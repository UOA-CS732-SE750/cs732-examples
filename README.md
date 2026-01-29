# COMPSCI 732 / SOFTENG 750 Examples Repository

This repository contains example code demonstrating various React / Node.js / Express / MongoDB features.

## Index

- _[JavaScript examples](./example-00-javascript-examples)_: Doesn't demonstrate any MERN-stack code per se, but introduces advanced JavaScript language features which are used often in the creation of such apps. These features may be unfamiliar to you if you've learned programming in other languages, and they aren't introduced in COMPSCI 719. So it might pay to check them out!

- _[My First React App](./example-01-my-first-react-app)_: Demonstrates about the simplest React app possible. No toolchains or libraries required other than React itself.

- _[My First JSX App](./example-02-my-first-react-app-jsx)_: Shows how we can use Babel to transpile JSX code into a format which can be interpreted by all browsers.

- _[Vite+React](./example-03-vite-default)_: Shows the default output of running `npm create vite@latest`, selecting `React` and `JavaScript + SWC` as options, as of February 2024.

- _[Stripped-down starter project](./example-03b-vite-blank)_: A stripped-down version of the Vite+React starter project above.

- _[Components, Logic & Loops](./example-04-components-logic-loops)_: Demonstrates simple React components with props, use of the ternary operator (`?`) and `&&` for conditional rendering, and iteration using the `map()` function.

- _[CSS Imports](./example-05-css-imports)_: Demonstrates how to import and use raw CSS files in react webapps.

- _[CSS Modules](./example-06-css-modules)_: Demonstrates how to import and use CSS modules.

- _[useState() Hook](./example-07-usestate)_: Demonstrates how to give components local state using the `useState()` hook.

- _[useEffect() Hook](./example-08-useeffect)_: Demonstrates how to have components give side-effects using the `useEffect()` hook.

- _[useRef() Hook](./example-09-useref)_: Demonstrates how to reference an HTML element using the `useRef()` hook, with a practical example involving HTML forms.

- _[Routing Examples](./example-10-routing-01)_: Demonstrates basic use of React Router, **version 6** _(NOT backwards compatible with older versions)_.

- _[More Routing Examples](./example-11-routing-02)_: Demonstrates mode advanced use of React Router.

- _[React Context API](./example-12-context-01)_: Shows how to use the React Context API. Shows how to set up a context using `React.createContext()`, and how to obtain its value using `useContext()`.

- _[More Context](./example-13-context-02)_: Expands on the previous example by showing how we can set up a context whose value can be modified from child classes, with appropriate re-rendering occurring as expected.

- _[Local Storage](./example-14-localstorage-01)_: Shows how we can use the local storage API provided by all modern browsers to persist key-value pairs which will be local to a given origin. This example shows just usage of `localStorage`, without React.

- _[Local Storage with React](./example-15-localstorage-02)_: Shows how we can integrate local storage into our React apps. Two methods are shown.

- _[MUI](./example-16-mui)_: Shows off one of our previous examples, rewritten with [MUI](https://mui.com/).

- _[Encapsulating State](./example-17-encapsulating-state)_: Demonstrates one way we can encapsulate stateful values, and their mutator functions, in a context provider wrapper component.

- _[Node.js / Express](./example-18-express)_: A simple example of a Node.js / Express web server, configured with some useful middleware.

- _[Express Routers, fetch(), and axios](./example-19-routes-fetch-axios)_: Shows a simple example of using `fetch()` and `axios` from client-side code. Also demonstrates one possible way in which Express Router can be used to more appropriately organize your server route handler code.

- _[Express with React](./example-20-react-express)_: Demonstrates how we can use a create-react-app frontend in combination with a Node.js / Express backend.

  **Note:** This example is setup as a [monorepo](https://monorepo.tools/) with both frontend and backend projects (in their own folders), and uses [npm workspaces](https://docs.npmjs.com/cli/v8/using-npm/workspaces) to help manage dependencies and npm commands for the monorepo. All future examples with both frontend and backend components also use this structure.

- _[MongoDB & Mongoose](./example-21-mongoose)_: Demonstrates how to use the `mongoose` package to communicate with a MongoDB instance. This example shows off just interaction with the database - there's no Express or React code here.

- _[The MERN Stack](./example-22-fullstack)_: Demonstrates how we can use the entire MERN stack to create a full-stack web application.

- _[Testing with Vitest](./example-23-vitest)_: Demonstrates how we can test our JS code using Vitest. Several use cases are explored, such as basic testing, setup / teardown, testing exceptions, testing async code, and mocking.

- _[Testing your Backend](./example-24-testing-backend)_: Shows how we can test our MongoDB database schema using [`mongodb-memory-server`](https://www.npmjs.com/package/mongodb-memory-server), and our Express routes using [`supertest`](https://www.npmjs.com/package/supertest).

- _[Testing your Frontend](./example-25-testing-frontend)_: Shows how we can test our React code using the [React testing library](https://testing-library.com/docs/react-testing-library/intro/).

- _[Dockerized todo list](./example-27-dockerized-todo-list)_: Shows a simple frontend react app which has been dockerized. The docker container uses a multi-stage build process which first builds the frontend, then copies just the static build output into an [nginx](https://nginx.org/) container for running.

- _[Dockerized dad jokes](./example-28-dockerized-dad-jokes)_: Shows a full-stack MERN app monorepo that has been dockerized, with a docker compose file setup to build and run the frontend, backend, and database in one easy command.

- _[TypeScript](./example-29-fullstack-typescript)_: [TypeScript](https://www.typescriptlang.org/) is essentially JavaScript, with proper type safety added. This example is a clone of the "fullstack" example above, but with TypeScript instead of JavaScript on both the frontend and backend.
