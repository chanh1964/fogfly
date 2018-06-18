import NodeDataRepository from '../../repository/NodeDataRepository'
import NodeDataRepositoryService from '../../service/NodeDataRepositoryService'
import NodeDataModel from '../../models/NodeDataModel'
import logger from "../../utils/logger";
import { Request, Response } from 'express'
import ResponseError from '../../utils/ResponseError'
import devTools from '../../utils/devtools'
import config from '../../config'


export default class NodeDataController {
    nodeDataRepository: NodeDataRepository;
    nodeDataRepositoryService: NodeDataRepositoryService;

    constructor(nodeDataRepository: NodeDataRepository,
        nodeDataRepositoryService: NodeDataRepositoryService) {
        this.nodeDataRepository = nodeDataRepository;
        this.nodeDataRepositoryService = nodeDataRepositoryService;
        this.getLatestNodeDataByDirection = this.getLatestNodeDataByDirection.bind(this);
        this.saveNewNodeData = this.saveNewNodeData.bind(this);
        this.getVehicleInSecondsInDirection = this.getVehicleInSecondsInDirection.bind(this);
        this.getReportForMaster = this.getReportForMaster.bind(this);
    }


    async getLatestNodeDataByDirection(req: Request, res: Response, next: Function) {
        const { from, to } = req.query;
        try {
            const nodeDataToReturn = await this.nodeDataRepository.getByFromAndTo(from, to);
            logger.debug(nodeDataToReturn);
            res.status(200).json(nodeDataToReturn[0]);
        } catch (e) {
            next(e);
        }
    }
    //Flow 2
    async getVehicleInSecondsInDirection(req: Request, res: Response, next: Function) {
        const { seconds, fromNodeId, throughNodeId } = req.query;
        const numberOfVehicle = (await this.nodeDataRepository.getVehicleInSecondsInDirection(seconds, fromNodeId, throughNodeId)).length;
        res.send({ numberOfVehicle });
        logger.info(
            `\n================= FLOW 2 =================\n Id node hien tai: ${config.HOST_ID}\n=================   END   =================`);

        next();
    }

    //Flow 4
    async getReportForMaster(req: Request, res: Response, next: Function) {
        const { fromNodeId, seconds } = req.query;

        const satisfiedVeh = await this.nodeDataRepository.getVehicleInSecondsFromDirection(seconds, fromNodeId);
        const reportBase = {
            vehNum: 0,
            avgVel: 10
        }
        reportBase.vehNum = satisfiedVeh.length;
        reportBase.avgVel = satisfiedVeh.length == 0 ? 0 : satisfiedVeh.reduce((acc, cur) => acc + cur.velocity, 0) / satisfiedVeh.length
        res.send(reportBase);
        logger.info(
            `\n================= FLOW 4 =================\n Id node hien tai: ${config.HOST_ID}\n=================   END   =================`);

        next();
    }

    //Flow 1 (cont)
    async saveNewNodeData(req: Request, res: Response, next: Function) {
        const { currentNode, prevNode, carId, velocity } = req.body
        let nodeDataToBeSaved = new NodeDataModel(currentNode, prevNode, carId, velocity);
        try {
            await this.nodeDataRepository.save(nodeDataToBeSaved)
            logger.info(
                `\n================= FLOW 1 =================\n 
                
            Id node hien tai: ${config.HOST_ID}
            
        - Id cua xe: ${carId} 
        
        - Van toc xe: ${velocity}
        
        - Timestamp: ${new Date()}
        
                \n=================   END   =================`);

            res.status(200).send({ currentNodeId: config.HOST_ID });
        } catch (e) {
            logger.debug(e);
            throw ResponseError.BadRequest("your request failed");
            next(e)
        }
    }
}
