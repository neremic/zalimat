import * as types from '../actions/actionTypes';
import initialState from './initialState';

function actionTypeStartsWithLoaded(type) {
    return type.startsWith('LOADED_');
}

export default function ajaxStatusReducer(state = initialState.ajaxCallsInProgress, action) {
    if (action.type == types.LOADING_VERSION_HISTORY) {
        let newState = Object.assign({}, state, {
            versionHistoriesCallsPending : state.versionHistoriesCallsPending + 1
        });
        return newState;
    } else if (action.type == types.LOADING_VERSIONS) {
        let newState = Object.assign({}, state, {
            versionsCallsPending : state.versionsCallsPending + 1
        });
        return newState;
    } else if (action.type == types.LOADED_VERSION_HISTORY) {
        return Object.assign({}, state, {
            versionHistoriesCallsPending : state.versionHistoriesCallsPending - 1
        });
    } else if (action.type == types.LOADED_VERSIONS) {
        let newState = Object.assign({}, state, {
            versionsCallsPending : state.versionsCallsPending - 1
        });
        return newState;
        // TODO
    // } else if (action.type == types.AJAX_CALL_ERROR ||
    //     actionTypeStartsWithLoaded(action.type)) {
    //     return state - 1;
    }


    return state;
}
