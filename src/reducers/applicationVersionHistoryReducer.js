import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function applicationVersionHistoryReducer(state = initialState.histories, action) {
    switch (action.type) {
        case types.LOADED_VERSION_HISTORY:
            return state.set(action.versionId, transformResult(action.history));
        case types.CLEAR_VERSION_HISTORY:
            return state.set(action.versionId, action.history);

        default:
            return state;
    }
}

function transformResult(inHistory) {
    let outHistory = {
        label : '',
        values : []
    };

    if (inHistory && inHistory.data) {
        inHistory.data.forEach(entry => {
            const xRaw = entry.change_date;
            const y = entry.instances_count;
            const x = new Date(Date.parse(xRaw));

            outHistory.values.push({
                    x,
                    y
                });
            }
        );
    }

    return outHistory;
}
