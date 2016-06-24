import * as types from './actionTypes';

export function beginAjaxCall() {
    return {type: types.BEGIN_AJAX_CALL};
}

export function ajaxCallError() {
    return {type: types.AJAX_CALL_ERROR};
}

export function beginLoadingVersionHistory() {
    return {type: types.LOADING_VERSION_HISTORY};
}

export function beginLoadingVersions() {
    return {type: types.LOADING_VERSIONS};
}


