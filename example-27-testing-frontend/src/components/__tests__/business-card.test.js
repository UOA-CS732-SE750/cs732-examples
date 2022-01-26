import renderer from 'react-test-renderer';
import BusinessCard from '../business-card';

it('snapshot with no content matches', () => {
    const tree = renderer.create(<BusinessCard />).toJSON();
    expect(tree).toMatchSnapshot();
});

it('snapshot with name matches', () => {
    const tree = renderer.create(<BusinessCard name="Bob" />).toJSON();
    expect(tree).toMatchSnapshot();
});

it('snapshot with phone number matches', () => {
    const tree = renderer.create(<BusinessCard phNum="021 123 4567" />).toJSON();
    expect(tree).toMatchSnapshot();
});

it('snapshot with email matches', () => {
    const tree = renderer.create(<BusinessCard email="bob@bob.com" />).toJSON();
    expect(tree).toMatchSnapshot();
});

it('snapshot with all matches', () => {
    const tree = renderer.create(<BusinessCard name="Bob" phNum="021 123 4567" email="bob@bob.com" />).toJSON();
    expect(tree).toMatchSnapshot();
});