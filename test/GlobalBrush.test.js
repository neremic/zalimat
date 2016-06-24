"use strict";

import React from 'react';

import GlobalBrush from '../src/components/GlobalBrush.jsx'
import { Brush } from 'react-d3-components';

import moment from 'moment';

import { shallow } from 'enzyme';
import expect from 'expect';

describe('<GlobalBrush />', () => {

    it('renders a `GlobalBrush` component', () => {
        const testProps = {
            show: true,
            viewPortDateRange : {
                startDate : moment().subtract(1, "days").toDate(),
                endDate : new Date(Date.now())
            },
            onBrushChange : function() {return},
            width : 1024
        }

        const wrapper = shallow(<GlobalBrush {...testProps}/>);

        const outerDivNode = wrapper.find('div');
        expect(outerDivNode.length).toBe(1);

        expect(outerDivNode.prop('width')).toBe(undefined);
        expect(outerDivNode.prop('style')).toMatch({ float: 'none' });
        expect(outerDivNode.hasClass('brush')).toBe(true);

        const childNodes = outerDivNode.children;
        expect(childNodes.length).toBe(1);

        const brushNode = outerDivNode.childAt(0);
        expect(brushNode.type()).toBe(Brush);

        expect(brushNode.prop("width")).toBe(1024);
        expect(brushNode.prop("margin")).toEqual({ top: 0, bottom: 30, left: 50, right: 20 });
        expect(brushNode.prop("xScale")).toBe(wrapper.state("xScaleBrush"));
        expect(brushNode.prop("yScale")).toBe(null);
        expect(brushNode.prop("extent")).toEqual([testProps.viewPortDateRange.startDate, testProps.viewPortDateRange.endDate]);
        expect(brushNode.prop("onChange")).toNotBe(undefined);
        expect(brushNode.prop("xAxis")).toBe(undefined);
    });

    it('does not render a `GlobalBrush` component', () => {
        const testProps = {
            show: false,
            viewPortDateRange : {
                startDate : moment().subtract(1, "days").toDate(),
                endDate : new Date(Date.now())
            },
            onBrushChange : function() {return},
            width : 1024
        }

        const wrapper = shallow(<GlobalBrush {...testProps}/>);

        expect(wrapper.children().length).toBe(0);
        expect(wrapper.type()).toBe(null);
    });
});
