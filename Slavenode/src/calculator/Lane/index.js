export default class Lane {
    id: String;
    currentFInLane: number;
    currentFInDirectionFrom: number;
    currentS: Array<int>;
    currentV: number;

    constructor(id: String) {
        this.id = id;
        this.currentFInLane = 0.5;
        this.currentFInDirectionFrom = 0.5;
        this.currentV = 0;
        this.updateF = this.updateF.bind(this);
        this.updateFInDirectionFrom = this.updateFInDirectionFrom.bind(this);
        this.updateV = this.updateV.bind(this);
    }


    updateInfo(info: Object): VoidFunction {
        // console.log(info);
        // console.log(info.currentVehDir);

        const { currentVehDir, currentVehLane, vehTurn } = info;
        this.updateF(currentVehLane, vehTurn);
        this.updateFInDirectionFrom(currentVehDir, currentVehLane);
        // console.log("lane");
        //do some update for this intersection
    }

    updateF(currentVehLane: number, vehTurn: number) {
        this.currentFInLane = vehTurn / currentVehLane;
        // console.log(this.currentFInLane)
    }
    updateFInDirectionFrom(currentVehDir: number, currentVehLane: number) {
        this.currentFInDirectionFrom = currentVehLane / currentVehDir;
        // console.log(this.currentFInDirectionFrom)
    }
    updateV(currentV: number) {
        this.currentV = currentV;
        // console.log(this.currentV)

    }


}