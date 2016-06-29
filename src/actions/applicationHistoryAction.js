import * as types from './actionTypes';
import Api from '../api/Api';
import {ajaxCallError, beginLoadingVersionHistory} from './ajaxStatusActions';

export function loadedVersionHistory(versionId, history) {
    return {
        type: types.LOADED_VERSION_HISTORY,
        versionId,
        history
    };
}

export function clearVersionHistory(versionId) {
    return {
        type: types.CLEAR_VERSION_HISTORY,
        versionId,
        history : {
            label : '',
            values : []
        }
    };
}

export function loadVersionHistories(applicationId, versions, startDate, endDate) {
    return function(dispatch) {
        versions.forEach(version => {
            const versionId = version.value;
            dispatch(clearVersionHistory(versionId));
            dispatch(beginLoadingVersionHistory());
            return Api.fetchHistory(applicationId, versionId, startDate, endDate).then(history => {
                dispatch(loadedVersionHistory(versionId, history));
            }).catch(error => {
                throw(error);
            });
        });
    };
}

