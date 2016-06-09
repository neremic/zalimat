"use strict";

import React from 'react'
import { AreaChart } from 'react-d3-components';

class Chart extends React.Component {
    constructor(props) {
        super(props);
        let startDate = props.viewPortDateRange.startDate;
        let endDate = props.viewPortDateRange.endDate;
        this.state = {
            xScale: d3.time.scale().domain([startDate, endDate]).range([0, 400 - 70]),
        }
    }

    componentWillReceiveProps(nextProps) {
        let startDate = nextProps.viewPortDateRange.startDate;
        let endDate = nextProps.viewPortDateRange.endDate;
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
                    height={200}
                    margin={{top: 10, bottom: 50, left: 50, right: 20}}
                />
            </div>
        );
    }
};

export default Chart;
