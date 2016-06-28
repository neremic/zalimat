"use strict";

import React from 'react'

import d3 from 'd3';

import { AreaChart } from 'react-d3-components';

const MARGINS = {top: 10, bottom: 50, left: 50, right: 20};
const CHART_INTERPOLATION = 'step-after';
const CHART_HORIZONTAL_MARGINS = MARGINS.left + MARGINS.right;

class Chart extends React.Component {
    constructor(props) {
        super(props);
        this.state = ({xScale : undefined});
    }

    componentWillReceiveProps(nextProps) {
        const { startDate, endDate } = nextProps.viewPortDateRange;
        this.setState({xScale: d3.time.scale().domain([startDate, endDate]).range([0, nextProps.width - CHART_HORIZONTAL_MARGINS])});
    }

    render() {
        return (
            <div>
                <AreaChart
                    data = {this.props.dataSet}
                    width = {this.props.width}
                    xScale = {this.state.xScale}
                    interpolate = {CHART_INTERPOLATION}
                    height = {this.props.height}
                    margin = {MARGINS}
                />
            </div>
        );
    }
};

Chart.propTypes = {
    dataSet: React.PropTypes.shape({
        label: React.PropTypes.string,
        values: React.PropTypes.arrayOf(
            React.PropTypes.shape({
                x: React.PropTypes.instanceOf(Date),
                y: React.PropTypes.number
            })
        )
    }).isRequired,
    viewPortDateRange: React.PropTypes.shape({
        startDate: React.PropTypes.object,
        endDate: React.PropTypes.object
    }).isRequired
};

export default Chart;
