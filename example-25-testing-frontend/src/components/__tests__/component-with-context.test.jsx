import "@testing-library/jest-dom";
import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import { MyContext, MyComponentWithContext } from "../component-with-context";

/**
 * Tests that MyComponentWithContext correctly renders the myGreeting value which is supplied from context.
 * We do this by wrapping the component under test (MyComponentWithContext in this case) in an appropriate
 * context Provider component, supplying our test data un the Provider's value prop.
 */
it("renders myGreeting from context correctly", () => {
  const context = {
    myGreeting: "React is cool!"
  };

  const { getByText } = render(
    <MyContext.Provider value={context}>
      <MyComponentWithContext />
    </MyContext.Provider>
  );

  expect(getByText("React is cool!")).toBeInTheDocument();
});
