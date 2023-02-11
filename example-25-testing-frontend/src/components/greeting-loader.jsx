import { useState } from 'react';
import axios from 'axios';

export default function GreetingLoader({ url }) {

    const [greeting, setGreeting] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    function handleGreeting(greeting) {
        setGreeting(greeting);
        setError(null);
        setLoading(false);
    }

    function handleError(error) {
        setError(error);
        setGreeting(null);
        setLoading(false);
    }

    function loadGreeting() {
        setLoading(true);
        return axios.get(url)
            .then(response => handleGreeting(response.data.greeting))
            .catch(err => handleError(err));
    }

    return (
        <div>
            <div><button onClick={loadGreeting}>Load greeting</button></div>
            {loading && <p>Loading...</p>}
            {greeting && <p>{greeting}</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
}
