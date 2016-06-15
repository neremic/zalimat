"use strict";

import React from 'react';

import VersionSelector from '../src/components/VersionSelector.jsx'

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

});