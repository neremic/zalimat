import superagent from 'superagent';

class Api {
    static fetchHistory(applicationId, versionId, startDate, endDate) {
        return superagent
            .get(`http://127.0.0.1:3003/apps/${applicationId}/versions/${versionId}/instance_histories?start_date=${startDate}&end_date=${endDate}`)
            .accept('json')
            .then(res => {
                return res.body
            })
            .catch(err => {
                throw err;
            });
    }

    static getApplicationVersions(applicationId) {
        return superagent
            .get(`http://127.0.0.1:3003/apps/${applicationId}/versions`)
            .accept('json')
            .then(res => {
                return res.body
            })
            .catch(err => {
                throw err;
            });
    }

}


export default Api;
