import React from 'react'
import { LineChart } from 'rd3'
import AutoWidth from '@zalando/react-automatic-width';

class Chart extends React.Component {
    render() {
        return (
            <div>
                <h3>here be charts</h3>
                <AutoWidth className="responsive">
                    <LineChart
                        legend={false}
                        height={200}
                        yAxisLabel="n"
                        xAxisLabel="Time"
                        gridHorizontal={true}
                        data = {this.props.data}
                        xAccessor={(d)=> {return new Date(d.x);}}
                        yAccessor={(d)=>d.y}
                        xAxisTickInterval={{unit: 'day', interval: 2}}
                    />
                </AutoWidth>
            </div>
        )
    }
};

export default Chart;
