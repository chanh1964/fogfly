

process.argv.forEach(function (val, index, array) {
    // console.log(index + ': ' + val);
});

const config = {
    PORT: process.argv[2],
    HOST_ID: process.argv[3],
    MONGO_PORT: process.argv[4],
    HOST: process.argv[5],
    ADJACENT_SLAVE_NODES_HOST: process.argv[6],
    MONGO_DB_NAME: `${process.argv[3]}dragonfly`,
    WEST_NODE_PORT: '7100',
    NORTH_NODE_PORT: '7101',
    SOUTH_NODE_PORT: '7103',
    EAST_NODE_PORT: '7102',

    WEST_NODE_ID: '100Node',
    NORTH_NODE_ID: '101Node',
    EAST_NODE_ID: '102Node',
    SOUTH_NODE_ID: '103Node',
}

export default config;