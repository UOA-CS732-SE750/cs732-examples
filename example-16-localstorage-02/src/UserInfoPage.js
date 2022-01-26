import createPersistedState from 'use-persisted-state';

const useAuthState = createPersistedState('auth');

/**
 * This component displays either a welcome message to the authenticated user, or a message saying "you are not logged in"
 * if there is no authenticated user.
 * 
 * The user object, if any, is obtained from local storage.
 */
export default function UserInfoPage() {

    const [user, setUser] = useAuthState();

    return (
        <h1>{user ? `Welcome, ${user.username}!` : 'You are not logged in!'}</h1>
    );
}