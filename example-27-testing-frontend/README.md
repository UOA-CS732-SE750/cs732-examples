# CS732 examples - Lecture 04 - Example 27 - Testing frontend (React) code
This project demonstrates three different ways we can test our React code:

- Shallow testing with `enzyme`
- Snapshot testing
- Deep UI inspection and event simulation with the react testing library


## Shallow testing
Shallow testing lets us test our React components in isolation, even if those React components use other React components internally.

For example, let's say that we have a component, `Page`, which is supposed to render some structure which includes other React components. For example:

```jsx
<div>
    <h1>This is my page!</h1>
    <div className="grid">
        <Sidebar buttons={['Menu 1', 'Menu 2']} />

        <Main>
            <h3>Subtitle</h3>
            <p>Some text</p>
        </Main>
    </div>
</div>
```

We can use shallow testing to check that the `Sidebar` and `Main` components are being used correctly by our `Page` component - even if the `Sidebar` or `Main` components themselves contain errors. An example of these tests can be found in [page.test.js](./src/components/__tests__/page.test.js), which tests exactly the React code shown above.


## Snapshot testing
Snapshot testing lets us essentially "save" the output of our program (i.e. save a snapshot) at a time when we're confident of the correctness of that output. Then, whenever we make a change to our code which causes the output of the program to change, our test runner software (Jest in our case) will let us know that the snapshot has changed. At this time, we inspect the new output and we can either accept it if we're happy, or reject it otherwise.

In the case of a React app (or individual React components), the "output" of the program is the actual HTML that ends up being rendered on a page. This output is stored as text files in the [__snapshots__](./src/components/__tests__/__snapshots__) folder the first time the tests are run. Then, when the tests are run again, the new output will be compared with the saved output. If there are any differences, Jest will warn us and ask whether to accept or reject the changes. If we accept, the new output will overwrite the old output.

In this project, example snapshot tests are given in [business-card.test.js](./src/components/__tests__/business-card.test.js), which snapshot a `BusinessCard` component.

Snapshot tests are particularly good for ensuring that we don't introduce any accidental changes to our program's output - once various components have reached their "final" versions, their output shouldn't continue to change unless we make a mistake in our code.


## Deep UI inspection and event simulation
Sometimes we want to more precisely examine the output of our React code, and simulate events such as button clicks. To do this we can use the React testing libarary. This contains a `fireEvent` object which lets us simulate events, and various query functions which let us determine whether or not particular HTML elements are being rendered by our React code, and what their nesting is.

An example of its usage is given in [greeting-loader.test.js](./src/components/__tests__/greeting-loader.test.js), which tests a `GreetingLoader` component. When a button within that component is clicked, a `GET` request should be made to a particular URL, and the data returned from that URL should be displayed in the UI. The tests within `greeting-loader.test.js` ensure that this occurrs.

For more information on the React testing library and what it can offer, please refer to its documentation, at <https://testing-library.com/docs/react-testing-library/intro/>.
