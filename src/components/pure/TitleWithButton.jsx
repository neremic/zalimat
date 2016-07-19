"use strict";

import React from 'react';
import Label from 'react-bootstrap/lib/Label';
import Button from 'react-bootstrap/lib/Button';

const TitleWithButton = (props) =>
    <div>
        <h3>
            <Label bsStyle = "success">
                {props.title}
                <Button
                    bsStyle = "danger" bsSize = "xsmall"
                    onClick = {props.onClick}>
                    X
                </Button>
            </Label>
        </h3>
    </div>;

TitleWithButton.PropTypes = {
    onClick: React.PropTypes.func.isRequired
}

export default TitleWithButton;
