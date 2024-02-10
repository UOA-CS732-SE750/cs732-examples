// import UserInfoPage from "./UserInfoPage";
// import LoginPage from './LoginPage';
import Counter from "./Counter";

/**
 * NOTE: Commented components were using a library that is now non-functional with React 18.
 * I've kept the code for posterity, for now...
 */
function App() {
  return (
    <div style={{ margin: "10px", padding: "5px", border: "1px solid black" }}>
      <Counter />
      {/* <hr />

      <LoginPage />
      <hr />
      <UserInfoPage /> */}
    </div>
  );
}

export default App;
