import * as types from './actionTypes';
import Api from '../api/api';
import {beginAjaxCall, ajaxCallError} from './ajaxStatusActions';

export function loadedVersionHistory(history) {
    return { type: types.LOAD_VERSION_HISTORY, history};
}

export function loadVersionHistory(applicationId, versionId, startDate, endDate) {
    return function(dispatch) {
        //dispatch(beginAjaxCall());
        return Api.fetchHistory(applicationId, versionId, startDate, endDate).then(history => {
            dispatch(loadedVersionHistory(history));
        }).catch(error => {
            throw(error);
        });
    };
}
