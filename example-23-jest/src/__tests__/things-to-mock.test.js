import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import SoundPlayer from '../sound-player';
import {
    myForEachFunction,
    coinFlip,
    coinFlip2,
    getArticle,
    beep
} from '../things-to-mock';

/**
 * Setup the axios mock here.
 */
const axiosMock = new MockAdapter(axios);

// This line replaces the SoundPlayer class with a mock class for the rest of this file.
jest.mock('../sound-player');


/**
 * If we have a global mock like axios, its good practice to clear it after each test run,
 * so failures in one test don't cause failures in other tests.
 */
afterEach(() => {
    SoundPlayer.mockClear();
    axiosMock.reset();
});

/**
 * This tests whether our forEach function appropriately calls a callback.
 * 
 * It shows how we can use jest's mocking API to check how many times mock functions have
 * been called, and what arguments they are called with.
 */
it('forEach appropriately calls the callback', () => {

    // If we don't care what the function does we can simply mock it like this.
    // This will take any number of args and return undefined.
    const mockCallback = jest.fn();

    myForEachFunction(['a', 'b', 'c'], mockCallback);

    // Our callback should have been called 3 times
    expect(mockCallback.mock.calls.length).toBe(3);

    // The first call to the callback should have been with the values ('a', 0)
    expect(mockCallback.mock.calls[0][0]).toBe('a');
    expect(mockCallback.mock.calls[0][1]).toBe(0);

    // The second call to the callback should have been with the values ('b', 1)
    expect(mockCallback.mock.calls[1][0]).toBe('b');
    expect(mockCallback.mock.calls[1][1]).toBe(1);

    // The first call to the callback should have been with the values ('c', 2)
    expect(mockCallback.mock.calls[2][0]).toBe('c');
    expect(mockCallback.mock.calls[2][1]).toBe(2);

})


/**
 * This tests that coinFlip() returns Heads when its provided random source is > 0.5.
 * 
 * It shows how we can mock a function to return any values we like, in addition to the
 * spying functionality shown in the previous test.
 */
it('coinFlip calls our random source and returns heads when given a value > 0.5', () => {

    // A mock random source that we can spy on as with the above test, that always returns
    // the value we want.
    const mockRandom = jest.fn(() => 0.75);

    expect(coinFlip(mockRandom)).toBe('Heads');
    expect(mockRandom.mock.calls.length).toBe(1);
})

/**
 * This tests that coinFlip() returns Tails when its provided random source is < 0.5.
 */
it('coinFlip calls our random source and returns tails when given a value < 0.5', () => {

    const mockRandom = jest.fn(() => 0.25);

    expect(coinFlip(mockRandom)).toBe('Tails');
    expect(mockRandom.mock.calls.length).toBe(1);
})

/**
 * A describe can have its own beforeEach and afterEach functions.
 * 
 * Here, we're replacing the functionality of the Math.random() function for all
 * tests within this block.
 */
describe('coinFlip2 tests', () => {

    /**
     * Before each test in this block, replace Math.random() with a mock function
     * that will let us spy on it.
     * 
     * By default, the mock function calls through to the function we're mocking,
     * but we can change that as shown below.
     */
    beforeEach(() => {
        jest.spyOn(Math, 'random');
    })

    /**
     * After each test in this block, restore Math.random to its original state.
     */
    afterEach(() => {
        Math.random.mockRestore();
    })

    it('coinFlip2 returns heads whenever Math.random() returns > 0.5', () => {

        // From now on, Math.random() will always return 0.75
        Math.random.mockReturnValue(0.75);

        expect(coinFlip2()).toBe('Heads');
        expect(Math.random.mock.calls.length).toBe(1);
    })

    it('coinFlip2 returns tails whenever Math.random() returns < 0.5', () => {

        // From now on, Math.random() will always return 0.25
        Math.random.mockReturnValue(0.25);

        expect(coinFlip2()).toBe('Tails');
        expect(Math.random.mock.calls.length).toBe(1);
    })
});

/**
 * This tests that our getArticle() function makes an appropriate axios.get() call, and does the correct
 * thing with the response.
 * 
 * We are using jest-mock-axios to help us test this. We have enabled axios mocking for all tests by manually
 * mocking axios in ../__mocks__/axios.js.
 */
it('getArticle fetches from trex-sandwich server', async () => {

    // Setup our axios mock - simulate a 200 OK response, returning this article.
    const dummyArticle = {
        id: 2,
        title: 'The title',
        content: 'The content'
    }
    axiosMock.onGet('https://trex-sandwich.com/ajax/articles?id=2').reply(200, dummyArticle);

    // Create our "then" and "catch" functions which will be called if the promise returned
    // by getArticle resolves or is rejected.
    const catchFn = jest.fn();
    const thenFn = jest.fn();

    // Set up the test
    const promise = getArticle(2)
        .then(thenFn)
        .catch(catchFn);

    await promise; // This waits until the "then" and / or "catch" above have been called.

    // Make sure axios was called correctly by our code
    expect(axiosMock.history.get[0].url).toEqual('https://trex-sandwich.com/ajax/articles?id=2');

    // Make sure the "then" function was called with the correct data
    expect(thenFn).toHaveBeenCalledWith(dummyArticle);

    // Make sure the "catch" function was not called.
    expect(catchFn).not.toHaveBeenCalled();
})

/**
 * This tests whether our beep() function instantiates and makes appropriate use of a SoundPlayer.
 * 
 * We are enabling this test by mocking the ../sound-player module near the top of this file,
 * using jest.mock(...)
 */
it('beep uses a SoundPlayer properly', () => {

    beep();

    // Check that the beep function created one new SoundPlayer, with the proper arguments.
    expect(SoundPlayer).toHaveBeenCalledTimes(1);
    expect(SoundPlayer.mock.calls[0][0].volume).toBe(42);
    expect(SoundPlayer.mock.calls[0][0].repeat).toBe(false);
    const mockSoundPlayer = SoundPlayer.mock.instances[0];

    // Check that the mock sound player's playSoundFile method was called once, with the proper argument.
    const mockPlayFile = mockSoundPlayer.playSoundFile;
    expect(mockPlayFile).toHaveBeenCalledTimes(1);
    expect(mockPlayFile).toHaveBeenCalledWith('./beep.mp3');
})