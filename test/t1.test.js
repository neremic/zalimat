import React from 'react';
import { mount, shallow } from 'enzyme';
import Header from '../src/components/Header.jsx'
import expect from 'expect';

describe('<Header />', () => {

    it('renders an `.icon-star`', () => {
        const wrapper = shallow(<Header title = "title"/>);
        // console.log("wrapper %O", wrapper.debug());
        let h1Node = wrapper.find('h1');
        // console.log("h1Node %O", h1Node.nodes);
        expect(h1Node.length).toBe(2);
        expect(h1Node.nodes[0].props.children).toBe('titlea');
        expect(h1Node.nodes[1].props.children).toBe('titleb');
    });

});
