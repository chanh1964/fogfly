export default class Intersection {
    id: String;
    // currentGreen: number;
    // currentRed: number;

    //First value is East-West, second value is South-North 
    directionList: Array<Direction>;
    // currentV: number;

    constructor(id: String, directionList: Array<Direction>) {
        this.id = id;
        this.directionList = directionList;
        this.updateInfo = this.updateInfo.bind(this);
    }

    updateInfo(info: Object): VoidFunction {
        this.directionList.forEach(direction => direction.updateInfo(info));
        //do some update for this intersection
    }

    // updateF(currentVehDir: number, vehTurn: number) {
    //     this.currentF = vehTurn / currentVehDir;
    // }

}