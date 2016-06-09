"use strict";

import React from 'react'

import { Brush } from 'react-d3-components';

class GlobalBrush extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            xScaleBrush: d3.time.scale().domain([new Date(2016, 5, 5), new Date(Date.now())]).range([0, 400 - 70])
        };
    }

    handleChange(extent) {
        this.props.onBrushChange(...extent);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.width != this.props.width) {
            this.setState({xScaleBrush: d3.time.scale().domain([new Date(2016, 5, 5), new Date(Date.now())]).range([0, nextProps.width - 70])});
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
                        extent={[new Date(2016, 5, 5), new Date(Date.now())]}
                        onChange={this.handleChange.bind(this)}
                        xAxis={{tickValues: this.state.xScaleBrush.ticks(d3.time.days, 1), tickFormat: d3.time.format("%m/%d")}}
                    />
                </div>
            )
        } else {
            return null
        }
    }
}

export default GlobalBrush;
