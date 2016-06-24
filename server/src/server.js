import express from "express";
import Immutable from 'immutable';
import moment from 'moment';

let app = express();
const PORT = 3003;

const ONE_HOUR = 3600000;

let presentData = new Map();

let createMockDateIfNeeded = function createMockDateIfNeeded(applicationId, versionId, startDate, endDate) {
    if (!presentData.get(versionId)) {
        presentData.set(versionId, createRandomData(applicationId, versionId, startDate, endDate));
    } else {
        let prependArray = [];
        let existingArray = presentData.get(versionId).data;
        let appendArray = [];
        let firstDate = findFirstDate(versionId);
        let lastDate = findLastDate(versionId);
        if (firstDate > startDate) {
            prependArray = createRandomData(applicationId, versionId, startDate, firstDate).data;
        }

        if (lastDate < endDate) {
            appendArray = createRandomData(applicationId, versionId, lastDate, endDate).data;
        }

        presentData.get(versionId).data = [...prependArray, ...existingArray, ...appendArray];
    }
};

let createMockVersions = function createMockVersions(applicationId) {
    let versions = [];
    for (let i = 0; i<20; i++) {
        var r = Math.random();
        let entry = {
            id: r.toString(16).substring(2, 7).toUpperCase(),
            application_id: applicationId,
            last_modified: (new Date()).toISOString(),
            artifact: 'docker://stups/kio:1.0'
        };
        versions.push(entry);
    }

    return versions;
};

let findFirstDate = function findFirstDate(versionId) {
    if (presentData.get(versionId)) {
        return presentData.get(versionId).data[0].change_date;
    }
};

let findLastDate = function findLastDate(versionId) {
    if (presentData.get(versionId)) {
        let lastIndex = presentData.get(versionId).data.length - 1;
        return presentData.get(versionId).data[lastIndex].change_date;
    }
};

let createRandomData = function createRandomData(applicationId, versionId, startDate, stopDate) {
    let data = {
        id : versionId,
        application_id : applicationId,
        data : []
    };
    let startMillis = startDate.getTime();
    let stopMillis = stopDate.getTime();
    while (true) {
        if (startMillis > stopMillis) {
            let lastIndex = data.data.length - 1;
            let currentLastChangeDate = data.data[lastIndex].change_date;
            if (currentLastChangeDate != stopMillis) {
                data.data.push({
                    change_date : new Date(stopMillis),
                    instances_count : Math.floor(Math.random() * 10)
                });
            }
            break;
        }
        data.data.push({
            change_date : new Date(startMillis),
            instances_count : Math.floor(Math.random() * 10)
        });

        let multi = 1 + Math.floor(Math.random() * 5);
        startMillis += ONE_HOUR * multi;
    }
    return data;
};

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/', function(res, req) {
    req.send("test\n");
});

app.get('/apps/:application_id/versions/:version_id/instance_histories', function(res, req) {
    let startDate = new Date(res.query.start_date);
    let endDate = new Date(res.query.end_date);
    let versionID = res.params.version_id;
    let applicationId = res.params.application_id;

    console.log("server called with url %O", res.originalUrl)

    createMockDateIfNeeded(applicationId, versionID, startDate, endDate);
    setTimeout(() => {
        req.json(presentData.get(versionID));
    }, 4000 + Math.floor(Math.random() * 8000));
});

app.get('/apps/:application_id/versions', function(res, req) {
    let startDate = new Date(res.query.start_date);
    let endDate = new Date(res.query.end_date);
    let applicationId = res.params.application_id;

    console.log("server called with url %O", res.originalUrl)

    setTimeout(() => {
        req.json(createMockVersions(applicationId));
    }, 4000 + Math.floor(Math.random() * 40));
});



app.listen(PORT, function(err){
    let test = moment(new Date());
    let test2 = moment((new Date()).toISOString());
    console.log("test date %O", test);
    console.log("test2 date %O", test2);
    let state = {data: Immutable.Map()};
    let newState = Object.assign({}, state, {data: state.data.set("k1", [1,2])});
    newState.data.set("k1", [1,2]);
    console.log("%O", state);
    console.log("%O", newState);
    console.log("server listening on port " + PORT);
});


