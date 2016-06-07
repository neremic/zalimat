import React from 'react'
import VersionSelector from '../../representational/VersionSelector'
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import Panel from 'react-bootstrap/lib/Panel';
import Label from 'react-bootstrap/lib/Label';
import AutoWidth from '@zalando/react-automatic-width';
import NewChart from '../../representational/NewChart'

class LifeCycleCharts extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            versions : [],
            selectedVerions : [],
            versionsData : new Map()
        };
        for (let i = 0; i<20; i++) {
            var r = Math.random();
            let entry = {
                value: i,
                text: r.toString(16).substring(2, 7).toUpperCase()
            }
            this.state.versions.push(entry);
        }
    }

    handleVersionSelected(selectedOptions) {
        let _versionsData = this.state.versionsData;
        for (let i = 0; i < selectedOptions.length; i++) {
            let applicationId = selectedOptions[i].text;
            console.log("data %O " , _versionsData.get(applicationId));
            if (_versionsData.get(applicationId) == undefined) {
                _versionsData.set(applicationId, this.createRandomData());
            }
        }

        this.setState(
            { selectedVerions : selectedOptions,
                versionsData : _versionsData
            }
        );
    }

    createRandomData() {
        const oneHour = 3600000;
        let data = {label: '', values: []};
        let startDate = new Date(2015, 2, 5);
        console.log("0 %O ", startDate);
        let startMillis = startDate.getTime();
        console.log("1 %O ", startMillis);
        for (let i = 0; i < 60; i++) {
            let multi = Math.floor(Math.random() * 15);
            startMillis += oneHour * multi;
            console.log("2 %O ", startMillis);
            data.values.push({x: new Date(startMillis), y : Math.floor(Math.random() * 10)});
        }
        console.log("gen data %O ", data);
        return data;
    }

    render() {
        console.log("my state is %O", this.state);
        var charts = [];

        for (let i = 0; i < this.state.selectedVerions.length; i++) {
            charts.push(
                <Panel>
                    <hr/>
                    <h2>
                        <Label bsStyle="success">
                            {this.state.selectedVerions[i].text}
                        </Label>
                    </h2>
                    <AutoWidth className="responsive">
                        <NewChart dataSet = {this.state.versionsData.get(this.state.selectedVerions[i].text)}/>
                    </AutoWidth>
                </Panel>
            );
        }

        return (
            <Grid>
                <Row className="show-grid">
                    <Col md={4}>
                        <VersionSelector
                            versions = {this.state.versions}
                            onChange = {this.handleVersionSelected.bind(this)}
                        />
                    </Col>
                    <Col md={4}>StartDate</Col>
                </Row>

                <Row className="show-grid">
                    <Col md={12}>
                        {charts}
                    </Col>
                </Row>
            </Grid>
        )
    }
}

export default LifeCycleCharts;
