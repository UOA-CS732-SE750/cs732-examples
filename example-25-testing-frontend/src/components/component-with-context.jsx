import React, { useContext } from "react";

export const MyContext = React.createContext({ myGreeting: "Hi" });

export function MyComponentWithContext() {
  const { myGreeting } = useContext(MyContext);

  return <p>{myGreeting}</p>;
}
