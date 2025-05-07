import { test, describe, expect, afterEach } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import useDadJokes from "../useDadJokes";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";

const axiosMock = new MockAdapter(axios);

afterEach(() => {
  axiosMock.reset();
});

describe("fetching jokes", () => {
  test("should fetch jokes", async () => {
    // Mock the API response to return a list of jokes
    axiosMock.onGet("http://localhost:3000/api/dad-jokes").reply(200, [
      { _id: "1", text: "Joke 1" },
      { _id: "2", text: "Joke 2" }
    ]);

    const { result } = renderHook(() => useDadJokes());

    // Wait for the jokes to be fetched. If takes more than 1000ms, the test will fail
    await waitFor(() => expect(result.current.loading).toBe(false), { timeout: 1000 });

    expect(result.current.jokes).toEqual([
      { _id: "1", text: "Joke 1" },
      { _id: "2", text: "Joke 2" }
    ]);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe(null);
  });

  test("Should handle error when fetching jokes", async () => {
    // Mock the API response to return an error
    axiosMock.onGet("http://localhost:3000/api/dad-jokes").reply(500, "Internal Server Error");

    const { result } = renderHook(() => useDadJokes());

    // Wait for the jokes to be fetched. If takes more than 1000ms, the test will fail
    await waitFor(() => expect(result.current.loading).toBe(false), { timeout: 1000 });

    expect(result.current.jokes).toEqual([]);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe("Internal Server Error");
  });
});

describe("adding jokes", () => {
  test("should add a joke", async () => {
    // Mock the API response to return a list of jokes to start with (empty list)
    axiosMock.onGet("http://localhost:3000/api/dad-jokes").reply(200, []);

    // Mock the API response to return a new joke when receiving a POST request
    axiosMock
      .onPost("http://localhost:3000/api/dad-jokes")
      .reply(200, { _id: "3", text: "Joke 3" }, { Location: "/api/dad-jokes/3" });

    // Wait for initial fetch
    const { result } = renderHook(() => useDadJokes());
    await waitFor(() => expect(result.current.loading).toBe(false), { timeout: 1000 });

    // Try to add a new joke
    result.current.addJoke("Joke 3");

    // Wait for the joke to be added, give it 1 second to be added
    await waitFor(() => expect(result.current.jokes).toEqual([{ _id: "3", text: "Joke 3" }]), {
      timeout: 1000
    });

    // There should be no error or loading status
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe(null);
  });

  test("should handle error when adding a joke", async () => {
    // Mock the API response to return a list of jokes to start with (empty list)
    axiosMock.onGet("http://localhost:3000/api/dad-jokes").reply(200, []);

    // Mock the API response to return an error when receiving a POST request
    axiosMock
      .onPost("http://localhost:3000/api/dad-jokes")
      .withDelayInMs(100)
      .reply(500, "Internal Server Error");

    // Wait for initial fetch
    const { result } = renderHook(() => useDadJokes());
    await waitFor(() => expect(result.current.loading).toBe(false), { timeout: 1000 });

    // Try to add a new joke
    result.current.addJoke("Joke 3");

    // We should see the new joke in the list (optimistically added)
    await waitFor(() => expect(result.current.jokes).toEqual([{ text: "Joke 3" }]), {
      timeout: 1000
    });

    // When the HTTP error occurs, the joke should be removed from the list and the error message should be set
    await waitFor(() => expect(result.current.jokes).toEqual([]), { timeout: 1000 });
    expect(result.current.error).toBe("Internal Server Error");
  });
});

describe("deleting jokes", () => {
  test("should delete a joke", async () => {
    // Mock the API response to return a list of jokes to start with
    axiosMock.onGet("http://localhost:3000/api/dad-jokes").reply(200, [
      { _id: "1", text: "Joke 1" },
      { _id: "2", text: "Joke 2" }
    ]);

    // Mock the API response to return a success message when receiving a DELETE request
    axiosMock.onDelete("http://localhost:3000/api/dad-jokes/1").reply(204);

    const { result } = renderHook(() => useDadJokes());

    // Wait for the jokes to be fetched.
    await waitFor(() => expect(result.current.loading).toBe(false), { timeout: 1000 });

    // Try to delete a joke
    result.current.deleteJoke("1");

    // Wait for the joke to be deleted, give it 1 second to be deleted
    await waitFor(() => expect(result.current.jokes).toEqual([{ _id: "2", text: "Joke 2" }]), {
      timeout: 1000
    });

    // There should be no error or loading status
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe(null);
  });

  test("should handle error when deleting a joke", async () => {
    // Mock the API response to return a list of jokes to start with
    axiosMock.onGet("http://localhost:3000/api/dad-jokes").reply(200, [
      { _id: "1", text: "Joke 1" },
      { _id: "2", text: "Joke 2" }
    ]);

    // Mock the API response to return an error when receiving a DELETE request
    axiosMock
      .onDelete("http://localhost:3000/api/dad-jokes/1")
      .withDelayInMs(100)
      .reply(500, "Internal Server Error");

    const { result } = renderHook(() => useDadJokes());

    // Wait for the initial jokes to be fetched.
    await waitFor(() => expect(result.current.loading).toBe(false), { timeout: 1000 });

    // Try to delete a joke
    result.current.deleteJoke("1");

    // We should see the joke removed from the list (optimistically deleted)
    await waitFor(() => expect(result.current.jokes).toEqual([{ _id: "2", text: "Joke 2" }]), {
      timeout: 1000
    });

    // When the HTTP error occurs, the joke should be added back to the list and the error message should be set
    await waitFor(
      () =>
        expect(result.current.jokes).toEqual([
          { _id: "1", text: "Joke 1" },
          { _id: "2", text: "Joke 2" }
        ]),
      {
        timeout: 1000
      }
    );
    expect(result.current.error).toBe("Internal Server Error");
  });
});
