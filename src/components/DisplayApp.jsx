"use strict";

import React from 'react';

class DisplayApp extends React.Component {

    render() {
        return (
            <div>
                My applicationId is: {this.props.applicationId}
            </div>
        );
    }
}

export default DisplayApp;
