import UserInfoPage from "./UserInfoPage";
import { AuthContext } from './auth-context';
import { useState } from 'react';

/**
 * Demonstrates how we can set context information in a root component, then access it from any child component
 * without expressly supplying it as props.
 */
function App() {

  const [user, setUser] = useState(undefined);

  return (
    <div style={{ margin: '10px', padding: '5px', border: '1px solid black' }}>

      {/* Some buttons to modify the "user" state */}
      <div>
        <button onClick={() => setUser({ username: 'Bob' })}>Log in</button>
        <button onClick={() => setUser(undefined)}>Log out</button>
      </div>

      <hr />

      {/* This Provider provides the "user" state to all descendants */}
      <AuthContext.Provider value={user}>
        <UserInfoPage />
      </AuthContext.Provider>

    </div >
  );
}

export default App;