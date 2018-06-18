import BaseModel from './BaseModel'
export default class NodeDataModel extends BaseModel {
    fromNodeId: String;
    prevNodeId: String;
    carId: String;
    velocity: number

    constructor(fromNodeId: String, prevNodeId: String, carId: String, velocity: number) {
        super();
        this.carId = carId;
        this.fromNodeId = fromNodeId;
        this.prevNodeId = prevNodeId;
        this.velocity = velocity;
    }
}