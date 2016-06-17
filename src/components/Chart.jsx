"use strict";

import React from 'react'

import d3 from 'd3';

import { AreaChart } from 'react-d3-components';

class Chart extends React.Component {
    constructor(props) {
        super(props);
        let { startDate, endDate } = props.viewPortDateRange;
        this.state = {
            // magic numbers
            xScale: d3.time.scale().domain([startDate, endDate]).range([0, 400 - 70]),
        }
    }

    componentWillReceiveProps(nextProps) {
        let { startDate, endDate } = nextProps.viewPortDateRange;
        this.setState({xScale: d3.time.scale().domain([startDate, endDate]).range([0, nextProps.width - 70])});
    }

    render() {
        return (
            <div>
                <AreaChart
                    data={this.props.dataSet}
                    width={this.props.width}
                    xScale={this.state.xScale}
                    interpolate="step-after"
                    height={200} {/* magic number :) why not taking this from props? */}
                    margin={{top: 10, bottom: 50, left: 50, right: 20}} {/* magic numbers */}
                />
            </div>
        );
    }
};

Chart.propTypes = {
    // would be cool to have the shape defined here
    dataSet: React.PropTypes.object,
    viewPortDateRange: React.PropTypes.shape({
        startDate: React.PropTypes.object,
        endDate: React.PropTypes.object
    })
};

export default Chart;
