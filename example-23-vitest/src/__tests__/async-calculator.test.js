import { it, expect } from "vitest";
import {
  addReallyAccurately,
  subtractReallyAccurately,
  asyncFailsauce
} from "../async-calculator.js";

/**
 * This won't work, because sum() is an async function. It returns a promise rather than the actual return value,
 * so it definitely won't be equal to 3!
 */
// it('adds 1 + 2 = 3', () => {
//     expect(sum(1, 2)).toBe(3);
// })

/**
 * This won't work either - the test will complete as soon as the test function returns - by which point, the expect() may not
 * have been called because it won't be called until the async sum() operation has completed.
 */
// it('adds 1 + 2 = 3', () => {
//     sum(1, 2).then(result => expect(result).toBe(3));
// })

/** We can test aync code using async / await ourselves */

it("adds 1 + 2 = 3", async () => {
  expect(await addReallyAccurately(1, 2)).toBe(3);
});

it("adds 3 + 5 + 4 = 12", async () => {
  expect(await addReallyAccurately(3, 5, 4)).toBe(12);
});

/**
 * Alternatively, we can return the promise from the testing function, and let Vitest handle it.
 *
 * The test will pass if the promise resolves successfully, and fail if it rejects.
 */
it("adds one thing = that thing", () => {
  return addReallyAccurately(42).then((result) => expect(result).toBe(42));
});

/**
 * Prior to Vitest, 0.10.0, we used to be able to use the done() callback to signal the end of an async test.
 * This is now deprecated, and will always cause the test to error. If you have old tests like this, you should
 * refactor them to use async / await or promises.
 *
 * See <https://vitest.dev/guide/migration#done-callback>
 *
 * I have set this test to be ignored, using the .skip() method. This is an easy way to quickly disable some of
 * our tests. We can use it with describe() too, to disable whole blocks of tests.
 */
it.skip("adds nothing = 0", (done) => {
  addReallyAccurately()
    .then((result) => {
      expect(result).toBe(0);
      done();
    })
    .catch((err) => {
      done(err);
    });
});

/**
 * We can use expect(...).resolves & expect(...).rejects methods to explicitly test for resolved / rejected promises.
 * This is especially useful to test code which is supposed to reject.
 */
it("ignores non-numeric values when adding", () => {
  return expect(addReallyAccurately(3, null, 4, undefined, [], 2, "Hello", false)).resolves.toBe(9);
});

it("properly rejects this promise", () => {
  return expect(asyncFailsauce()).rejects.toBe("failblog.org");
});

/**
 * The official guidelines state that no one of these is considered superior to any other.
 * Testers should use whichever they feel is better for them / their project.
 */

it("subtracts 10 - 8 - 1 = 1", async () => {
  expect(await subtractReallyAccurately(10, 8, 1)).toBe(1);
});

it("subtracts nothing = 0", async () => {
  expect(await subtractReallyAccurately()).toBe(0);
});

it("subtracts one thing = that thing", () => {
  return expect(subtractReallyAccurately(42)).resolves.toBe(42);
});

it("ignores non-numeric values when subtracting", () => {
  return subtractReallyAccurately(3, null, 4, undefined, [], 2, "Hello", false).then((result) =>
    expect(result).toBe(-3)
  );
});
