import "@testing-library/jest-dom";
import { describe, test, expect, afterEach } from "vitest";
import MockAdapter from "axios-mock-adapter";
import axios from "axios";
import { render, fireEvent } from "@testing-library/react";
import HomePage from "../HomePage";

const axiosMock = new MockAdapter(axios);

afterEach(() => {
  axiosMock.reset();
});

describe("HomePage", () => {
  test("fetches and displays a joke", async () => {
    // Mock a joke to be returned from the API
    const joke = "Why did the chicken cross the road? To get to the other side!";
    axiosMock
      .onGet("http://localhost:3000/api/dad-jokes/random")
      .reply(200, { _id: "1", text: joke });

    // Render the HomePage component
    const { findByText } = render(<HomePage />);

    // Joke should be displayed after the API call
    expect(await findByText(joke, {}, { timeout: 1000 })).toBeInTheDocument();
  });

  test("Displays another joke when button clicked", async () => {
    // Mock a joke to be returned from the API
    const joke = "Why did the chicken cross the road? To get to the other side!";
    axiosMock
      .onGet("http://localhost:3000/api/dad-jokes/random")
      .reply(200, { _id: "1", text: joke });

    // Render the HomePage component
    const { findByText } = render(<HomePage />);

    // Joke should be displayed after the API call
    expect(await findByText(joke, {}, { timeout: 1000 })).toBeInTheDocument();

    // Mock another joke to be returned from the API
    const anotherJoke = "Why don't scientists trust atoms? Because they make up everything!";
    axiosMock
      .onGet("http://localhost:3000/api/dad-jokes/random")
      .reply(200, { _id: "2", text: anotherJoke });

    // Simulate button click to fetch another joke
    const button = await findByText("Tell me another!");
    fireEvent.click(button);

    // Another joke should be displayed after the API call
    expect(await findByText(anotherJoke, {}, { timeout: 1000 })).toBeInTheDocument();
  });
});
