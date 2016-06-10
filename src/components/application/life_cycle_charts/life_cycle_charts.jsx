"use strict";

import React from 'react'
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';

import moment from 'moment';

import AutoWidth from '@zalando/react-automatic-width';
import DateTime from 'react-datetime'

import Charts from '../../Charts';
import GlobalBrush from '../../GlobalBrush';
import VersionSelector from '../../VersionSelector'

class LifeCycleCharts extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            versionToBeRemoved : undefined,
            versions : [],
            selectedVerions : [],
            versionsData : new Map(),
            viewPortDateRange : {
                startDate : moment().subtract(1, "days").toDate(),
                endDate : new Date(Date.now())
            },
            brushViewPortDateRange : {
                startDate : moment().subtract(1, "days").toDate(),
                endDate : new Date(Date.now())
            },
            xScaleBrush: d3.time.scale().domain([moment().subtract(1, "days").toDate(), new Date(Date.now())]).range([0, 400 - 70])
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

    handleBrushChanged(start, end) {
        this.setState({
            viewPortDateRange : {
                startDate : start,
                endDate : end
            }
        });
    }

    handleVersionSelected(selectedOptions) {
        let versionsData = this.state.versionsData;
        for (let i = 0; i < selectedOptions.length; i++) {
            let applicationId = selectedOptions[i].text;
            if (versionsData.get(applicationId) == undefined) {
                versionsData.set(applicationId, this.createRandomData());
            }
        }

        this.setState(
            { selectedVerions : selectedOptions,
                versionsData : versionsData
            }
        );
    }

    handleRemoveVersion(versionToBeRemoved) {
        let newValues = this.state.selectedVerions.filter((v) => {
            return v.text != versionToBeRemoved;
        });

        if (newValues.length < this.state.selectedVerions.length) {
            this.setState({
                versionToBeRemoved: versionToBeRemoved,
                selectedVerions: newValues
            });
        }
    }

    handleDatePicked(moment) {
        this.setState({
            viewPortDateRange : {
                startDate : moment.toDate(),
                endDate : new Date(Date.now())
            },
            brushViewPortDateRange : {
                startDate : moment.toDate(),
                endDate : new Date(Date.now())
            }
        });
    }

    isValidDate(currentDate, selectedDate) {
        let now = moment();
        let diff = now.diff(currentDate, 'days');
        return diff > 0;
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
                            defaultValue = {moment().subtract(1, "days")}
                            timeFormat = {false}
                            isValidDate = {this.isValidDate.bind(this)}
                            onChange = {this.handleDatePicked.bind(this)}
                        />
                    </Col>
                </Row>
                <Row className="show-grid">
                    <Col md={12}>
                        <AutoWidth className="responsive">
                            <GlobalBrush
                                show = {this.state.selectedVerions.length > 0}
                                onBrushChange = {this.handleBrushChanged.bind(this)}
                                viewPortDateRange = {this.state.brushViewPortDateRange}
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
