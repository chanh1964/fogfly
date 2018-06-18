const config = {
    '99Node': { port: 7099, id: '99Node', adjNodeIds: ['100Node', '101Node', '102Node', '103Node'] },
    '100Node': { port: 7100, id: '100Node', adjNodeIds: ['99Node'] },
    '101Node': { port: 7101, id: '101Node', adjNodeIds: ['99Node'] },
    '102Node': { port: 7102, id: '102Node', adjNodeIds: ['99Node'] },
    '103Node': { port: 7103, id: '103Node', adjNodeIds: ['99Node'] },
    HOST: 'localhost',
    MASTER_PORT: '7104',
    SLAVE_NODE_99_HOST: process.argv[2],
    OTHER_SLAVE_NODES_HOST: process.argv[3],
}
export default config;