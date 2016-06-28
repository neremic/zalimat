"use strict";

import React from 'react';
var createFragment = require('react-addons-create-fragment');

import Charts from '../../src/components/Charts.jsx'
import { DisplayApp } from './mock_components/DisplayApp.jsx'
import ChartWithHeader from '../../src/components/ChartWithHeader.jsx'

import moment from 'moment';
import Immutable from 'immutable';

import { shallow } from 'enzyme';
import expect from 'expect';

describe('<Charts />', () => {

    it('renders nothing if empty dataSet and versions are provided', () => {
        const testProps = {
            selectedVersions : [],
            onDelete : () => {},
            viewPortDateRange : {
                startDate : moment().subtract(1, "days").toDate(),
                endDate : new Date(Date.now())
            },
            dataSets : Immutable.Map()
        }

        const wrapper = shallow(<Charts {...testProps}/>);

        expect(wrapper.children().length).toBe(0);
    });

    it('renders nothing if empty dataSet is provided', () => {
        const testProps = {
            selectedVersions : [{value: 'id1', text: 'id1'}, {value: 'id2', text: 'id2'}],
            onDelete : () => {},
            viewPortDateRange : {
                startDate : moment().subtract(1, "days").toDate(),
                endDate : new Date(Date.now())
            },
            dataSets : Immutable.Map()
        }

        const wrapper = shallow(<Charts {...testProps}/>);

        expect(wrapper.children().length).toBe(0);
    });

    it('renders nothing if empty versions are provided', () => {
        const testProps = {
            selectedVersions : [],
            onDelete : () => {},
            viewPortDateRange : {
                startDate : moment().subtract(1, "days").toDate(),
                endDate : new Date(Date.now())
            },
            dataSets : Immutable.Map()
        }

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
            dataSets : Immutable.Map()
        }

        const wrapper = shallow(<Charts {...testProps}/>);

        expect(wrapper.children().length).toBe(0);
    });

    it('renders the only matching version data', () => {
        let dataSets = Immutable.Map();
        dataSets = dataSets.set('id1', createRandomData());
        const testProps = {
            selectedVersions : [{value: 'id1', text: 'id1'}, {value: 'id2', text: 'id2'}],
            onDelete : () => {},
            viewPortDateRange : {
                startDate : moment().subtract(1, "days").toDate(),
                endDate : new Date(Date.now())
            },
            dataSets : dataSets,
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

        expect(wrapper.children().length).toBe(1);
        expect(chartNode1.type()).toBe(ChartWithHeader);
        expect(chartNode1.prop("viewPortDateRange")).toEqual(testProps.viewPortDateRange);
        expect(chartNode1.prop("dataSet")).toEqual(testProps.dataSets.get('id1'));
        expect(chartNode1.prop("title")).toBe('id1');
        expect(chartNode1.prop("versionId")).toBe('id1');
        expect(chartNode1.prop("applicationId")).toBe(testProps.applicationId);
        expect(chartNode1.prop("onDelete")).toEqual(testProps.onDelete);
        expect(chartNode1.prop("children")).toBe(undefined);
    });

    it('renders the matching version with dataSet and renders non-matching version without dataSet', () => {
        let dataSets = Immutable.Map();
        dataSets = dataSets.set('id1', createRandomData());
        dataSets = dataSets.set('id3', createRandomData());
        dataSets = dataSets.set('id2', createRandomData());

        const testProps = {
            selectedVersions : [{value: 'id1', text: 'id1'}, {value: 'id2', text: 'id2'}],
            onDelete : () => {},
            viewPortDateRange : {
                startDate : moment().subtract(1, "days").toDate(),
                endDate : new Date(Date.now())
            },
            dataSets : dataSets,
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
        expect(chartNode1.prop("title")).toBe('id1');
        expect(chartNode1.prop("onDelete")).toEqual(testProps.onDelete);

        expect(chartNode2.type()).toBe(ChartWithHeader);
        expect(chartNode2.prop("viewPortDateRange")).toEqual(testProps.viewPortDateRange);
        expect(chartNode2.prop("dataSet")).toEqual(testProps.dataSets.get('id2'));
        expect(chartNode2.prop("title")).toBe('id2');
        expect(chartNode2.prop("versionId")).toBe('id2');
        expect(chartNode2.prop("applicationId")).toBe(testProps.applicationId);
        expect(chartNode2.prop("onDelete")).toEqual(testProps.onDelete);
    });

    it('renders the matching version with dataSet and does not renders non-matching version and renders provided children', () => {
        let dataSets = Immutable.Map();
        dataSets = dataSets.set('id1', createRandomData());
        const testProps = {
            selectedVersions : [{value: 'id1', text: 'id1'}, {value: 'id2', text: 'id2'}],
            onDelete : () => {},
            viewPortDateRange : {
                startDate : moment().subtract(1, "days").toDate(),
                endDate : new Date(Date.now())
            },
            dataSets : dataSets,
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

        const wrapper = shallow(<Charts {...testProps}><DisplayApp someProp="propValue"/></Charts>);
        const chartNode1 = wrapper.childAt(0);
        const childNode1 = chartNode1.childAt(0);

        expect(wrapper.children().length).toBe(1);

        expect(chartNode1.type()).toBe(ChartWithHeader);
        expect(chartNode1.prop("viewPortDateRange")).toEqual(testProps.viewPortDateRange);
        expect(chartNode1.prop("dataSet")).toEqual(testProps.dataSets.get('id1'));
        expect(chartNode1.prop("title")).toBe('id1');
        expect(chartNode1.prop("versionId")).toBe('id1');
        expect(chartNode1.prop("applicationId")).toBe(testProps.applicationId);
        expect(chartNode1.prop("onDelete")).toEqual(testProps.onDelete);

        expect(chartNode1.children().length).toBe(1);
        expect(chartNode1.prop("children")).toNotBe(null);
        expect(childNode1.type()).toBe(DisplayApp);
        expect(childNode1.prop("someProp")).toBe('propValue');
    });

});
