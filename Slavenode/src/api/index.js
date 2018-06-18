import axios from 'axios';
import { reset } from 'colors';
import config from '../config';


const baseURI = `http://${config.ADJACENT_SLAVE_NODES_HOST}:`
const api = {
    getVehicleTurn: (destinationNodeId, seconds, fromNodeId) => getVehicleTurn(destinationNodeId, seconds, fromNodeId)
}


async function getVehicleTurn(destinationNodeId, seconds, fromNodeId) {

    return await axios({
        method: 'get',
        url: `${baseURI + destinationNodeId}/node/data`,
        params: {
            seconds: seconds, fromNodeId: fromNodeId, throughNodeId: config.HOST_ID
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