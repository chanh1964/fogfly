import axios from 'axios';
import config from '../config';


const api = {
    getVehicleFrom: (toNodeId, fromNodeId, seconds) => getVehicleFrom(toNodeId, fromNodeId, seconds)
}


async function getVehicleFrom(toNodeId, fromNodeId, seconds) {
    const baseURI = `http://${(toNodeId == config['99Node'].id && config.SLAVE_NODE_99_HOST) || config.OTHER_SLAVE_NODES_HOST}:`
    return await axios({
        method: 'get',
        url: `${baseURI + config[toNodeId].port}/node/data/report`,
        params: {
            seconds: seconds, fromNodeId: fromNodeId
        }

    })
        .then(function (response) {
            // console.log(response.data);

            return response.data;
        })
        .catch(function (error) {
            console.log(error);
        });
}

export default api;