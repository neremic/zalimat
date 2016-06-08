import React from 'react'
import VersionSelector from '../../representational/VersionSelector'
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import ChartWithHeader from '../../ChartWithHeader';
import GlobalBrush from '../../GlobalBrush';
import { Brush } from 'react-d3-components';
import AutoWidth from '@zalando/react-automatic-width';

class LifeCycleCharts extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            versionToBeRemoved : undefined,
            versions : [],
            viewPortDateRange : {
                startDate : new Date(2016, 5, 5),
                endDate : new Date(Date.now())
            },
            selectedVerions : [],
            versionsData : new Map(),
            xScaleBrush: d3.time.scale().domain([new Date(2015, 2, 5), new Date(2015, 2, 26)]).range([0, 400 - 70])
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

    handleBrushChange(start, end) {
        console.log("handleBrushChange %O", start);
        console.log("handleBrushChange %O", end);
        this.setState({
            viewPortDateRange : {
                startDate : start,
                endDate : end
            }
        });
    }

    handleVersionSelected(selectedOptions) {
        let _versionsData = this.state.versionsData;
        for (let i = 0; i < selectedOptions.length; i++) {
            let applicationId = selectedOptions[i].text;
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
        let startDate = new Date(2016, 5, 5);
        let startMillis = startDate.getTime();
        for (let i = 0; i < 60; i++) {
            let multi = Math.floor(Math.random() * 5);
            startMillis += oneHour * multi;
            data.values.push({x: new Date(startMillis), y : Math.floor(Math.random() * 10)});
        }
        return data;
    }

    handleRemoveVersion(_versionToBeRemoved) {
        console.log("1 handleRemoveVersion %O", _versionToBeRemoved);
        console.log("2 handleRemoveVersion %O", this.state.selectedVerions);
        let newValues = this.state.selectedVerions.filter((v) => {
            console.log("filter %O", v);
            console.log("filter %O", (v.text != _versionToBeRemoved));
            return v.text != _versionToBeRemoved;
        });
        console.log("3 handleRemoveVersion %O", newValues);

        console.log("a handleRemoveVersion %O", newValues.length);
        console.log("b handleRemoveVersion %O", this.state.selectedVerions.length);
        if (newValues.length < this.state.selectedVerions.length) {
            console.log("4 handleRemoveVersion %O", newValues);
            this.setState({
                versionToBeRemoved: _versionToBeRemoved,
                selectedVerions: newValues
            });
        }
    }

    render() {
        var charts = [];

        for (let i = 0; i < this.state.selectedVerions.length; i++) {
            charts.push(
                <ChartWithHeader
                    key = {"key" + i}
                    title = {this.state.selectedVerions[i].text}
                    onDelete = {this.handleRemoveVersion.bind(this)}
                    dataSet = {this.state.versionsData.get(this.state.selectedVerions[i].text)}
                    viewPortDateRange = {this.state.viewPortDateRange}
                />
            );
        }

        let globalBrush = "";
        if (this.state.selectedVerions.length > 0) {
            globalBrush =
                <Row className="show-grid">
                    <Col md={12}>
                        <AutoWidth className="responsive">
                            <GlobalBrush onBrushChange = {this.handleBrushChange.bind(this)}/>
                        </AutoWidth>
                    </Col>
                </Row>
            ;
        }

        return (
            <Grid>
                <Row className="show-grid">
                    <Col md={4}>
                        <VersionSelector
                            removeVersion = {this.state.versionToBeRemoved}
                            versions = {this.state.versions}
                            onChange = {this.handleVersionSelected.bind(this)}
                        />
                    </Col>
                    <Col md={4}>StartDate</Col>
                </Row>
                {globalBrush}
                {charts}
            </Grid>
        )
    }
}


export default LifeCycleCharts;
