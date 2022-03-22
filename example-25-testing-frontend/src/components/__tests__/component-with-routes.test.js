const { render } = require("@testing-library/react")
const { MemoryRouter } = require("react-router-dom")
import ComponentWithRoutes from '../component-with-routes';

/**
 * Tests that, when the current path is /home, the homepage is rendered.
 */
it('renders homepage correctly', () => {

    // React Router gives us a MemoryRouter to work with, when testing code involving Routes, Links, or NavLinks.
    // It contains an initialEntries prop which we can use to supply the initial browser history stack, therefore we can simulate starting
    // the page off at any desired URL.
    const { getByText, queryByText } = render(
        <MemoryRouter initialEntries={['/home']}>
            <ComponentWithRoutes />
        </MemoryRouter>
    )

    // "App title" should always appear
    expect(getByText('App title')).toBeInTheDocument();

    // "Homepage" should only appear on the homepage
    expect(getByText('Homepage')).toBeInTheDocument();

    // "About me!" should not appear here, as it should only appear on the about page.
    expect(queryByText('About me!')).not.toBeInTheDocument();
})

/**
 * Tests that, when the current path is /about, the about page is rendered.
 */
it('renders about page correctly', () => {

    const { getByText, queryByText } = render(
        <MemoryRouter initialEntries={['/about']}>
            <ComponentWithRoutes />
        </MemoryRouter>
    )

    // "App title" should always appear
    expect(getByText('App title')).toBeInTheDocument();

    // "Homepage" should not appear here, as it should only appear on the homepage
    expect(queryByText('Homepage')).not.toBeInTheDocument();

    // "About me!" should only appear on the about page.
    expect(getByText('About me!')).toBeInTheDocument();
})