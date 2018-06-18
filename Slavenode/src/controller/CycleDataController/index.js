import CycleDataRepository from '../../repository/CycleDataRepository'
import CycleDataRepositoryService from '../../service/CycleDataRepositoryService'
import CycleDataModel from '../../models/CycleDataModel'
import logger from "../../utils/logger";
import { Request, Response } from 'express'
import ResponseError from '../../utils/ResponseError'
import devTools from '../../utils/devtools'


export default class CycleDataController {
    cycleDataRepository: CycleDataRepository;
    cycleDataRepositoryService: CycleDataRepositoryService;

    constructor(cycleDataRepository: CycleDataRepository,
        cycleDataRepositoryService: CycleDataRepositoryService) {
        this.cycleDataRepository = cycleDataRepository;
        this.cycleDataRepositoryService = cycleDataRepositoryService;
        this.saveNewCycleData = this.saveNewCycleData.bind(this);
    }

    async saveNewCycleData(req: Request, res: Response, next: Function) {
        // logger.debug(req.body);
        const { fromNodeId, toNodeId, f, period } = req.body;
        // console.log({ fromNodeId }, { toNodeId }, { f }, { period })
        let cycleDataToBeSaved = new CycleDataModel(fromNodeId, toNodeId, f, period);
        // logger.debug(devTools.instanceToString(cycleDataToBeSaved))
        try {
            await this.cycleDataRepository.save(cycleDataToBeSaved)
            res.sendStatus(200)
        } catch (e) {
            logger.debug(e);
            throw ResponseError.BadRequest("your request failed");
            next(e)
        }
    }

}