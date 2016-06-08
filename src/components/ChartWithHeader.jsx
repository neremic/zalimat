import React from 'react'
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import Panel from 'react-bootstrap/lib/Panel';
import Label from 'react-bootstrap/lib/Label';
import Button from 'react-bootstrap/lib/Button';
import AutoWidth from '@zalando/react-automatic-width';
import NewChart from './NewChart'

class ChartWithHeader extends React.Component{
    handleDeleteThisChart() {
        this.props.onDelete(this.props.title);
    }

    render() {
        return (
            <Row className="show-grid">
                <Col md={12}>
                    <Panel>
                        <hr/>
                        <h2>
                            <Label bsStyle="success">
                                {this.props.title}
                            </Label>
                        </h2>
                        <Button
                            bsStyle="danger" bsSize="xsmall"
                            onClick = {this.handleDeleteThisChart.bind(this)}>
                            X
                        </Button>
                        <AutoWidth className="responsive">
                            <NewChart
                                dataSet = {this.props.dataSet}
                                viewPortDateRange = {this.props.viewPortDateRange}
                            />
                        </AutoWidth>
                    </Panel>
                </Col>
            </Row>
        )
    }
}

export default ChartWithHeader;
