import { AuthContext } from "./auth-context";
import { useContext } from "react";

/**
 * This component displays either a welcome message to the authenticated user, or a message saying "you are not logged in"
 * if there is no authenticated user.
 *
 * The user object, if any, is obtained from the LoginContext.
 */
export default function UserInfoPage() {
  // Remember that this time, the value stored in the context also includes the "set" function, not just the user object itself.
  const [user, setUser] = useContext(AuthContext);

  return <h1>{user ? `Welcome, ${user.username}!` : "You are not logged in!"}</h1>;
}
