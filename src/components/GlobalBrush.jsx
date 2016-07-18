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

        const { startDate, endDate } = props.viewPortDateRange;
        this.state = {
            startDate,
            endDate
        };

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(extent) {
        this.setState({extent: [extent[0], extent[1]]});
        this.props.onBrushChange(...extent);
    }

    componentWillReceiveProps(nextProps) {
        const {startDate, endDate} = nextProps.viewPortDateRange;
        if (this.state.startDate != startDate || this.state.endDate != endDate) {
            const newState = {
                startDate,
                endDate
            };
            this.setState(newState);
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
