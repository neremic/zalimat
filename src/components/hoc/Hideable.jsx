"use strict";

import React from 'react';
import Button from 'react-bootstrap/lib/Button';

// TODO find nice icons
const UP = 'up';
const DOWN = 'down';

var Hideable = Wrapped => class Hideable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show : props.initialShow
        };

        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        this.setState({show: !this.state.show});
    }

    render() {
        let {initialShow, headline, ...otherProps} = this.props;
        let wrapped = this.state.show ? <Wrapped {...otherProps} /> : null;

        return (
            <div style={{display: "flex", flexDirection: "column"}}>
                <div style={{display: "flex", justifyContent: "space-between"}}>
                    <span>
                        {headline}
                    </span>
                    <Button
                        bsSize='xsmall'
                        active
                        onClick = {this.toggle}>
                        {this.state.show ? UP : DOWN}
                    </Button>
                </div>
                {wrapped}
            </div>
        )
    }
};

Hideable.PropTypes = {
    initialShow: React.PropTypes.bool,
    headline: React.PropTypes.string
}

export default Hideable;
