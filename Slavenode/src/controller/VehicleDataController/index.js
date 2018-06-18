import VehicleDataRepository from '../../repository/VehicleDataRepository'
import VehicleDataRepositoryService from '../../service/VehicleDataRepositoryService'
import VehicleDataModel from '../../models/VehicleDataModel'
import logger from "../../utils/logger";
import { Request, Response } from 'express'
import ResponseError from '../../utils/ResponseError'
import devTools from '../../utils/devtools'


// import { currentId } from 'async_hooks';


export default class VehicleDataController {
    vehicleDataRepository: VehicleDataRepository;
    vehicleDataRepositoryService: VehicleDataRepositoryService;
    nodeId: String;

    constructor(vehicleDataRepository: VehicleDataRepository,
        vehicleDataRepositoryService: VehicleDataRepositoryService, nodeId: String) {
        this.NodeId = nodeId;
        this.vehicleDataRepository = vehicleDataRepository;
        this.vehicleDataRepositoryService = vehicleDataRepositoryService;
        this.saveNewVehicleData = this.saveNewVehicleData.bind(this);
        this.getVehicleInSecondsInDirection = this.getVehicleInSecondsInDirection.bind(this);
    }

    //Flow 1
    async saveNewVehicleData(req: Request, res: Response, next: Function) {
        const { carId, currentNode, prevNode, velocity, timeStamp } = req.body;
        let vehicleDataToBeSaved = new VehicleDataModel(carId, velocity, prevNode, currentNode);
        try {
            await this.vehicleDataRepository.save(vehicleDataToBeSaved);
            (currentNode != this.NodeId) ? next() : res.sendStatus(200);
        } catch (e) {
            logger.debug(e);
            throw ResponseError.BadRequest("your request failed");
            next(e)
        }
    }

    async getVehicleInSecondsInDirection(req: Request, res: Response, next: Function) {
        const { seconds, fromNodeId, toNodeId } = req.query;

        // await this.vehicleDataRepository.getVehicleInSecondsInDirection(seconds, fromNodeId, toNodeId).length
        const numberOfVehicle = await this.vehicleDataRepository.getVehicleInSecondsInDirection(seconds, fromNodeId, toNodeId);
        // res.status(200).json({ numberOfVehicle })
        // next(200, { numberOfVehicle });
        next();

        // next(200, { numberOfVehicle })
    }

}