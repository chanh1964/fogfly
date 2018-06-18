import BaseModel from './BaseModel.js'
export default class CycleDataModel extends BaseModel {
    fromNodeId: string;
    toNodeId: string;
    f: Number;
    period: Date;

    constructor(fromNodeId: string, toNodeId: string, f: Number, period: Date) {
        super();
        this.fromNodeId = fromNodeId;
        this.toNodeId = toNodeId;
        this.f = f;
        this.period = period;
        // console.log(fromNodeId)
    }
}
