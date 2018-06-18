// const PORT = 7375

import config from '../config'
import express, { Router } from 'express';

import CycleDataRepository from '../repository/CycleDataRepository'
import CycleDataRepositoryService from '../service/CycleDataRepositoryService'
import CycleDataController from '../controller/CycleDataController'

import NodeDataRepository from '../repository/NodeDataRepository'
import NodeDataRepositoryService from '../service/NodeDataRepositoryService'
import NodeDataController from '../controller/NodeDataController'


import VehicleDataRepository from '../repository/VehicleDataRepository'
import VehicleDataRepositoryService from '../service/VehicleDataRepositoryService'
import VehicleDataController from '../controller/VehicleDataController'

import AlgorithmController from '../controller/Algorithm'

import { initConnection } from '../infranstructures/mongodb'

import Lane from '../calculator/Lane';
import DirectionFrom from '../calculator/DirectionFrom';
import Direction from '../calculator/Direction';
import Intersection from '../calculator/Intersection';

import { Calculator } from '../calculator'
import timing from '../timing/'

// import Lane from '../calculator/Lane';

// var router = express.Router();

//INIT MONGODB
initConnection({
  host: config.HOST,
  port: config.MONGO_PORT,
  database: config.MONGO_DB_NAME
});

const router = Router()
// TODO: EXPRESS
const app = express();

// TODO: TIME
const moment = require('moment');

// INIT REPOS
const nodeDataRepository = new NodeDataRepository();
const cycleDataRepository = new CycleDataRepository();
const vehicleDataRepository = new VehicleDataRepository();

// INIT SERVICES
const vehicleDataRepositoryService = new VehicleDataRepositoryService(vehicleDataRepository)
const cycleDataRepositoryService = new CycleDataRepositoryService(cycleDataRepository)
const nodeDataRepositoryService = new NodeDataRepositoryService(nodeDataRepository)

// INIT CONTROLLERS
const cycleDataController = new CycleDataController(cycleDataRepository, cycleDataRepositoryService)
const vehicleDataController = new VehicleDataController(vehicleDataRepository, vehicleDataRepositoryService, config.HOST_ID)
const nodeDataController = new NodeDataController(nodeDataRepository, nodeDataRepositoryService)

//INIT LANES
const laneFWa = new Lane('a');
const laneFWb = new Lane('b');

const laneFEa = new Lane('a');
const laneFEb = new Lane('b');

const laneFSa = new Lane('a');
const laneFSb = new Lane('b');

const laneFNa = new Lane('a');
const laneFNb = new Lane('b');

//INIT DIRECTION FROM

const directionFromW = new DirectionFrom('FW', [laneFWa, laneFWb]);
const directionFromE = new DirectionFrom('FE', [laneFEa, laneFEb]);
const directionFromS = new DirectionFrom('FS', [laneFSa, laneFSb]);
const directionFromN = new DirectionFrom('FN', [laneFNa, laneFNb]);

//INIT DIRECTION
const directionEW = new Direction('EW', [directionFromE, directionFromW]);
const directionSN = new Direction('SN', [directionFromS, directionFromN]);

//INIT NODE
const intersection = new Intersection(config.HOST_ID, [directionEW, directionSN]);

//INIT CALCULATOR
const calculator = new Calculator(intersection, nodeDataRepository);
// const calculator = Calculator.getCalculator(intersection);

// TODO: BODY-PARSER
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



//Flow 1
app.post('/vehicle/data', vehicleDataController.saveNewVehicleData, nodeDataController.saveNewNodeData);

//Flow 2
app.get('/node/data', nodeDataController.getVehicleInSecondsInDirection);

//Flow 3
app.get('/getcycle', async (req, res, next) => {
  const a = await (calculator.updateCycleLength());
  res.send(a);
})

//Flow 4
app.get('/node/data/report', nodeDataController.getReportForMaster)

//DEV ROUTE

app.post('/algorithm', AlgorithmController.setFuncToUse);

app.post('/node/data', nodeDataController.saveNewNodeData);

app.post('/cycle/data', cycleDataController.saveNewCycleData)

app.get('/vehicle/', vehicleDataController.getVehicleInSecondsInDirection);
// app.use(ResponseMiddleWare);


app.listen(config.PORT, () => {
  console.log(`\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\nSlave node ${config.HOST_ID} started on port ${config.PORT}`);
});

// config.HOST_ID == '99Node' && setTimeout(() => timing(180000, calculator), 3000);
config.HOST_ID == '99Node' && setTimeout(() => timing(3600000, calculator), 5000);


export default router;

/* GET home page. */
// router.get('/',
//   function(req, res, next) {
//     console.log(req.query.a);
//     res.render('index', { title: 'Express' });
//   }
// );

