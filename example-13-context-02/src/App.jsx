import UserInfoPage from "./UserInfoPage";
import LoginPage from "./LoginPage";
import { AuthContext } from "./auth-context";
import { useState } from "react";

/**
 * Demonstrates how we can modify context information from a child component (LoginPage), and have the changes be propagated to
 * other descendants of the Provider.
 */
function App() {
  const [user, setUser] = useState(undefined);

  return (
    <div style={{ margin: "10px", padding: "5px", border: "1px solid black" }}>
      {/* This Provider provides the "user" state to all descendants.
          This time, it also provides the "setUser" function, so descendants can modify the state if required. */}
      <AuthContext.Provider value={[user, setUser]}>
        <LoginPage />
        <hr />
        <UserInfoPage />
      </AuthContext.Provider>
    </div>
  );
}

export default App;
