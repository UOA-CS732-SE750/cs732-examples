import { render, fireEvent, screen, act, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import GreetingLoader from '../greeting-loader';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

let axiosMock;

beforeAll(() => {
    axiosMock = new MockAdapter(axios);
});

afterEach(() => {
    axiosMock.reset();
});

it('loads a greeting correctly', async () => {

    // Render the component; the "screen" shouldn't contain the text "Hello, World!" or "Loading..."
    // The queryBy*() functions will return null if the query couldn't find a match.
    render(<GreetingLoader url="http://test.com" />);
    expect(screen.queryByText('Hello, world!')).not.toBeInTheDocument();
    expect(screen.queryByText('Loading...')).not.toBeInTheDocument();

    // Setup a mock response from axios - if we send a GET request to http://test.com,
    // simulate returning a "Hello, World!" greeting.
    const data = {
        greeting: 'Hello, world!'
    }
    axiosMock.onGet('http://test.com').reply(200, data);

    // Simulate finding the 'Load greeting' button and clicking it.
    // The getBy*() functions will throw an exception if the query couldn't find a match.
    const button = screen.getByText('Load greeting');
    fireEvent.click(button);

    // Now, the "Loading..." text should appear.
    expect(screen.queryByText('Loading...')).toBeInTheDocument();

    // Ensure our component made the GET request properly
    expect(axiosMock.history.get[0].url).toEqual('http://test.com');

    // This line waits for the text to appear, which should appear once the axios call has succeeded.
    // If this times out, then we can assume the component has not updated itself in response to the 
    // retrieved data.
    // Default timeout is 1000ms; we can change this as a property to the second argument.
    await waitFor(() => screen.getByText('Hello, world!'), { timeout: 1000 });

    // The axios response above should cause the greeting text to be displayed in the UI,
    // and the "loading" message should disappear again.
    expect(screen.queryByText('Hello, world!')).toBeInTheDocument();
    expect(screen.queryByText('Loading...')).not.toBeInTheDocument();

});
