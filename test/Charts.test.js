"use strict";

import React from 'react';

import Charts from '../src/components/Charts.jsx'
import ChartWithHeader from '../src/components/ChartWithHeader.jsx'

import moment from 'moment';

import { shallow } from 'enzyme';
import expect from 'expect';

describe('<Charts />', () => {

    it('renders nothing if no dataSet and versions are provided', () => {
        const testProps = {
            selectedVersions : undefined,
            onDelete : () => {},
            viewPortDateRange : {
                startDate : moment().subtract(1, "days").toDate(),
                endDate : new Date(Date.now())
            },
            dataSets : undefined
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

        const wrapper = shallow(<Charts {...testProps}/>);

        expect(wrapper.children().length).toBe(0);
    });

    it('renders nothing if no dataSet is provided', () => {
        const testProps = {
            selectedVersions : [{value: 1, text: 'v1'}, {value: 2, text: 'v2'}],
            onDelete : () => {},
            viewPortDateRange : {
                startDate : moment().subtract(1, "days").toDate(),
                endDate : new Date(Date.now())
            },
            dataSets : undefined
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

        const wrapper = shallow(<Charts {...testProps}/>);

        expect(wrapper.children().length).toBe(0);
    });

    it('renders nothing if no versions are provided', () => {
        const testProps = {
            selectedVersions : undefined,
            onDelete : () => {},
            viewPortDateRange : {
                startDate : moment().subtract(1, "days").toDate(),
                endDate : new Date(Date.now())
            },
            dataSets : new Map()
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

        const wrapper = shallow(<Charts {...testProps}/>);

        expect(wrapper.children().length).toBe(0);
    });

    it('renders nothing if versions is empty', () => {
        const testProps = {
            selectedVersions : [],
            onDelete : () => {},
            viewPortDateRange : {
                startDate : moment().subtract(1, "days").toDate(),
                endDate : new Date(Date.now())
            },
            dataSets : new Map()
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

        const wrapper = shallow(<Charts {...testProps}/>);

        expect(wrapper.children().length).toBe(0);
    });

    it('renders the only matching version data', () => {
        const testProps = {
            selectedVersions : [{value: 'id1', text: 'v1'}, {value: 'id2', text: 'v2'}],
            onDelete : () => {},
            viewPortDateRange : {
                startDate : moment().subtract(1, "days").toDate(),
                endDate : new Date(Date.now())
            },
            dataSets : (new Map()).set('id1', createRandomData()),
            applicationId : 'kio'
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

        const wrapper = shallow(<Charts {...testProps}/>);
        const chartNode = wrapper.childAt(0);

        expect(wrapper.children().length).toBe(1);
        expect(chartNode.type()).toBe(ChartWithHeader);
        expect(chartNode.prop("viewPortDateRange")).toEqual(testProps.viewPortDateRange);
        expect(chartNode.prop("dataSet")).toEqual(testProps.dataSets.get('id1'));
        expect(chartNode.prop("title")).toBe('v1');
        expect(chartNode.prop("versionId")).toBe('id1');
        expect(chartNode.prop("applicationId")).toBe(testProps.applicationId);
        expect(chartNode.prop("onDelete")).toEqual(testProps.onDelete);
    });

    it('renders only matching versions data', () => {
        const testProps = {
            selectedVersions : [{value: 'id1', text: 'v1'}, {value: 'id2', text: 'v2'}],
            onDelete : () => {},
            viewPortDateRange : {
                startDate : moment().subtract(1, "days").toDate(),
                endDate : new Date(Date.now())
            },
            dataSets : (new Map()).set('id1', createRandomData()).set('id3', createRandomData()).set('id2', createRandomData()),
            applicationId : 'kio'
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

        const wrapper = shallow(<Charts {...testProps}/>);
        const chartNode1 = wrapper.childAt(0);
        const chartNode2 = wrapper.childAt(1);

        expect(wrapper.children().length).toBe(2);
        expect(chartNode1.type()).toBe(ChartWithHeader);
        expect(chartNode1.prop("viewPortDateRange")).toEqual(testProps.viewPortDateRange);
        expect(chartNode1.prop("dataSet")).toEqual(testProps.dataSets.get('id1'));
        expect(chartNode1.prop("applicationId")).toBe(testProps.applicationId);
        expect(chartNode1.prop("versionId")).toBe('id1');
        expect(chartNode1.prop("title")).toBe('v1');
        expect(chartNode1.prop("onDelete")).toEqual(testProps.onDelete);
        expect(chartNode2.type()).toBe(ChartWithHeader);
        expect(chartNode2.prop("viewPortDateRange")).toEqual(testProps.viewPortDateRange);
        expect(chartNode2.prop("dataSet")).toEqual(testProps.dataSets.get('id2'));
        expect(chartNode2.prop("title")).toBe('v2');
        expect(chartNode2.prop("versionId")).toBe('id2');
        expect(chartNode2.prop("applicationId")).toBe(testProps.applicationId);
        expect(chartNode2.prop("onDelete")).toEqual(testProps.onDelete);
    });

});
