import { useState } from 'react';
import axios from 'axios';

export default function GreetingLoader({ url }) {

    const [greeting, setGreeting] = useState(null);
    const [error, setError] = useState(null);

    function handleGreeting(greeting) {
        setGreeting(greeting);
        setError(null);
    }

    function handleError(error) {
        setError(error);
        setGreeting(null);
    }

    function loadGreeting() {
        return axios.get(url)
            .then(response => handleGreeting(response.data.greeting))
            .catch(err => handleError(err));
    }

    return (
        <div>
            <div><button onClick={loadGreeting}>Load greeting</button></div>
            {greeting && <p>{greeting}</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
}
