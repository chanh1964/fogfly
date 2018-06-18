// TODO: MONGODB
// const MongoClient = require('mongodb').MongoClient;
// const assert = require('assert');
// const mongoLink = 'mongodb://localhost:17375/';
// const mongoDatabase = 'dragonfly';
// const vehicleData = 'vehicle.data'; // Collection
// const nodeData = 'node.data';       // Collection
// const cycleData = 'cycle.data';     // Collection
// var db;

// MongoClient.connect(mongoLink, (err, database) => {
//     // Start the Server
//     assert.equal(null, err);
//     console.log('Connected to localhost db');
//     db = database.db(mongoDatabase);
//     //database.close()
// });

import { MongoClient, Db } from "mongodb";
import logger from "../../utils/logger";

let dbConnect: Db = undefined;

export async function initConnection({ host, port, database }) {
    if (dbConnect) {
        return;
    }
    try {
        const url = `mongodb://${host}:${port}/${database}`;
        const conn = await MongoClient.connect(url, (err, dtb) => {
            dbConnect = dtb.db(database)
        });

        logger.info(`Connected to MongoDB server with URL: ${url}`);
    } catch (error) {
        logger.error(`Cannot connect to mongodb: ${error.message}`);
    }
}

export function getDbConnection(): Db {
    return dbConnect;
}
