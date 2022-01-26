import { AuthContext } from './auth-context';
import { useContext } from 'react';

/**
 * Renders a "login page" containing login / logout buttons. Clicking either of these buttons causes the setUser() function,
 * which has been obtained from context, to be called.
 */
export default function LoginPage() {

    const [user, setUser] = useContext(AuthContext);

    return (
        <div>
            <button onClick={() => setUser({ username: 'Bob' })}>Log in</button>
            <button onClick={() => setUser(undefined)}>Log out</button>
        </div>
    );
}