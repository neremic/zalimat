"use strict";

import React from 'react';

// when you only render props it can be shortened to a function
// export default ({applicationId}) => <div>My applicationId is {applicationId}</div>
// REL Yep. This component was just for testing the "pass child through" behaviour for the charts components

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
