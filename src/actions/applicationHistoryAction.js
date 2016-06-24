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

export function performClearVersionHistory(versionId) {
    return {
        type: types.CLEAR_VERSION_HISTORY,
        versionId,
        history : {
            label : '',
            values : []
        }
    };
}

export function loadVersionHistory(applicationId, versionId, startDate, endDate, clearVersionHistory) {
    return function(dispatch) {
        dispatch(performClearVersionHistory(versionId));
        dispatch(beginLoadingVersionHistory());
        return Api.fetchHistory(applicationId, versionId, startDate, endDate).then(history => {
            dispatch(loadedVersionHistory(versionId, history));
        }).catch(error => {
            throw(error);
        });
    };
}

export function loadVersionHistories(applicationId, versions, startDate, endDate, clearVersionHistory) {
    return function(dispatch) {
        versions.forEach(version => {
            let versionId = version.value;
            dispatch(performClearVersionHistory(versionId));
            dispatch(beginLoadingVersionHistory());
            return Api.fetchHistory(applicationId, versionId, startDate, endDate).then(history => {
                dispatch(loadedVersionHistory(versionId, history));
            }).catch(error => {
                throw(error);
            });
        });
    };
}

