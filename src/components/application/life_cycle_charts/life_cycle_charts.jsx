"use strict";

import React from 'react'
import {connect} from 'react-redux';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import {bindActionCreators} from 'redux';
import _ from 'underscore'

import * as versionHistoryActions from '../../../actions/applicationHistoryAction';

import moment from 'moment';

import AutoWidth from '@zalando/react-automatic-width';

import Charts from '../../Charts';
import GlobalBrush from '../../GlobalBrush';
import VersionSelector from '../../VersionSelector'
import DateSelector from '../../DateSelector'

import 'react-widgets/lib/less/react-widgets.less'
import '../styles/react-datetime.css'

class LifeCycleCharts extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            applicationId : 'kio',
            versionToBeRemoved : undefined,
            versions : [],
            selectedVerions : [],
            viewPortDateRange : {
                startDate : moment().subtract(1, "days").toDate(),
                endDate : new Date(Date.now())
            }
        };

        this.handleDatePicked = this.handleDatePicked.bind(this);
        this.handleVersionSelected = this.handleVersionSelected.bind(this);
        this.handleBrushChanged = this.handleBrushChanged.bind(this);
        this.handleRemoveVersion = this.handleRemoveVersion.bind(this);
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
        let addedVersions = _.difference(selectedOptions, this.state.selectedVerions);
        this.performLoadVersionHistory(
            this.state.applicationId,
            addedVersions,
            this.state.viewPortDateRange.startDate,
            new Date()
        )
        this.setState({ selectedVerions : selectedOptions });
    }

    handleRemoveVersion(versionToBeRemoved) {
        let newValues = this.state.selectedVerions.filter((v) => {
            return v.value != versionToBeRemoved;
        });

        if (newValues.length < this.state.selectedVerions.length) {
            this.setState({
                versionToBeRemoved: versionToBeRemoved,
                selectedVerions: newValues
            });
        }
    }

    performLoadVersionHistory(applicationId, versions, startDate, endDate) {
        this.props.actions.loadVersionHistories(
            applicationId,
            versions,
            startDate,
            endDate
        );
    }

    handleDatePicked(date) {
        this.performLoadVersionHistory(
            this.state.applicationId,
            this.state.selectedVerions,
            date,
            new Date()
        )
        this.setState({
            viewPortDateRange : {
                startDate : date,
                endDate : new Date(Date.now())
            }
        });
    }

    render() {
        return (
            <Grid>
                <Row className="show-grid">
                    <Col md={4}>
                        <span>vcount: {this.props.ajaxStatus.versionsCallsPending}</span>
                        <span>vhcount: {this.props.ajaxStatus.versionHistoriesCallsPending}</span>
                        <VersionSelector
                            removeVersion = {this.state.versionToBeRemoved}
                            versions = {this.props.versions}
                            onChange = {this.handleVersionSelected}
                            isLoading = {this.props.ajaxStatus.versionsCallsPending > 0}
                        />
                    </Col>
                    <Col md={4}>
                        <DateSelector
                            datePicked = {this.handleDatePicked}
                        />
                    </Col>
                </Row>
                <Row className="show-grid">
                    <Col md={12}>
                        <AutoWidth className="responsive">
                            <GlobalBrush
                                show = {this.state.selectedVerions.length > 0}
                                onBrushChange = {this.handleBrushChanged}
                                viewPortDateRange = {this.state.viewPortDateRange}
                            />
                        </AutoWidth>
                    </Col>
                </Row>
                <Row className="show-grid">
                    <Col md={12}>
                        <Charts
                            selectedVersions = {this.state.selectedVerions}
                            onDelete = {this.handleRemoveVersion}
                            dataSets = {this.props.versionsHistory}
                            viewPortDateRange = {this.state.viewPortDateRange}
                            applicationId = {this.state.applicationId}
                        />
                    </Col>
                </Row>
            </Grid>
        )
    }
}

function mapStateToProps(state, ownProps) {
    return {
        versions : state.applicationVersionReducer,
        versionsHistory : state.applicationVersionHistoryReducer,
        ajaxStatus : state.ajaxStatusReducer
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(versionHistoryActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(LifeCycleCharts);
