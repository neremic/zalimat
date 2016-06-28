"use strict";

import React from 'react';

import VersionSelector from '../../src/components/VersionSelector.jsx'

import Multiselect from 'react-widgets/lib/Multiselect'
import Button from 'react-bootstrap/lib/Button';

import { shallow } from 'enzyme';
import sinon from 'sinon';
import expect from 'expect';

describe('<VersionSelector />', () => {

    it('renders a `Multiselect` component', () => {
        const testProps = {
            versions : [{value: 1, text: 'v1'}, {value: 2, text: 'v2'}],
            removeVersion : undefined,
            onChange : () => {}
        }

        const wrapper = shallow(<VersionSelector {...testProps}/>);

        const multiselectNode = wrapper.find(Multiselect);
        expect(multiselectNode.length).toBe(1);

        expect(multiselectNode.prop("valueField")).toBe("value");
        expect(multiselectNode.prop("textField")).toBe("text");
        expect(multiselectNode.prop("value")).toEqual([]);
        expect(multiselectNode.prop("data")).toBe(testProps.versions);
        expect(multiselectNode.prop("onChange")).toNotBe(null);
    });

    it('renders a `Button` component', () => {
        const testProps = {
            versions : [{value: 1, text: 'v1'}, {value: 2, text: 'v2'}],
            removeVersion : undefined,
            onChange : () => {}
        }

        const wrapper = shallow(<VersionSelector {...testProps}/>);

        const buttonNode = wrapper.find(Button);
        expect(buttonNode.length).toBe(1);
    });

    it('calls its callback', () => {
        const testProps = {
            versions : [{value: 1, text: 'v1'}, {value: 2, text: 'v2'}],
            removeVersion : undefined,
            onChange : sinon.spy()
        }

        const wrapper = shallow(<VersionSelector {...testProps}/>);

        const buttonNode = wrapper.find(Button);
        buttonNode.simulate('click');

        expect(testProps.onChange.calledOnce).toBe(true);
        expect(buttonNode.length).toBe(1);
    });

    it('does not update state if no version to be removed', () => {
        const testProps = {
            versions : [{value: 1, text: 'v1'}, {value: 2, text: 'v2'}],
            removeVersion : undefined,
            onChange : () => {}
        }

        const wrapper = shallow(<VersionSelector {...testProps}/>);

        expect(wrapper.state('values')).toEqual([]);

        wrapper.setState({values: testProps.versions});

        expect(wrapper.state('values')).toEqual(testProps.versions);

        wrapper.setProps({removeVersion: undefined});

        expect(wrapper.state('values')).toEqual(testProps.versions);
    });

    it('does update state and removed passed in version name', () => {
        const testProps = {
            versions : [{value: 'id1', text: 'v1'}, {value: 'id2', text: 'v2'}],
            removeVersion : undefined,
            onChange : () => {}
        }

        const wrapper = shallow(<VersionSelector {...testProps}/>);

        expect(wrapper.state('values')).toEqual([]);

        wrapper.setState({values: testProps.versions});

        expect(wrapper.state('values')).toEqual(testProps.versions);

        wrapper.setProps({removeVersion: 'id1'});

        expect(wrapper.state('values')).toEqual([{value: 'id2', text: 'v2'}]);
    });

    it('does not change versions in state if removed passed in version name is not present', () => {
        const testProps = {
            versions : [{value: 'id1', text: 'v1'}, {value: 'id2', text: 'v2'}],
            removeVersion : undefined,
            onChange : () => {}
        }

        const wrapper = shallow(<VersionSelector {...testProps}/>);

        expect(wrapper.state('values')).toEqual([]);

        wrapper.setState({values: testProps.versions});

        expect(wrapper.state('values')).toEqual(testProps.versions);

        wrapper.setProps({removeVersion: 'id3'});

        expect(wrapper.state('values')).toEqual(testProps.versions);
    });

});
