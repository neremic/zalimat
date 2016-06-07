import React from 'react'
import { AreaChart } from 'react-d3-components';
import { Brush } from 'react-d3-components';
import AutoWidth from '@zalando/react-automatic-width';

class NewChart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {label: '', values: [
                {x: new Date(2015, 2, 5), y: 1},
                {x: new Date(2015, 2, 6), y: 2},
                {x: new Date(2015, 2, 7), y: 0},
                {x: new Date(2015, 2, 8), y: 3},
                {x: new Date(2015, 2, 9), y: 2},
                {x: new Date(2015, 2, 10), y: 3},
                {x: new Date(2015, 2, 11), y: 4},
                {x: new Date(2015, 2, 12), y: 4},
                {x: new Date(2015, 2, 13), y: 1},
                {x: new Date(2015, 2, 14), y: 5},
                {x: new Date(2015, 2, 15), y: 0},
                {x: new Date(2015, 2, 16), y: 1},
                {x: new Date(2015, 2, 16), y: 1},
                {x: new Date(2015, 2, 18), y: 4},
                {x: new Date(2015, 2, 19), y: 4},
                {x: new Date(2015, 2, 20), y: 5},
                {x: new Date(2015, 2, 21), y: 5},
                {x: new Date(2015, 2, 22), y: 5},
                {x: new Date(2015, 2, 23), y: 1},
                {x: new Date(2015, 2, 24), y: 0},
                {x: new Date(2015, 2, 25), y: 1},
                {x: new Date(2015, 2, 26), y: 1}
            ]},
            xScale: d3.time.scale().domain([new Date(2015, 2, 5), new Date(2015, 2, 26)]).range([0, 400 - 70]),

            xScaleBrush: d3.time.scale().domain([new Date(2015, 2, 5), new Date(2015, 2, 26)]).range([0, props.width - 70])
        }
        console.log("props.width = %O", props.width)
    }

    componentWillReceiveProps(nextProps) {
        console.log("nextProps.width = %O", nextProps.width);
        this.setState({xScale: d3.time.scale().domain([new Date(2015, 2, 5), new Date(2015, 2, 26)]).range([0, nextProps.width - 70])});
        this.setState({xScaleBrush: d3.time.scale().domain([new Date(2015, 2, 5), new Date(2015, 2, 26)]).range([0, nextProps.width - 70])});
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
                <div className="brush" style={{float: 'none'}}>
                    <Brush
                        width={this.props.width}
                        height={50}
                        margin={{top: 0, bottom: 30, left: 50, right: 20}}
                        xScale={this.state.xScaleBrush}
                        extent={[new Date(2015, 2, 10), new Date(2015, 2, 12)]}
                        onChange={this._onChange.bind(this)}
                        xAxis={{tickValues: this.state.xScaleBrush.ticks(d3.time.day, 2), tickFormat: d3.time.format("%m/%d")}}
                    />
                </div>
            </div>
        );
    }

    _onChange(extent) {
        console.log("extent : %O", extent);
        this.setState({xScale: d3.time.scale().domain([extent[0], extent[1]]).range([0, this.props.width - 70])});
    }
};

export default NewChart;
