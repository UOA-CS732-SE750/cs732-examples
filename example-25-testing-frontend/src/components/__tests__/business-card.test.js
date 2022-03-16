import { render } from '@testing-library/react';
import BusinessCard from '../business-card';

/**
 * Tests that, when supplied with no data, the BusinessCard renders a blank table, and the text "Name", "Phone number", or "Email"
 * do not appear anywhere onscreen.
 */
it('renders correctly when no content is supplied', () => {

    const { getByRole, queryByText } = render(<BusinessCard />);

    // getBy*** methods return the matching element, or throw an error (thus failing the test) if there are no matches.
    const table = getByRole('table');

    // Ensure the table has a single tbody child
    expect(table.children.length).toBe(1);
    const tbody = table.children[0];
    expect(tbody.tagName).toEqual('TBODY');

    // Ensure that tbody has no contents.
    expect(tbody.hasChildNodes()).toBe(false);

    // Ensure that the text "Name", "Phone number", and "Email" don't appear.
    // queryBy*** methods return the matching element, or return null if there is no match.
    // We are using Regexes here. For example, /Name/i means "match any string containing the text 'Name', ignoring case."
    expect(queryByText(/Name/i)).toBeNull();
    expect(queryByText(/Phone number/i)).toBeNull();
    expect(queryByText(/Email/i)).toBeNull();
});

/**
 * Tests that, when supplied with only a name, that name is displayed correctly, but the text "Phone number" and "Email"
 * still do not appear.
 */
it('renders correctly when only name is supplied', () => {

    const { queryByText, getByText } = render(<BusinessCard name="Bob" />);

    // Ensure "Phone number" and "Email" don't appear
    expect(queryByText(/Phone number/i)).toBeNull();
    expect(queryByText(/Email/i)).toBeNull();

    // Ensure the person's name appears correctly.
    expect(getByText(/Name/i)).toBeInTheDocument();
    expect(getByText('Bob')).toBeInTheDocument();
});

/**
 * Tests that, when supplied with only a phone number, that number is displayed correctly, but the text "Name" and "Email"
 * still do not appear.
 */
it('renders correctly when only phone number is supplied', () => {

    const { queryByText, getByText } = render(<BusinessCard phNum="021 123 4567" />);

    // Ensure "Name" and "Email" don't appear
    expect(queryByText(/Name/i)).toBeNull();
    expect(queryByText(/Email/i)).toBeNull();

    // Ensure the person's phone number appears correctly.
    expect(getByText(/Phone number/i)).toBeInTheDocument();
    expect(getByText('021 123 4567')).toBeInTheDocument();
});

/**
 * Tests that, when supplied with only an email, that email is displayed correctly, but the text "Phone number" and "Name"
 * still do not appear.
 */
it('renders correctly when only email is supplied', () => {

    const { queryByText, getByText } = render(<BusinessCard email="bob@bob.com" />);

    // Ensure "Name" and "Phone number" don't appear
    expect(queryByText(/Name/i)).toBeNull();
    expect(queryByText(/Phone number/i)).toBeNull();

    // Ensure the person's email appears correctly.
    expect(getByText(/Email/i)).toBeInTheDocument();
    expect(getByText('bob@bob.com')).toBeInTheDocument();
});

/**
 * Tests that, when supplied with a name, phone number and email, all three are displayed correctly.
 */
it('renders correctly when all details are supplied', () => {

    const { getByText } = render(
        <BusinessCard name="Bob" phNum="021 123 4567" email="bob@bob.com" />
    );

    // Ensure the person's name appears correctly.
    expect(getByText(/Name/i)).toBeInTheDocument();
    expect(getByText('Bob')).toBeInTheDocument();

    // Ensure the person's phone number appears correctly.
    expect(getByText(/Phone number/i)).toBeInTheDocument();
    expect(getByText('021 123 4567')).toBeInTheDocument();

    // Ensure the person's email appears correctly.
    expect(getByText(/Email/i)).toBeInTheDocument();
    expect(getByText('bob@bob.com')).toBeInTheDocument();
});
