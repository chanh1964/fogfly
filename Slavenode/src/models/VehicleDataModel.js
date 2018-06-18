import BaseModel from './BaseModel'

export default class VehicleDataModel extends BaseModel {
    carId: string;
    velocity: Number;
    prevNode: string;
    currentNode: string;

    constructor(carId: string, velocity: Number, prevNode: string, currentNode: string) {
        super();

        this.carId = carId;
        this.currentNode = currentNode;
        this.prevNode = prevNode;
        this.velocity = velocity;
    }
}