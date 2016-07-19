"use strict";

import React from 'react';
import { ScatterChart } from 'rd3';

const FORMATTER_ONLY_INTEGERS = function(number) {
    return number == Math.floor(number) ? number : null;
};

 const ScatterChartRD3 = (props) => {
    const { viewPortDateRange: {startDate, endDate}, width, height, colors, data } = props;
    return (
        props.data && props.data.length > 0 ?
            <ScatterChart
                width          = {width}
                height         = {height}
                data           = {data}
                yAxisFormatter = {FORMATTER_ONLY_INTEGERS}
                legend         = {false}
                colors         = {colors}
                domain         = {{x:[startDate, endDate], y:[0,]}}
            />
            :
            <div style = {{width : width, height : height}}>
                <h1>
                    Nothing to show
                </h1>
            </div>
    )
};

ScatterChartRD3.PorpTypes = {
    viewPortDateRange: React.PropTypes.shape({
        startDate: React.PropTypes.instanceOf(Date),
        endDate: React.PropTypes.instanceOf(Date)
    }).isRequired,
    width: React.PropTypes.number.isRequired,
    height: React.PropTypes.number.isRequired,
    colors: React.PropTypes.func.isRequired,
    eventData: React.PropTypes.arrayOf(
        React.PropTypes.shape({
            name: React.PropTypes.string,
            values: React.PropTypes.arrayOf(
                React.PropTypes.shape({
                    x: React.PropTypes.instanceOf(Date),
                    y: React.PropTypes.number})
            )
        })).isRequired
}

export default ScatterChartRD3;
