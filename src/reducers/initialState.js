import Immutable from 'immutable';

export default {
  versions: [],
  histories: Immutable.Map(),
  ajaxCallsInProgress: {
      versionsCallsPending : 0,
      versionHistoriesCallsPending : 0
  }
};
