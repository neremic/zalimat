"use strict";

import expect from 'expect';
import Immutable from 'immutable';

import applicationVersionsReducer from '../../src/reducers/applicationVersionsReducer.js';
import * as actions from '../../src/actions/applicationVersionAction.js';
import * as types from '../../src/actions/actionTypes';

describe('ApplicationVersionsReducer', () => {

    it('should add application versions to state', () => {

        const initialState = {
            versions: [],
            histories: Immutable.Map(),
            ajaxCallsInProgress: {
                versionsCallsPending: 0,
                versionHistoriesCallsPending: 0
            }
        };

        let mockedVersions = [];
        for (let i = 0; i<20; i++) {
            var r = Math.random();
            let entry = {
                id: r.toString(16).substring(2, 7).toUpperCase(),
                application_id: 'x',
                last_modified: (new Date()).toISOString(),
                artifact: 'docker://stups/kio:1.0'
            };
            mockedVersions.push(entry);
        }

        const action = actions.loadedApplicationVersions(mockedVersions);

        const newState = applicationVersionsReducer(initialState.versions, action);

        expect(action.type).toBe(types.LOADED_VERSIONS);
        expect(action.versions).toEqual(mockedVersions);

        expect(newState).toNotBe(null);
        expect(newState.length).toBe(mockedVersions.length);

        mockedVersions.forEach(mv => {
            let found = false;
            newState.forEach(s => {
               found = found || (s.value === mv.id && s.text === mv.id);
            });

            expect(found).toBe(true);
        });
    });

});
