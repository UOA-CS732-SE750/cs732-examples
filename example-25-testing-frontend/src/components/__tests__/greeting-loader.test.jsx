import "@testing-library/jest-dom";
import { describe, expect, it } from "vitest";
import { render, fireEvent, waitFor } from "@testing-library/react";
import GreetingLoader from "../greeting-loader";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";

let axiosMock;

beforeAll(() => {
  axiosMock = new MockAdapter(axios);
});

afterEach(() => {
  axiosMock.reset();
});

it("loads a greeting correctly", async () => {
  // Render the component; the text "Hello, World!" or "Loading..." shouldn't be displayed.
  // The queryBy*() functions will return null if the query couldn't find a match.
  const { queryByText, findByText, getByRole } = render(<GreetingLoader url="http://test.com" />);
  expect(queryByText("Hello, world!")).not.toBeInTheDocument();
  expect(queryByText("Loading...")).not.toBeInTheDocument();

  // Setup a mock response from axios - if we send a GET request to http://test.com,
  // simulate returning a "Hello, World!" greeting.
  const data = {
    greeting: "Hello, world!"
  };
  axiosMock.onGet("http://test.com").reply(200, data);

  // Simulate finding the 'Load greeting' button and clicking it.
  // The getBy*() functions will throw an exception if the query couldn't find a match.
  const button = getByRole("button");
  fireEvent.click(button);

  // Now, the "Loading..." text should appear.
  expect(queryByText("Loading...")).toBeInTheDocument();

  // Ensure our component made the GET request properly
  expect(axiosMock.history.get[0].url).toEqual("http://test.com");

  // This line waits for the text to appear, which should appear once the axios call has succeeded.
  // If this times out, then we can assume the component has not updated itself in response to the
  // retrieved data.
  // Default timeout is 1000ms; we can change this by supplying an extra argument.
  // As an alternative, we can use the waitFor*** function.
  const helloWorld = await findByText("Hello, world!");
  // await waitFor(() => getByText('Hello, world!'), { timeout: 1000 });

  // The axios response above should cause the greeting text to be displayed in the UI,
  // and the "loading" message should disappear again.
  expect(helloWorld).toBeInTheDocument();
  expect(queryByText("Loading...")).not.toBeInTheDocument();
});
