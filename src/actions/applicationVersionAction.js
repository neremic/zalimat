import * as types from './actionTypes';
import Api from '../api/Api';
import {ajaxCallError,beginLoadingVersions} from './ajaxStatusActions';

export function loadedApplicationVersions(versions) {
    return { type: types.LOADED_VERSIONS, versions};
}

export function loadApplicationVersions() {
    return function(dispatch) {
        dispatch(beginLoadingVersions());
        return Api.getApplicationVersions('kio').then(versions => {
            dispatch(loadedApplicationVersions(versions));
        }).catch(error => {
            throw(error);
        });
    };
}
