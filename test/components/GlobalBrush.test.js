"use strict";

import React from 'react';

import GlobalBrush from '../../src/components/GlobalBrush.jsx'

import moment from 'moment';

import { mount } from 'enzyme';
import expect from 'expect';

describe('<GlobalBrush />', () => {

    it('renders a `GlobalBrush` component', () => {
        const testState = {
            containerWidth: 1000,
            containerHeight: 1000
        };

        const testProps = {
            show: true,
            viewPortDateRange : {
                startDate : moment().subtract(1, "days").toDate(),
                endDate : new Date(Date.now())
            },
            onBrushChange : function() {return},
            height : 50
        }

        const wrapper = mount(<GlobalBrush {...testProps}/>);
        wrapper.setState(testState);

        const brushNode = wrapper.find('Brush');
        expect(brushNode.length).toBe(1);

        expect(brushNode.prop("width")).toBe(testState.containerHeight);
        expect(brushNode.prop("height")).toBe(testProps.height);
        expect(brushNode.prop("margin")).toEqual({ top: 0, bottom: 30, left: 50, right: 20 });
        expect(brushNode.prop("xScale")).toNotBe(null);
        expect(brushNode.prop("yScale")).toBe(null);
        expect(brushNode.prop("extent")).toEqual([testProps.viewPortDateRange.startDate, testProps.viewPortDateRange.endDate]);
        expect(brushNode.prop("onChange")).toNotBe(undefined);
        expect(brushNode.prop("xAxis")).toBe(undefined);
    });

    it('does not render a `GlobalBrush` component', () => {
        const testState = {
            containerWidth: 1000,
            containerHeight: 1000
        };

        const testProps = {
            show: false,
            viewPortDateRange : {
                startDate : moment().subtract(1, "days").toDate(),
                endDate : new Date(Date.now())
            },
            onBrushChange : function() {return}
        }

        const wrapper = mount(<GlobalBrush {...testProps}/>);
        wrapper.setState(testState);

        const brushNode = wrapper.find('Brush');
        expect(brushNode.length).toBe(0);
    });
});
