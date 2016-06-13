"use strict";

import React from 'react'

import { Brush } from 'react-d3-components';
import d3 from 'd3';

class GlobalBrush extends React.Component {
    constructor(props) {
        super(props);
        let { startDate, endDate } = props.viewPortDateRange;
        this.state = {
            xScaleBrush: d3.time.scale().domain([startDate, endDate]).range([0, 400 - 70]),
            xstartDate: startDate
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(extent) {
        this.props.onBrushChange(...extent);
    }

    componentWillReceiveProps(nextProps) {
        let {startDate, endDate} = nextProps.viewPortDateRange;
        if (nextProps.width != this.props.width || this.state.xstartDate != startDate) {
            this.setState({
                xScaleBrush: d3.time.scale().domain([startDate, endDate]).range([0, nextProps.width - 70]),
                xstartDate: startDate
            });
        }
    }

    render() {
        if (this.props.show) {
            return (
                <div className="brush" style={{float: 'none'}}>
                    <Brush
                        width={this.props.width}
                        height={50}
                        margin={{top: 0, bottom: 30, left: 50, right: 20}}
                        xScale={this.state.xScaleBrush}
                        extent={[this.props.viewPortDateRange.startDate, this.props.viewPortDateRange.endDate]}
                        onChange={this.handleChange}
                        xAxis={{tickValues: this.state.xScaleBrush.ticks(d3.time.days, 1), tickFormat: d3.time.format("%m/%d")}}
                    />
                </div>
            )
        } else {
            return null
        }
    }
}

GlobalBrush.propTypes = {
    show: React.PropTypes.bool,
    viewPortDateRange: React.PropTypes.shape({
        startDate: React.PropTypes.object,
        endDate: React.PropTypes.object
    }),
    onBrushChange: React.PropTypes.func
};

export default GlobalBrush;
