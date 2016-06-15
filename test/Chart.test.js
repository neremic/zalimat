"use strict";

import React from 'react';

import Chart from '../src/components/Chart.jsx'
import { AreaChart } from 'react-d3-components';

import moment from 'moment';

import { shallow } from 'enzyme';
import expect from 'expect';

describe('<Chart />', () => {

    it('renders an `Chart` component', () => {
        const testProps = {
            viewPortDateRange : {
                startDate : moment().subtract(1, "days").toDate(),
                endDate : new Date(Date.now())
            },
            dataSet : createRandomData(),
            width : 1024
        }

        function createRandomData() {
            const oneHour = 3600000;
            let data = {label: '', values: []};
            let startDate = new Date(2016, 5, 5);
            let startMillis = startDate.getTime();
            for (let i = 0; i < 60; i++) {
                let multi = Math.floor(Math.random() * 5);
                startMillis += oneHour * multi;
                data.values.push({x: new Date(startMillis), y : Math.floor(Math.random() * 10)});
            }
            return data;
        };

        const wrapper = shallow(<Chart {...testProps}/>);

        const outerDivNode = wrapper.find('div');
        expect(outerDivNode.length).toBe(1);

        expect(outerDivNode.prop('width')).toBe(undefined);

        const childNodes = outerDivNode.children;
        expect(childNodes.length).toBe(1);

        const areaChartNode = outerDivNode.childAt(0);
        expect(areaChartNode.type()).toBe(AreaChart);

        expect(areaChartNode.prop("width")).toBe(1024);
        expect(areaChartNode.prop("margin")).toEqual({ top: 10, bottom: 50, left: 50, right: 20 });
        expect(areaChartNode.prop("xScale")).toBe(wrapper.state("xScale"));
        expect(areaChartNode.prop("yScale")).toBe(null);
        expect(areaChartNode.prop("interpolate")).toBe('step-after');
    });

});