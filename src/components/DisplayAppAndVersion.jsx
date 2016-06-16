"use strict";

import React from 'react';

class DisplayAppAndVersion extends React.Component {

    render() {
        return (
            <div>
                <span>
                    My applicationId is: {this.props.applicationId}
                </span>
                <span>
                    My versionId is: {this.props.versionId}
                </span>
            </div>
        );
    }
}

export default DisplayAppAndVersion;
