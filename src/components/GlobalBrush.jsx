import React from 'react'
import { Brush } from 'react-d3-components';

class GlobalBrush extends React.Component {
    constructor(props) {
        super(props);
        let x = new Date(Date.now()); // CEST  +2
        let y = new Date(2016, 5, 5, 10); // CET +1
        console.log("1 Global Brush %O " + y.getUTCFullYear());
        console.log("2 Global Brush %O " + x.getUTCFullYear());
        console.log("3 Global Brush %O " + y.getUTCMilliseconds());
        console.log("4 Global Brush %O " + x.getUTCMilliseconds());
        console.log("a Global Brush %O " + y);
        console.log("b Global Brush %O " + x);
        this.state = {
            xScaleBrush: d3.time.scale().domain([new Date(2016, 5, 5), new Date(Date.now())]).range([0, 400 - 70])
        };
        console.log("GlobalBrush props.width = %O", props.width)
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
    }
}

export default GlobalBrush;
