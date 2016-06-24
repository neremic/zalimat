import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function applicationVersionReducer(state = initialState.versions, action) {
    switch (action.type) {
        case types.LOADED_VERSIONS:
            console.log("LOADED_VERSIONS");
            console.log("old state %O", state);
            let newState = Object.assign({}, state, {versions:action.versions});
            console.log("new state %O", newState);
            return action.versions;

        default:
            return state;
    }
}
