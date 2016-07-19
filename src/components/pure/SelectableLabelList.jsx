"use strict";

import React from 'react';
import Badge from 'react-bootstrap/lib/Badge';
import Button from 'react-bootstrap/lib/Button';

const STYLE ={
    display: "flex",
    alignContent: "flex-start",
    flexFlow: "row wrap",
    justifyContent: "flex-start"
};

const SelectableLabelList = (props) => {
    let elements = props.elements.map(element => {
        const contained = props.selectedElements.has(element.name);
        const colorString = contained ? props.colors(element.name) : '#D0D0D0';
        return <Button
            key     = {element.name}
            bsSize  = 'xsmall'
            active
            style   = {{backgroundColor: colorString}}
            onClick = {()=>props.select(element.name)}>
            <Badge>
                {element.count}
            </Badge>
            {element.name}
        </Button>
    });

    return (
        <div style={STYLE}>
            {elements}
        </div>
    )
}

SelectableLabelList.PropTypes = {
    elements: React.PropTypes.arrayOf(
        React.PropTypes.shape({
            name: React.PropTypes.string,
            count: React.PropTypes.number
        })).isRequired,
    colors: React.PropTypes.func.isRequired,
    select: React.PropTypes.func.isRequired
}

export default SelectableLabelList;
