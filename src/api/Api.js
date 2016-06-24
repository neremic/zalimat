import superagent from 'superagent';

class Api {
    static fetchHistory(applicationId, versionId, startDate, endDate) {
        return superagent
            .get(`localhost:3003/apps/${applicationId}/versions/${versionId}/instance_histories?start_date=${startDate}&end_date=${endDate}`)
            .accept('json')
            .then(res => {
                console.log("fetched %O", res);
                res.body
            })
            .catch(err => {
                err.id = id;
                throw err;
            });
    }

    static getApplicationVersions(applicationId) {
        return superagent
            .get(`localhost:3003/apps/${applicationId}/versions`)
            .accept('json')
            .then(res => {
                console.log("fetched %O", res);
                res.body
            })
            .catch(err => {
                err.id = id;
                throw err;
            });
    }

}


export default Api;
