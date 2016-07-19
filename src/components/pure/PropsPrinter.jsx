"use strict";

import React from 'react';

const PropsPrinter =  (props) => {
    let propsAsString = Object.keys(props)
        .map(key => {
            return (
                <span key = {key}>
                    {key}: {props[key]}
                </span>
            )
        });

    return (
        <div>
            {propsAsString}
        </div>
    )
};

export default PropsPrinter;
