"use strict";

import React from 'react';

import ChartWithHeader from '../../src/components/ChartWithHeader.jsx'
import Chart from '../../src/components/Chart.jsx'
import { DisplayApp } from './mock_components/DisplayApp.jsx'
import { DisplayAppAndVersion } from './mock_components/DisplayAppAndVersion.jsx'

import Label from 'react-bootstrap/lib/Label';
import Button from 'react-bootstrap/lib/Button';

import moment from 'moment';

import { shallow } from 'enzyme';
import sinon from 'sinon';
import expect from 'expect';

describe('<ChartWithHeader />', () => {

    it('renders a `Label` component', () => {
        const testProps = {
            title : 'my title',
            viewPortDateRange : {
                startDate : moment().subtract(1, "days").toDate(),
                endDate : new Date(Date.now())
            },
            dataSet : {label: '', values: []},
            onDelete : () => {}
        }

        const wrapper = shallow(<ChartWithHeader {...testProps}/>);
        const labelNode = wrapper.find(Label);
        const childNode = labelNode.childAt(0);

        expect(labelNode.length).toBe(1);
        expect(childNode.text()).toBe(testProps.title);
    });

    it('renders the `delete button` component', () => {
        const testProps = {
            viewPortDateRange : {
                startDate : moment().subtract(1, "days").toDate(),
                endDate : new Date(Date.now())
            },
            dataSet : {label: '', values: []},
            onDelete : () => {}
        }

        const wrapper = shallow(<ChartWithHeader {...testProps}/>);
        const buttonNode = wrapper.find(Button);

        expect(buttonNode.length).toBe(1);
        expect(buttonNode.prop("children")).toNotBe(undefined).toNotBe(null);
        expect(buttonNode.prop("onClick")).toNotBe(undefined);
    });

    it('calls the callback via click onto the `delete button` component', () => {
        const testProps = {
            viewPortDateRange : {
                startDate : moment().subtract(1, "days").toDate(),
                endDate : new Date(Date.now())
            },
            dataSet : {label: '', values: []},
            onDelete : sinon.spy()
        }

        const wrapper = shallow(<ChartWithHeader {...testProps}/>);
        const buttonNode = wrapper.find(Button);
        buttonNode.simulate('click');

        expect(testProps.onDelete.calledOnce).toBe(true);
    });

    it('renders a `chart` component', () => {
        const testProps = {
            title : 'my title',
            viewPortDateRange : {
                startDate : moment().subtract(1, "days").toDate(),
                endDate : new Date(Date.now())
            },
            dataSet : createRandomData(),
            onDelete : () => {}
        };

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


        const wrapper = shallow(<ChartWithHeader {...testProps}/>);
        const chartNode = wrapper.find(Chart);

        expect(chartNode.length).toBe(1);
        expect(chartNode.prop("dataSet")).toBe(testProps.dataSet);
        expect(chartNode.prop("viewPortDateRange")).toBe(testProps.viewPortDateRange);
    });

    it('renders a `chart` component including child components and sets some props to them', () => {
        const testProps = {
            title : 'my title',
            viewPortDateRange : {
                startDate : moment().subtract(1, "days").toDate(),
                endDate : new Date(Date.now())
            },
            dataSet : createRandomData(),
            onDelete : () => {},
            applicationId : 'kio',
            versionId : 'vId'
        };

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


        const wrapper = shallow(
            <ChartWithHeader {...testProps}>
                <DisplayApp someProp="propValue"/>
                <DisplayAppAndVersion someProp="propValue2" someOtherProp="otherPropValue"/>
            </ChartWithHeader>);
        const chartNode = wrapper.find(Chart);
        const childNode = wrapper.find(DisplayApp);
        const otherChildNode = wrapper.find(DisplayAppAndVersion);

        expect(chartNode.length).toBe(1);
        expect(chartNode.prop("dataSet")).toBe(testProps.dataSet);
        expect(chartNode.prop("viewPortDateRange")).toBe(testProps.viewPortDateRange);

        expect(childNode.length).toBe(1);
        expect(childNode.prop("someProp")).toBe('propValue');
        expect(childNode.prop("applicationId")).toBe('kio');
        expect(childNode.prop("versionId")).toBe('vId');

        expect(otherChildNode.length).toBe(1);
        expect(otherChildNode.prop("someProp")).toBe('propValue2');
        expect(otherChildNode.prop("someOtherProp")).toBe('otherPropValue');
        expect(otherChildNode.prop("applicationId")).toBe('kio');
        expect(otherChildNode.prop("versionId")).toBe('vId');
    });

});
