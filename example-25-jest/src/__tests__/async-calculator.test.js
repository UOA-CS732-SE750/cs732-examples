import { sum, difference, asyncFailsauce } from '../async-calculator';

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

it('adds 1 + 2 = 3', async () => {
    expect(await sum(1, 2)).toBe(3);
})

it('adds 3 + 5 + 4 = 12', async () => {
    expect(await sum(3, 5, 4)).toBe(12);
})

/** Another possibility: We can make our test function take a "done" argument, and call it to finish the test */

it('adds nothing = 0', done => {
    sum()
        .then(result => {
            expect(result).toBe(0);
            done(); // Calling done with no args will cause the test to finish successfully.
        })
        .catch(err => {
            done(err); /* Calling done with an argument will cause the test to fail,
                          and the value of that arg to be reported to the test runner */
        });

    // If the promise never resolves or rejects, the test will fail with a timeout error. This is a good thing.
})

/** Yet another possibility: return the promise from the testing function, and let JEST handle it. */

it('adds one thing = that thing', () => {
    return sum(42).then(result => expect(result).toBe(42));
})

/** Or we can use JEST's .resolves & .rejects */

it('ignores non-numeric values when adding', () => {
    return expect(sum(3, null, 4, undefined, [], 2, 'Hello', false)).resolves.toBe(9);
})

it('properly rejects this promise', () => {
    return expect(asyncFailsauce()).rejects.toBe('failblog.org');
})

/**
 * The official JEST guidelines state that no one of these is considered superior to any other.
 * Testers should use whichever they feel is better for them / their project.
 */

it('subtracts 10 - 8 - 1 = 1', async () => {
    expect(await difference(10, 8, 1)).toBe(1);
})

it('subtracts nothing = 0', async () => {
    expect(await difference()).toBe(0);
})

it('subtracts one thing = that thing', () => {
    return expect(difference(42)).resolves.toBe(42);
})

it('ignores non-numeric values when subtracting', () => {
    return difference(3, null, 4, undefined, [], 2, 'Hello', false).then(result => expect(result).toBe(-3));
})