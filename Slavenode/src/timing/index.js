import api from '../api/index';
import config from '../config';
import logger from '../utils/logger/';
// import { Calculator } from '../calculator'
const timing = async (updateFrequencyInSecond: number, calculator: Calculator) => {
    // console.log("die teros")
    const returnVeh = [];
    returnVeh[0] = await api.getVehicleTurn(config.NORTH_NODE_PORT, 6000, config.WEST_NODE_ID);
    returnVeh[1] = await api.getVehicleTurn(config.SOUTH_NODE_PORT, 6000, config.WEST_NODE_ID);
    returnVeh[2] = await api.getVehicleTurn(config.EAST_NODE_PORT, 6000, config.WEST_NODE_ID);

    returnVeh[3] = await api.getVehicleTurn(config.SOUTH_NODE_PORT, 6000, config.EAST_NODE_ID);
    returnVeh[4] = await api.getVehicleTurn(config.NORTH_NODE_PORT, 6000, config.EAST_NODE_ID);
    returnVeh[5] = await api.getVehicleTurn(config.WEST_NODE_PORT, 6000, config.EAST_NODE_ID);

    returnVeh[6] = await api.getVehicleTurn(config.WEST_NODE_PORT, 6000, config.SOUTH_NODE_ID);
    returnVeh[7] = await api.getVehicleTurn(config.EAST_NODE_PORT, 6000, config.SOUTH_NODE_ID);
    returnVeh[8] = await api.getVehicleTurn(config.NORTH_NODE_PORT, 6000, config.SOUTH_NODE_ID);

    returnVeh[9] = await api.getVehicleTurn(config.EAST_NODE_PORT, 6000, config.NORTH_NODE_ID);
    returnVeh[10] = await api.getVehicleTurn(config.WEST_NODE_PORT, 6000, config.NORTH_NODE_ID);
    returnVeh[11] = await api.getVehicleTurn(config.SOUTH_NODE_PORT, 6000, config.NORTH_NODE_ID);

    const info = {
        directionFromUpdateInfo: {
            FEa: { currentVehDir: returnVeh[3].numberOfVehicle + returnVeh[4].numberOfVehicle + returnVeh[5].numberOfVehicle, currentVehLane: returnVeh[5].numberOfVehicle / 2 + returnVeh[3].numberOfVehicle, vehTurn: returnVeh[3].numberOfVehicle },
            FEb: { currentVehDir: returnVeh[3].numberOfVehicle + returnVeh[4].numberOfVehicle + returnVeh[5].numberOfVehicle, currentVehLane: returnVeh[5].numberOfVehicle / 2 + returnVeh[4].numberOfVehicle, vehTurn: returnVeh[4].numberOfVehicle },
            FWa: { currentVehDir: returnVeh[0].numberOfVehicle + returnVeh[1].numberOfVehicle + returnVeh[2].numberOfVehicle, currentVehLane: returnVeh[2].numberOfVehicle / 2 + returnVeh[0].numberOfVehicle, vehTurn: returnVeh[0].numberOfVehicle },
            FWb: { currentVehDir: returnVeh[0].numberOfVehicle + returnVeh[1].numberOfVehicle + returnVeh[2].numberOfVehicle, currentVehLane: returnVeh[2].numberOfVehicle / 2 + returnVeh[1].numberOfVehicle, vehTurn: returnVeh[1].numberOfVehicle },
            FSa: { currentVehDir: returnVeh[6].numberOfVehicle + returnVeh[7].numberOfVehicle + returnVeh[8].numberOfVehicle, currentVehLane: returnVeh[8].numberOfVehicle / 2 + returnVeh[6].numberOfVehicle, vehTurn: returnVeh[6].numberOfVehicle },
            FSb: { currentVehDir: returnVeh[6].numberOfVehicle + returnVeh[7].numberOfVehicle + returnVeh[8].numberOfVehicle, currentVehLane: returnVeh[8].numberOfVehicle / 2 + returnVeh[7].numberOfVehicle, vehTurn: returnVeh[7].numberOfVehicle },
            FNa: { currentVehDir: returnVeh[9].numberOfVehicle + returnVeh[10].numberOfVehicle + returnVeh[11].numberOfVehicle, currentVehLane: returnVeh[11].numberOfVehicle / 2 + returnVeh[9].numberOfVehicle, vehTurn: returnVeh[9].numberOfVehicle },
            FNb: { currentVehDir: returnVeh[9].numberOfVehicle + returnVeh[10].numberOfVehicle + returnVeh[11].numberOfVehicle, currentVehLane: returnVeh[11].numberOfVehicle / 2 + returnVeh[10].numberOfVehicle, vehTurn: returnVeh[10].numberOfVehicle },
        }
    }


    calculator.updateInfo(info)

    const loggerHelper = (fromNodeId, toNodeId, vehCount) => `- From node: ${fromNodeId} to node: ${toNodeId} => ${vehCount} xe\n `;
    logger.info(
        `\n================= FLOW 2 =================\n
        
            Id node hien tai: ${config.HOST_ID}

        ${loggerHelper(config.WEST_NODE_ID, config.NORTH_NODE_ID, returnVeh[0].numberOfVehicle)}
        ${loggerHelper(config.WEST_NODE_ID, config.SOUTH_NODE_ID, returnVeh[1].numberOfVehicle)}
        ${loggerHelper(config.WEST_NODE_ID, config.EAST_NODE_ID, returnVeh[2].numberOfVehicle)}
    
        ${loggerHelper(config.EAST_NODE_ID, config.SOUTH_NODE_ID, returnVeh[3].numberOfVehicle)}
        ${loggerHelper(config.EAST_NODE_ID, config.NORTH_NODE_ID, returnVeh[4].numberOfVehicle)}
        ${loggerHelper(config.EAST_NODE_ID, config.WEST_NODE_ID, returnVeh[5].numberOfVehicle)}
    
        ${loggerHelper(config.SOUTH_NODE_ID, config.WEST_NODE_ID, returnVeh[6].numberOfVehicle)}
        ${loggerHelper(config.SOUTH_NODE_ID, config.EAST_NODE_ID, returnVeh[7].numberOfVehicle)}
        ${loggerHelper(config.SOUTH_NODE_ID, config.NORTH_NODE_ID, returnVeh[8].numberOfVehicle)}
    
        ${loggerHelper(config.NORTH_NODE_ID, config.EAST_NODE_ID, returnVeh[9].numberOfVehicle)}
        ${loggerHelper(config.NORTH_NODE_ID, config.WEST_NODE_ID, returnVeh[10].numberOfVehicle)}
        ${loggerHelper(config.NORTH_NODE_ID, config.SOUTH_NODE_ID, returnVeh[11].numberOfVehicle)}
         \n=================   END   =================`);

    setTimeout(() => { timing(updateFrequencyInSecond, calculator) }, updateFrequencyInSecond);


};

export default timing;