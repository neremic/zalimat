"use strict";

import expect from 'expect';
import Immutable from 'immutable';

import applicationVersionHistoryReducer from '../../src/reducers/applicationVersionHistoryReducer.js';
import * as actions from '../../src/actions/applicationHistoryAction.js';
import * as types from '../../src/actions/actionTypes';

describe('ApplicationVersionHistoryReducer', () => {

    it('should add new application life cycle data to state', () => {

        const initialState = {
            versions: [],
            histories: Immutable.Map(),
            ajaxCallsInProgress: {
                versionsCallsPending: 0,
                versionHistoriesCallsPending: 0
            }
        };

        const versionId = 'someId';
        const date1 = new Date();
        const date2 = new Date();
        const history = {
            data : []
        };

        history.data.push({
            change_date : date1.toISOString(),
            instances_count : 10
        });

        history.data.push({
            change_date : date2.toISOString(),
            instances_count : 13
        });


        const action = actions.loadedVersionHistory(versionId, history);

        const newState = applicationVersionHistoryReducer(initialState.histories, action);

        expect(action.type).toBe(types.LOADED_VERSION_HISTORY);
        expect(action.versionId).toBe(versionId);
        expect(action.history).toEqual(history);

        expect(newState.get(versionId)).toNotBe(null);
        expect(newState.get(versionId).label).toBe('');
        expect(newState.get(versionId).values.length).toBe(2);
        expect(newState.get(versionId).values[0].x).toEqual(date1);
        expect(newState.get(versionId).values[0].y).toBe(10);
        expect(newState.get(versionId).values[1].x).toEqual(date2);
        expect(newState.get(versionId).values[1].y).toBe(13);
    });

    it('should add empty application life cycle data to state', () => {

        const versionId = 'someId';
        const date1 = new Date();
        const date2 = new Date();
        const history = {
            data : []
        };

        const expectedHistory = {
            label : '',
            values : []
        };

        const initialState = {
            versions: [versionId],
            histories: Immutable.Map(),
            ajaxCallsInProgress: {
                versionsCallsPending: 0,
                versionHistoriesCallsPending: 0
            }
        };

        history.data.push({
            change_date : date1.toISOString(),
            instances_count : 10
        });

        history.data.push({
            change_date : date2.toISOString(),
            instances_count : 13
        });

        initialState.histories.set(versionId, history)


        const action = actions.clearVersionHistory(versionId);

        const newState = applicationVersionHistoryReducer(initialState.histories, action);

        expect(action.type).toBe(types.CLEAR_VERSION_HISTORY);
        expect(action.versionId).toBe(versionId);
        expect(action.history).toEqual(expectedHistory);

        expect(newState.get(versionId)).toNotBe(null);
        expect(newState.get(versionId).label).toBe('');
        expect(newState.get(versionId).values.length).toBe(0);
    });

});
