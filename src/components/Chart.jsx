import React from 'react'
import { LineChart } from 'rd3'
import AutoWidth from '@zalando/react-automatic-width';

let lineData = [
    {
        name: 'series1series1series1',
        values: [ { x: 0, y: 20 }, { x: 1, y: 30 }, { x: 2, y: 10 }, { x: 3, y: 5 }, { x: 4, y: 8 }, { x: 5, y: 15 }, { x: 6, y: 10 } ],
        strokeWidth: 2,
        strokeDashArray: "5,5",
    },
    {
        name: 'series2 series2 series2 series2 series2',
        values : [ { x: 0, y: 8 }, { x: 1, y: 5 }, { x: 2, y: 20 }, { x: 3, y: 12 }, { x: 4, y: 4 }, { x: 5, y: 6 }, { x: 6, y: 2 }, { x: 4.4, y: 2 } ]
    },
    {
        name: 'series3',
        values: [ { x: 0, y: 0 }, { x: 1, y: 5 }, { x: 2, y: 8 }, { x: 3, y: 2 }, { x: 4, y: 6 }, { x: 5, y: 4 }, { x: 6, y: 2 } ]
    }
];

class Chart extends React.Component {
    render() {
        return (
            <div>
                <h3>here be charts</h3>
                <AutoWidth className="responsive">
                    <h1>asd</h1>
                </AutoWidth>
                <AutoWidth className="responsive">
                    <LineChart
                            legend={true}
                            data={lineData}
                            height={400}
                            title="Line Chart"
                            yAxisLabel="Altitude"
                            xAxisLabel="Elapsed Time (sec)"
                            domain={{x: [,6], y: [-10,]}}
                            gridHorizontal={true}
                    />
                </AutoWidth>
                <LineChart
                    legend={true}
                    data={lineData}
                    width={500}
                    height={400}
                    viewBoxObject={{
                              x: 0,
                              y: 0,
                              width: 500,
                              height: 400
                            }}
                    title="Line Chart"
                    yAxisLabel="Altitude"
                    xAxisLabel="Elapsed Time (sec)"
                    domain={{x: [,6], y: [-10,]}}
                    gridHorizontal={true}
                />
            </div>
        )
    }
};

export default Chart;
