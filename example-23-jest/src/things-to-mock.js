import axios from "axios";
import SoundPlayer from "./sound-player.js";

/**
 * A function that's supposed to call the given callback function once for each element in the given array.
 *
 * We might want to test this by providing a callback function which can be examined in terms of the number of times
 * it has been called, and the arguments provided to it for each call.
 */
export function myForEachFunction(array, callback) {
  for (let i = 0; i < array.length; i++) {
    callback(array[i], i);
  }
}

/**
 * A function that's supposed to return 'Heads' or 'Tails' at "random". The randomness is given from a function
 * which should return a number between 0 and 1.
 *
 * We might want to test this by providng a randomSource which returns values we want, rather than actual random data.
 */
export function coinFlip(randomSource) {
  if (randomSource() >= 0.5) {
    return "Heads";
  } else {
    return "Tails";
  }
}

/**
 * A function that's supposed to return 'Heads' or 'Tails' at "random". The randomness is given from
 * the built-in Math.random() function.
 *
 * We might want to test this by replacing Math.random() with something that does what we want it to.
 */
export function coinFlip2() {
  if (Math.random() >= 0.5) {
    return "Heads";
  } else {
    return "Tails";
  }
}

/**
 * A function that's supposed to fetch and return the article with the given id from a web server.
 *
 * We might want to test this by replacing axios.get() with something that does what we want it to.
 */
export async function getArticle(articleId) {
  const response = await axios.get(`https://trex-sandwich.com/ajax/articles?id=${articleId}`);
  return response.data;
}

/**
 * A function that's supposed to play a "beep" sound using an instance of a SoundPlayer object.
 *
 * We might want to test this by replacing the SoundPlayer class with a mock class that lets us
 * determine whether its constructor / methods have been called appropriately.
 */
export function beep() {
  const player = new SoundPlayer({ volume: 42, repeat: false });
  player.playSoundFile("./beep.mp3");
}
