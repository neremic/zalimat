"use strict";

import React from 'react'

import { Brush } from 'react-d3-components';
import d3 from 'd3';
import Dimensions from 'react-dimensions'

const BRUSH_MARGIN = {top: 0, bottom: 30, left: 50, right: 20};
const BRUSH_HORIZONTAL_MARGIN = BRUSH_MARGIN.left + BRUSH_MARGIN.right;
const BRUSH_STYLE = {float: 'none'};

class GlobalBrush extends React.Component {
    constructor(props) {
        super(props);

        let { startDate, endDate } = props.viewPortDateRange;
        this.state = {
            xstartDate: startDate
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(extent) {
        this.props.onBrushChange(...extent);
    }

    componentWillReceiveProps(nextProps) {
        console.log("GB componentWillReceiveProps %O", nextProps);
        let {startDate} = nextProps.viewPortDateRange;
        this.setState(this.state);
        if (this.state.xstartDate != startDate) {
            this.setState({xstartDate: startDate});
        }
    }

    render() {
        if (this.props.show) {
            let {startDate, endDate} = this.props.viewPortDateRange;

            return (
                <div className="brush" style={BRUSH_STYLE}>
                    <Brush
                        width = {this.props.containerWidth}
                        height = {this.props.height}
                        margin = {BRUSH_MARGIN}
                        xScale = {d3.time.scale().domain([startDate, endDate]).range([0, this.props.containerWidth - BRUSH_HORIZONTAL_MARGIN])}
                        extent = {[startDate, endDate]}
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
    show: React.PropTypes.bool.isRequired,
    viewPortDateRange: React.PropTypes.shape({
        startDate: React.PropTypes.instanceOf(Date),
        endDate: React.PropTypes.instanceOf(Date)
    }).isRequired,
    onBrushChange: React.PropTypes.func.isRequired
};

export default Dimensions()(GlobalBrush);
