import { join } from "path";
import { max } from "moment";

export default class Direction {
    id: String;
    currentGreen: number;
    currentRed: number;

    /*
    For South-North direction, 
        - First value is South, second value is North  
    For East-West direction, first value is 
        - First value is East, second value is West
    */
    directionFromList: Array<DirectionFrom>;
    // currentV: number;

    constructor(id: String, directionFromList: Array<DirectionFrom>) {
        this.id = id;
        this.directionFromList = directionFromList;
    }

    updateInfo(info: Object) {

        this.directionFromList.forEach(x => x.updateInfo(info))
        //Update info tor this Direction1
    }

    getMax() {
        return Math.max(this.directionFromList.forEach(directionFromList.getMax()))
    }


    // updateF(currentVehDir: number, vehTurn: number) {
    //     this.currentF = vehTurn / currentVehDir;
    // }

}