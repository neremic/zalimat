import {combineReducers} from 'redux';
import applicationVersionReducer from './applicationVersionsReducer';
import applicationVersionHistoryReducer from './applicationVersionHistoryReducer';
import ajaxStatusReducer from './ajaxStatusReducer';

const rootReducer = combineReducers({
    applicationVersionReducer,
    applicationVersionHistoryReducer,
    ajaxStatusReducer
});

export default rootReducer;
