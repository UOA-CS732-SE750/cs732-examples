import { shallow } from 'enzyme';
import Page from '../page';

it('renders the page component', () => {

    const wrapper = shallow(<Page />);

    // Expect the Page to contain the given heading, along with exactly one Sidebar and Main component.
    const h1 = <h1>This is my page!</h1>;
    expect(wrapper).toContainReact(h1);
    expect(wrapper).toContainExactlyOneMatchingElement('Sidebar');
    expect(wrapper).toContainExactlyOneMatchingElement('Main');
});