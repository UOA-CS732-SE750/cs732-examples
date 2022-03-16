# CS732 examples - Testing frontend (React) code
This project demonstrates ways in which we can test various aspects of our React code, using the [React testing library](https://testing-library.com/docs/react-testing-library/intro). The library is included by default in any React app created with `create-react-app`. We would recommend you install `@types/jest` to get the best dev experience in VS Code.

The testing library, built on top of the DOM testing library, essentially simulates a browser environment in which developers can "render" their components, and examine the ouutput "on screen", in terms of which HTML elements have been rendered, along with their contents / attributes. We can also simulate user input (e.g. button clicks), and verify that our components behave as expected.

The core function is the `render()` function, into which we can supply our component hierarchy we wish to test. The function returns several functions we can use to examine and interact with rendered content. For example:

- **queryBy\*\*\* functions**: return either the matching component, or `null` if there are no matches.
- **getBy\*\*\* functions**: return either the matching component, or throw an exception (causing the test to fail) if there are no matches.
- **findBy\*\*\* functions**: return a promise which will resolve to the matching component if one is found within a given timeout (default 1000 milliseconds), or reject otherwise.

Variations of these functions include the ability to query by text content, role, or several other factors. The full list of query functions is [available here](https://testing-library.com/docs/queries/about).

In addition to query functions, we can import a `fireEvent` object that can be used to simulate user input (e.g. button clicks), and a `waitFor()` function which can be used to wait for certain events to occur / conditions to be met (via a Promise). Using a combination of all of these functions, we can comprehensively test our React code.


## Examples
[`business-card.test.js`](./src/components/__tests__/business-card.test.js) shows some basic unit tests for a [`BusinessCard`](./src/components/business-card.js) component. We can see the use of the `render()` function here, as well as several query functions (`queryByText()`, `getByRole()`, `getByText()`).

[`component-with-context.test.js`](./src/components/__tests__/component-with-context.test.js) shows how we can test a component which requires the use of context (i.e. obtains some values using `useContext()`). We can surround the component under test with a dummy context provider, which supplies dummy data via the context mechanism.

[`component-with-routes.test.js`](./src/components/__tests__/component-with-routes.test.js) shows how we can test a component which contains React Router components such as `Link`, `NavLink`, `Routes`, and `Outlet`. If we render any React Router components, we must surround our components under test in some kind of Router, or we will get errors. React Router provides the `MemoryRouter` component which works really well for this purpose. It provides an `initialEntries` prop which we can use to supply the initial simulated browser history stack, thus being able to "start the app" at any particular URL we desire. In these tests, we use this functionality to check whether the correct components are being rendered when the user navigates to particular paths.

[`greeting-loader.test.js`](./src/components/__tests__/greeting-loader.test.js) shows how we can combine axios mocking with `axios-mock-adapter`, with our React testing code. In this test, we're examining the `GreetingLoader` component, which should load a greeting from a web API and display it, when we click a button. We we are simulating that button click, then using `axios-mock-adapter` to return a dummy web response to our component, then ensuring the content contained within that response is correctly rendered. **Note:** For another example involving `axios-mock-adapter` by itself, refer to [example 23](../example-23-jest/).
