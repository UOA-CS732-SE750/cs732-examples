import "@testing-library/jest-dom";
import { describe, test, expect } from "vitest";
import NavBar from "../NavBar";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { test, expect } from "vitest";
import styles from "../NavBar.module.css";

describe("NavBar display", () => {
  test("renders the NavBar component", () => {
    const { getByText, getByRole } = render(
      <MemoryRouter>
        <NavBar />
      </MemoryRouter>
    );

    expect(getByRole("navigation")).toBeInTheDocument();
    expect(getByText("Daily Joke")).toBeInTheDocument();
    expect(getByText("Admin")).toBeInTheDocument();
  });

  test("renders the correct links", () => {
    const { getByText } = render(
      <MemoryRouter>
        <NavBar />
      </MemoryRouter>
    );

    expect(getByText("Daily Joke").closest("a")).toHaveAttribute("href", "/");
    expect(getByText("Admin").closest("a")).toHaveAttribute("href", "/admin");
  });

  test("applies the active class to the current link", () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={["/admin"]}>
        <NavBar />
      </MemoryRouter>
    );

    expect(getByText("Admin").closest("a")).toHaveClass(styles.active);
    expect(getByText("Daily Joke").closest("a")).not.toHaveClass(styles.active);
  });
});
