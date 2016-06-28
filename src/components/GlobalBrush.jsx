"use strict";

import React from 'react'

import { Brush } from 'react-d3-components';
import d3 from 'd3';

import moment from 'moment';

const BRUSH_MARGIN = {top: 0, bottom: 30, left: 50, right: 20};
const BRUSH_HORIZONTAL_MARGIN = BRUSH_MARGIN.left + BRUSH_MARGIN.right;
const BRUSH_STYLE = {float: 'none'};

class GlobalBrush extends React.Component {
    constructor(props) {
        super(props);

        let { startDate, endDate } = props.viewPortDateRange;
        this.state = {
            xScaleBrush: undefined,
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
                xScaleBrush: d3.time.scale().domain([startDate, endDate]).range([0, nextProps.width - BRUSH_HORIZONTAL_MARGIN]),
                xstartDate: startDate
            });
        }
    }

    render() {
        if (this.props.show) {
            return (
                <div className="brush" style={BRUSH_STYLE}>
                    <Brush
                        width = {this.props.width}
                        height = {this.props.height}
                        margin = {BRUSH_MARGIN}
                        xScale = {this.state.xScaleBrush}
                        extent = {[this.props.viewPortDateRange.startDate, this.props.viewPortDateRange.endDate]}
                        onChange = {this.handleChange}
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
