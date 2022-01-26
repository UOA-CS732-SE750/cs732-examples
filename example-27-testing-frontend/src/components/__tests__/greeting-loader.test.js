import { render, fireEvent, screen, act } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import GreetingLoader from '../greeting-loader';
import mockAxios from 'jest-mock-axios';

afterEach(() => {
    mockAxios.reset();
});

it('loads a greeting correctly', async () => {

    // Render the component; the "screen" shouldn't contain the text "Hello, World!"
    // The queryBy*() functions will return null if the query couldn't find a match.
    render(<GreetingLoader url="http://test.com" />);
    expect(screen.queryByText('Hello, world!')).toBeNull();

    // Simulate finding the 'Load greeting' button and clicking it.
    // The getBy*() functions will throw an exception if the query couldn't find a match.
    const button = screen.getByText('Load greeting');
    fireEvent.click(button);

    // The button-click above should have caused a call to axios.get().
    // Make sure it was actually called with the correct URL.
    expect(mockAxios.get).toHaveBeenCalledWith('http://test.com');

    // Mock and send the axios response
    const data = {
        greeting: 'Hello, world!'
    }

    /**
     * This "act()" call is for proper Arrange-Act-Assert testing of state changes in our React components
     * (See: https://reactjs.org/docs/testing-recipes.html). It ensures that all state changes have finished
     * being applied before the call to act() returns, so we know that any testing code after this line can
     * test for those expected state changes. There's a sync version and an async version.
     * 
     * The methods from the react testing libaray (e.g. "render()" and "click()" above) already use act()
     * internally so we don't need to wrap those calls. However, mockAxios doesn't use it by default so we need
     * to wrap it as shown here.
     */
    await act(async () => mockAxios.mockResponse({ data }));

    // The axios response above should cause the greeting text to be displayed in the UI. Make sure it is.
    const p = screen.getByText('Hello, world!');
    expect(p.tagName).toBe('P'); // Check it's an actual <p>

});
