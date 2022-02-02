import UserInfoPage from "./UserInfoPage";
import LoginPage from './LoginPage';
import Counter from "./Counter";

function App() {

  return (
    <div style={{ margin: '10px', padding: '5px', border: '1px solid black' }}>

      <Counter />
      <hr />

      <LoginPage />
      <hr />
      <UserInfoPage />

    </div>
  );
}

export default App;