export default class DirectionFrom {
    id: String;
    currentVehDir: number;
    //First value is inner lane (a) -> turn left; second value is outter lane (b) -> turn right
    laneList: Array<Lane>;
    // currentV: number;

    constructor(id: String, laneList: Array<Lane>) {
        this.id = id;
        this.laneList = laneList;
    }


    updateInfo(info: Object): VoidFunction {
        // console.log(info)
        const { directionFromUpdateInfo } = info;
        this.laneList.forEach(lane => {
            // console.log(directionFromUpdateInfo);
            // console.log(info.directionFromUpdateInfo[`${this.id + lane.id}`].currentVehDir);
            lane.updateInfo(directionFromUpdateInfo[`${this.id + lane.id}`]);
        });
        //do some update for this intersection
    }

    getMax() {
        return Math.max(this.directionFromList.forEach(directionFromList.getMax()))
    }

    // update(currentVehDir: number, vehTurn: number) {
    //     this.currentF = vehTurn / currentVehDir;
    // }

}