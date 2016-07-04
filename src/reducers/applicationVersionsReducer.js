import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function applicationVersionReducer(state = initialState.versions, action) {
    switch (action.type) {
        case types.LOADED_VERSIONS:
            return transformVersions(action.versions);

        default:
            return state;
    }
}

function transformVersions(inVersions) {
    let outVersions = [];

    if (inVersions) {
        inVersions.forEach(v => 
            outVersions.push({
                value: v.id,
                text: v.id
            })
        );
    }

    return outVersions;
}
