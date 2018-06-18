import NodeDataRepository from '../repository/NodeDataRepository'
import config from '../config'
import Intersection from '../calculator/Intersection'
import logger from '../utils/logger/'
class Calculator {
    // static calculator: Calculator;
    intersection: Intersection;
    nodeDataRepository: NodeDataRepository
    lostTime: number
    constructor(intersection: Intersection, nodeDataRepository: NodeDataRepository) {
        this.intersection = intersection;
        this.nodeDataRepository = nodeDataRepository;
        this.lostTime = 8;
        this.updateCycleLength = this.updateCycleLength.bind(this);
    }


    updateInfo(info: Object): VoidFunction {
        this.intersection.updateInfo(info);
        //do some update for this calculator
    }
    // updateF(currentVehDir: number, vehTurn: number) {
    //     this.currentF = vehTurn / currentVehDir;
    // }

    async updateCycleLength() {
        return await this.updateV();
    }
    async updateV() {
        var a = (await this.nodeDataRepository.getVehicleInSecondsFromDirection(6000, config.EAST_NODE_ID)).length;
        var b = this.intersection.directionList[0].directionFromList[0].laneList[0].currentFInDirectionFrom;
        this.intersection.directionList[0].directionFromList[0].laneList[0].updateV(a * b);

        a = (await this.nodeDataRepository.getVehicleInSecondsFromDirection(6000, config.EAST_NODE_ID)).length;
        b = this.intersection.directionList[0].directionFromList[0].laneList[1].currentFInDirectionFrom;
        this.intersection.directionList[0].directionFromList[0].laneList[1].updateV(a * b);

        a = (await this.nodeDataRepository.getVehicleInSecondsFromDirection(6000, config.WEST_NODE_ID)).length;
        b = this.intersection.directionList[0].directionFromList[1].laneList[0].currentFInDirectionFrom;
        this.intersection.directionList[0].directionFromList[1].laneList[0].updateV(a * b);

        a = (await this.nodeDataRepository.getVehicleInSecondsFromDirection(6000, config.WEST_NODE_ID)).length;
        b = this.intersection.directionList[0].directionFromList[1].laneList[1].currentFInDirectionFrom;
        this.intersection.directionList[0].directionFromList[1].laneList[1].updateV(a * b);

        a = (await this.nodeDataRepository.getVehicleInSecondsFromDirection(6000, config.SOUTH_NODE_ID)).length;
        b = this.intersection.directionList[1].directionFromList[0].laneList[0].currentFInDirectionFrom;
        this.intersection.directionList[1].directionFromList[0].laneList[0].updateV(a * b);

        a = (await this.nodeDataRepository.getVehicleInSecondsFromDirection(6000, config.SOUTH_NODE_ID)).length;
        b = this.intersection.directionList[1].directionFromList[0].laneList[1].currentFInDirectionFrom;
        this.intersection.directionList[1].directionFromList[0].laneList[1].updateV(a * b);

        a = (await this.nodeDataRepository.getVehicleInSecondsFromDirection(6000, config.NORTH_NODE_ID)).length;
        b = this.intersection.directionList[1].directionFromList[1].laneList[0].currentFInDirectionFrom;
        this.intersection.directionList[1].directionFromList[1].laneList[0].updateV(a * b);


        a = (await this.nodeDataRepository.getVehicleInSecondsFromDirection(6000, config.NORTH_NODE_ID)).length;
        b = this.intersection.directionList[1].directionFromList[1].laneList[1].currentFInDirectionFrom;
        this.intersection.directionList[1].directionFromList[1].laneList[1].updateV(a * b);

        const maxVEW = Math.max(this.intersection.directionList[0].directionFromList[0].laneList[0].currentV,
            this.intersection.directionList[0].directionFromList[0].laneList[1].currentV,
            this.intersection.directionList[0].directionFromList[1].laneList[0].currentV,
            this.intersection.directionList[0].directionFromList[1].laneList[1].currentV,
        );

        const maxVSN = Math.max(this.intersection.directionList[1].directionFromList[0].laneList[0].currentV,
            this.intersection.directionList[1].directionFromList[0].laneList[1].currentV,
            this.intersection.directionList[1].directionFromList[1].laneList[0].currentV,
            this.intersection.directionList[1].directionFromList[1].laneList[1].currentV,
        );

        const fInLaneFEa = this.intersection.directionList[0].directionFromList[0].laneList[0].currentFInLane;
        const fInLaneFEb = this.intersection.directionList[0].directionFromList[0].laneList[1].currentFInLane;

        const fInLaneFWa = this.intersection.directionList[0].directionFromList[1].laneList[0].currentFInLane;
        const fInLaneFWb = this.intersection.directionList[0].directionFromList[1].laneList[1].currentFInLane;

        const fInLaneFSa = this.intersection.directionList[1].directionFromList[0].laneList[0].currentFInLane;
        const fInLaneFSb = this.intersection.directionList[1].directionFromList[0].laneList[1].currentFInLane;

        const fInLaneFNa = this.intersection.directionList[1].directionFromList[1].laneList[0].currentFInLane;
        const fInLaneFNb = this.intersection.directionList[1].directionFromList[1].laneList[1].currentFInLane;


        const saturFEa = this.calculateSKimber(fInLaneFEa, 3)
        const saturFEb = this.calculateSKimber(fInLaneFEb, 3)
        const saturFWa = this.calculateSKimber(fInLaneFWa, 3)
        const saturFWb = this.calculateSKimber(fInLaneFWb, 3)

        const saturFSa = this.calculateSKimber(fInLaneFSa, 4)
        const saturFSb = this.calculateSKimber(fInLaneFSb, 4)
        const saturFNa = this.calculateSKimber(fInLaneFNa, 4)
        const saturFNb = this.calculateSKimber(fInLaneFNb, 4)

        // console.log(fInLaneFEa);
        // console.log(fInLaneFEb);

        // console.log(fInLaneFWa);
        // console.log(fInLaneFWb);

        // console.log(fInLaneFSa);
        // console.log(fInLaneFSb);

        // console.log(fInLaneFNa);
        // console.log(fInLaneFNb);

        const maxSEW = Math.max(saturFEa,
            saturFEb,
            saturFWa,
            saturFWb);



        const maxSSN = Math.max(saturFSa,
            saturFSb,
            saturFNa,
            saturFNb,
        );

        // console.log('maxS', maxSEW)
        // console.log('maxV', maxVEW)

        // console.log('maxS', maxSSN)
        // console.log('maxV', maxVSN)


        const cycle = (6.8 / (0.85 - (maxVEW / maxSEW + maxVSN / maxSSN)));
        // console.log('cycle ', cycle)


        const g1 = this.calculateGreen(cycle, maxVEW, maxVSN);
        // console.log('g1 ', g1)

        const g2 = this.calculateGreen(cycle, maxVSN, maxVEW);
        // console.log('g2 ', g2)
        const returnObject = {
            cycle: cycle,
            green1: g1,
            red1: cycle - g1,
            green2: g2,
            red2: cycle - g2
        }


        // log demo co dau
        // logger.info(
        //     `\n================= FLOW 3 =================\n 
        //     Id node hien tai: ${config.HOST_ID} \n 
        //     Chu ky den: ${returnObject.cycle}
        //     Thoi gian den xanh hướng Đông - Tây: ${returnObject.g1}
        //     Thoi gian den đỏ hướng Dong - Tay: ${returnObject.r1}
        //     Thoi gian den xanh huong Bac - Nam: ${returnObject.g2}            
        //     Thoi gian den đỏ huong Bac - Nam: ${returnObject.r2}            
        //     \n=================   END   =================`);

        logger.info(
            `\n================= FLOW 3 =================\n 

            Id node hien tai: ${config.HOST_ID}

        - Chu ky den: ${returnObject.cycle}

        - Thoi gian den xanh huong Dong - Tay: ${returnObject.green1}

        - Thoi gian den do huong Dong - Tay: ${returnObject.red1}

        - Thoi gian den xanh huong Bac - Nam: ${returnObject.green2}            

        - Thoi gian den do huong Bac - Nam: ${returnObject.red2}   

            \n=================   END   =================`);

        // console.log(returnObject)
        return returnObject;
        // this.intersection.directionList[0].directio
        // console.log(this.intersection.directionList[0].directionFromList[0].laneList[0].udate);
    }
    async getV() {
        const a = (await this.nodeDataRepository.getVehicleInSecondsFromDirection(6000, config.WEST_NODE_ID)).length;
        // console.log(a);
    }

    calculateSKimber(f, roadWidth) {
        return (1615 + 100 * roadWidth) / (1 + f / 5);

    }

    calculateGreen(cycle, maxV1, maxV2) {
        return (cycle - this.lostTime) * maxV1 / (maxV1 + maxV2)
    }
}


export { Calculator }; 