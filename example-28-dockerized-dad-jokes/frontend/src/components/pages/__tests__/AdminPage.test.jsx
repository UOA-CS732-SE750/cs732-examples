import "@testing-library/jest-dom";
import AdminPage from "../AdminPage";
import { fireEvent, render } from "@testing-library/react";
import { afterAll, afterEach, describe, test, vi } from "vitest";
import useDadJokes from "../../../hooks/useDadJokes";

// Setup a mock for the useDadJokes hook
vi.mock("../../../hooks/useDadJokes", () => {
  return {
    default: vi.fn()
  };
});

// Clear mocks after each test
afterEach(() => {
  vi.clearAllMocks();
});

// Remove mocking when we're done
afterAll(() => {
  vi.restoreAllMocks();
});

describe("AdminPage rendering", () => {
  test("renders loading state", () => {
    // Mock the useDadJokes hook to return loading state
    useDadJokes.mockReturnValue({
      jokes: [],
      loading: true,
      error: null,
      addJoke: vi.fn(),
      deleteJoke: vi.fn()
    });

    const { getByText } = render(<AdminPage />);
    expect(getByText(/Loading.../i)).toBeInTheDocument();
  });

  test("renders jokes list", () => {
    // Mock the useDadJokes hook to return a list of jokes
    const mockJokes = [
      { _id: "1", text: "Joke 1" },
      { _id: "2", text: "Joke 2" }
    ];
    useDadJokes.mockReturnValue({
      jokes: mockJokes,
      loading: false,
      error: null,
      addJoke: vi.fn(),
      deleteJoke: vi.fn()
    });

    const { getByText } = render(<AdminPage />);

    expect(getByText("Joke 1")).toBeInTheDocument();
    expect(getByText("Joke 2")).toBeInTheDocument();
  });

  test("renders error message", () => {
    // Mock the useDadJokes hook to return an error
    useDadJokes.mockReturnValue({
      jokes: [],
      loading: false,
      error: "Error loading jokes",
      addJoke: vi.fn(),
      deleteJoke: vi.fn()
    });

    const { getByText } = render(<AdminPage />);
    expect(getByText("Error loading jokes")).toBeInTheDocument();
  });
});

describe("AdminPage functionality", () => {
  test("adds a joke", () => {
    // Mock the useDadJokes hook to return initial state
    const mockAddJoke = vi.fn();
    useDadJokes.mockReturnValue({
      jokes: [],
      loading: false,
      error: null,
      addJoke: mockAddJoke,
      deleteJoke: vi.fn()
    });

    const { getByText, getByRole } = render(<AdminPage />);
    const addButton = getByText("Add");
    const inputText = getByRole("textbox");

    // Simulate typing in the input field then clicking the add button
    fireEvent.change(inputText, { target: { value: "New Joke" } });
    fireEvent.click(addButton);

    expect(mockAddJoke).toHaveBeenCalledWith("New Joke");
  });

  test("deletes a joke", () => {
    // Mock the useDadJokes hook to return a list of jokes
    const mockDeleteJoke = vi.fn();
    const mockJokes = [{ _id: "1", text: "Joke 1" }];
    useDadJokes.mockReturnValue({
      jokes: mockJokes,
      loading: false,
      error: null,
      addJoke: vi.fn(),
      deleteJoke: mockDeleteJoke
    });

    const { getByText } = render(<AdminPage />);
    const deleteButton = getByText("Delete");
    fireEvent.click(deleteButton);

    expect(mockDeleteJoke).toHaveBeenCalledWith("1");
  });
});
