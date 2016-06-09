"use strict";

import React from 'react'
import VersionSelector from '../../VersionSelector'
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import Charts from '../../Charts';
import GlobalBrush from '../../GlobalBrush';
import AutoWidth from '@zalando/react-automatic-width';
import DateTime from 'react-datetime'
import '../../../styles/react-datetime.css'

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
        let newValues = this.state.selectedVerions.filter((v) => {
            return v.text != _versionToBeRemoved;
        });

        if (newValues.length < this.state.selectedVerions.length) {
            this.setState({
                versionToBeRemoved: _versionToBeRemoved,
                selectedVerions: newValues
            });
        }
    }

    handleDatePicked(moment) {
        console.log("date : %O", moment);
    }

    render() {
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
                    <Col md={4}>
                        <DateTime
                            onChange = {this.handleDatePicked.bind(this)}
                        />
                    </Col>
                </Row>
                <Row className="show-grid">
                    <Col md={12}>
                        <AutoWidth className="responsive">
                            <GlobalBrush
                                show = {this.state.selectedVerions.length > 0}
                                onBrushChange = {this.handleBrushChange.bind(this)}
                            />
                        </AutoWidth>
                    </Col>
                </Row>
                <Row className="show-grid">
                    <Col md={12}>
                        <Charts
                            selectedVersions = {this.state.selectedVerions}
                            onDelete = {this.handleRemoveVersion.bind(this)}
                            dataSets = {this.state.versionsData}
                            viewPortDateRange = {this.state.viewPortDateRange}
                        />
                    </Col>
                </Row>
            </Grid>
        )
    }
}


export default LifeCycleCharts;
