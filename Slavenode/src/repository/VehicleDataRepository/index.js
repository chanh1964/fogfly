import { getDbConnection } from "../../infranstructures/mongodb";
import VehicleDataModel from "../../models/VehicleDataModel";
export default class VehicleDataRepository {
    static Table_name = "vehicle.data"
    constructor() {
        this.save = this.save.bind(this);
        // this.getVehicleInSecondsInDirection = this.getVehicleInSecondsInDirection.bind(this);
    }

    async save(vehicleDataModel: VehicleDataModel) {
        const conn = getDbConnection();
        vehicleDataModel.updated();
        // console.log(vehicleDataModel.currentNode)
        await conn.collection(VehicleDataRepository.Table_name).updateOne({ carId: vehicleDataModel.carId }, {
            $set: { updatedAt: new Date() }, $setOnInsert: (() => { delete vehicleDataModel.updatedAt; return vehicleDataModel })()
        }, { upsert: true });
        // await conn
        //     .collection(VehicleDataModel.Table_name)
        //     .update({ id: vehicleDataModel.id }, vehicleDataModel, { upsert: true });
    }

    async getVehicleInSecondsInDirection(seconds: number, fromNodeId: String, toNodeId: String): Array<VehicleDataModel> {
        const conn = getDbConnection();
        const timeTo = new Date();
        const timeFrom = new Date();
        timeTo.setTime(timeFrom.getTime() - seconds * 1000);
        return await conn.collection(VehicleDataRepository.Table_name).find({ updatedAt: { $gt: timeTo, $lt: timeFrom }, fromNodeId: { $eq: fromNodeId } }).toArray();

    }

    // async getByPeriod(period: moment): Array<VehicleDataModel> {
    //     const conn = getDbConnection();
    //     return await conn
    //         .collection(VehicleDataModel.Table_name)
    //         .find({ period });
    // }

    // async getByFromAndTo(from: String, to: String): Array<VehicleDataModel> {
    //     const conn = getDbConnection();
    //     return await conn.collection(VehicleDataModel.Table_name).find({ from, to })
    // }


}
