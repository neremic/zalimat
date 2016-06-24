import * as types from './actionTypes';
import Api from '../api/Api';
import {beginAjaxCall, ajaxCallError} from './ajaxStatusActions';

export function loadedApplicationVersions(versions) {
    return { type: types.LOADED_VERSIONS, versions};
}

export function loadApplicationVersions() {
    return function(dispatch) {
        //dispatch(beginAjaxCall());
        return Api.getApplicationVersions().then(versions => {
            console.log("loadedVersions %O", versions);
            dispatch(loadedApplicationVersions(versions));
        }).catch(error => {
            throw(error);
        });
    };
}
