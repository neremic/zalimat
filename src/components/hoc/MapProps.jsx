"use strict";

import React from 'react';

var MapProps = (Wrapped, propsToMap) => class MapProps extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let mappedProps = Object.keys(this.props)
            .map(key => [propsToMap[key] || key, this.props[key]])
            .reduce((result, prop) => {
                result[prop[0]] = prop[1];
                return result;
            }, {});

        return (
            <Wrapped
                {...mappedProps}
            />
        )
    }
};

export default MapProps;
