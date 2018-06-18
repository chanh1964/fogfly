import config from '../config/'
import api from '../api/'

const timeStamp = { time: new Date() }
const modelOfOneDirection = (toNodeId, vehNum, avgVel) => {
    return {
        toNodeId: toNodeId,
        vehNum: vehNum,
        avgVel: avgVel,
    }
}

const modelOfOneNode = (fromNodeId) => {
    return {
        fromNodeId: fromNodeId,
        directionList: config[fromNodeId].adjNodeIds.map((adjNodeId) => {
            return modelOfOneDirection(config[adjNodeId].id, 0, 0);
        })
    }
};

const db = [modelOfOneNode(config["99Node"].id), modelOfOneNode(config["100Node"].id), modelOfOneNode(config["101Node"].id), modelOfOneNode(config["102Node"].id), modelOfOneNode(config["103Node"].id)];

const updateDB = (frequency) => {
    console.log("Master is Updating database")
    db.forEach(node => {
        node.directionList.forEach(async direction => {
            const newInfo = await api.getVehicleFrom(direction.toNodeId, node.fromNodeId, 6000);
            Object.assign(direction, newInfo);
            // console.log(direction)
        })
    });
    timeStamp.time = new Date();
    // console.log(db[0].directionList[1].vehCount);
    setTimeout(() => updateDB(frequency), frequency)
}




const database = {
    db: db,
    timeStamp: timeStamp,
    updateDB: frequency => updateDB(frequency),
    // test: frequency => test(frequency)
};

export default database;