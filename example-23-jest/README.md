# CS732 examples - Testing with Jest
This project shows off several examples of how to test JavaScript code using Jest:

- Basic testing can be seen in [calculator.test.js](./src/__tests__/calculator.test.js), which tests functions which perform mathematical operations, found in [calculator.js](./src/calculator.js).

- More basic testing can be seen in [bank-account.test.js](./src/__tests__/bank-account.test.js), which tests the `BankAccount` class in [bank-account.js](./src/bank-account.js). In this test suite, we can also see test setup / teardown code.

- Testing of code which throws exceptions can be seen in [exceptions.test.js](./src/__tests__/exceptions.test.js), which tests the code in [exceptions.js](./src/exceptions.js).

- Testing of async code can be seen in [async-calculator.test.js](./src/__tests__/async-calculator.test.js), which tests an asynchronous calculator located in (async-calculator.js)[./src/async-calculator.js].

- Tests which require *mocking* can be seen in [things-to-mock.test.js](./src/__tests__/things-to-mock.test.js). These tests exercise code found in [things-to-mock.js](./src/things-to-mock.js). One of the tests uses the [`axios-mock-adapter`](https://www.npmjs.com/package/axios-mock-adapter) package to mock Axios calls.

In addition to the tests, config files for the runtime environment and Jest can be found in [babel.config.js](./babel.config.js) and [jest.config.js](./jest.config.js) respectively. Note that these config files won't need to be supplied when testing your `create-react-app` code, as these configs are the defaults for those projects. But you may need them to test your Express backend code.
