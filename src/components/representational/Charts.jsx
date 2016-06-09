import 'react-widgets/lib/less/react-widgets.less'
import React from 'react'
import Chart from './Chart'
import NewChart from './NewChart'
import Multiselect from 'react-widgets/lib/Multiselect'
import DateTime from 'react-datetime'
import './react-datetime.css'
import AutoWidth from '@zalando/react-automatic-width';

let lineData = [
    {
        name: 'series1series1series1',
        values: [
            { x: 1423915030039, y: 11.2 },
            { x: 1423913330040, y: 2.1 }
        ],
        strokeWidth: 10
    },
    {
        name: 'series2 series2 series2 series2 series2',
        values : [ { x: 0, y: 8 }, { x: 1, y: 5 }, { x: 2, y: 20 }, { x: 3, y: 12 }, { x: 4, y: 4 }, { x: 5, y: 6 }, { x: 6, y: 2 }, { x: 4.4, y: 2 } ],
        strokeWidth: 10
    },
    {
        name: 'series3',
        values: [ { x: -10, y: 0 }, { x: 1, y: 5 }, { x: 2, y: 8 }, { x: 3, y: 2 }, { x: 4, y: 6 }, { x: 5, y: 4 }, { x: 6, y: 2 } ],
        strokeWidth: 10
    }
];

class Charts extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            versions: [],
            versionsWithData: []
        };
    }

    handleVersionsSelected(selectedOptions) {
        console.log("handleChange : %O", selectedOptions);
        console.log("oldState : %O", this.state);
        let newVersions = [];
        let newVersionsWithData = [];
        let newState = Object.assign({}, this.state);
        for (let i = 0; i < selectedOptions.length; i++) {
            newVersions.push(selectedOptions[i].text);
            let nvwd = Object.assign({}, {data: new Array(lineData[i % 3])}, {version: selectedOptions[i].text});
            newVersionsWithData.push(nvwd);
        }
        Object.assign(newState, {versions: newVersions, versionsWithData: newVersionsWithData});
        console.log("newState : %O", newState);
        this.setState(newState);
    }

    handleDatePick(date) {
        console.log("date : %O", date);
    }

    render() {
        console.log("render called");

        var versions = [];

        for (let i = 0; i<20; i++) {
            var r = Math.random();
            let entry = {
                value: i,
                text: r.toString(16).substring(2, 7).toUpperCase()
            }
            versions.push(entry);
        }

        let count = 5;
        var children = [];

        for (let i = 0; i < this.state.versionsWithData.length; i++) {
            children.push(
                <div>
                    <Chart data = {this.state.versionsWithData[i].data}></Chart>
                </div>
            );
        }


        return (
            <div>
                <h3>i am a charts component</h3>
                <AutoWidth className="responsive">
                    <NewChart></NewChart>
                </AutoWidth>
                <Multiselect
                    valueField = 'value'
                    textField = 'text'
                    data = {versions}
                    onChange = {this.handleVersionsSelected.bind(this)}>
                </Multiselect>
                <DateTime
                    onChange = {this.handleDatePick.bind(this)}
                ></DateTime>
                {children}
            </div>
        )
    }
};

export default Charts;
