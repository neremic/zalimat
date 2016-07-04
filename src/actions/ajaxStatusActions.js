import * as types from './actionTypes';

export function beginLoadingVersionHistory() {
    return {type: types.LOADING_VERSION_HISTORY};
}

export function beginLoadingVersions() {
    return {type: types.LOADING_VERSIONS};
}


