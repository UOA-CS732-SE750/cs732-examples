# CS732 examples - Testing with Vitest

**Note:** In CS732, we originally used Jest, rather than Vitest, for testing the backend. However, since we use Vitest on the frontend, and Jest doesn't properly support mocking with ES6 modules, we switched to Vitest for backend testing too.

This project shows off several examples of how to test JavaScript code using Vitest:

- Basic testing can be seen in [calculator.test.js](./src/__tests__/calculator.test.js), which tests functions which perform mathematical operations, found in [calculator.js](./src/calculator.js).

- More basic testing can be seen in [bank-account.test.js](./src/__tests__/bank-account.test.js), which tests the `BankAccount` class in [bank-account.js](./src/bank-account.js). In this test suite, we can also see test setup / teardown code.

- Testing of code which throws exceptions can be seen in [exceptions.test.js](./src/__tests__/exceptions.test.js), which tests the code in [exceptions.js](./src/exceptions.js).

- Testing of async code can be seen in [async-calculator.test.js](./src/__tests__/async-calculator.test.js), which tests an asynchronous calculator located in (async-calculator.js)[./src/async-calculator.js].

- Tests which require _mocking_ can be seen in [things-to-mock.test.js](./src/__tests__/things-to-mock.test.js). These tests exercise code found in [things-to-mock.js](./src/things-to-mock.js). One of the tests uses the [`axios-mock-adapter`](https://www.npmjs.com/package/axios-mock-adapter) package to mock Axios calls.

In addition to the tests, config files for Vitest can be found in [vitest.config.js](./vitest.config.js) and [vitest.setup.js](./vitest.setup.js).
