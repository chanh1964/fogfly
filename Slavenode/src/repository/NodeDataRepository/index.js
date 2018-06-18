import { getDbConnection } from "../../infranstructures/mongodb";
import NodeDataModel from "../../models/NodeDataModel";
export default class NodeDataRepository {
    static Table_name = "node.data"

    async save(nodeDataModel: NodeDataModel) {
        const conn = getDbConnection();
        nodeDataModel.updated();
        await conn.collection(NodeDataRepository.Table_name).updateOne({ carId: nodeDataModel.carId }, {
            $set: { updatedAt: new Date() }, $setOnInsert: (() => { delete nodeDataModel.updatedAt; return nodeDataModel })()
        }, { upsert: true });
    }

    async getCurrentVehDirInSeconds(seconds: number): Array<NodeDataModel> {
        const conn = getDbConnection();
        const timeTo = new Date();
        const timeFrom = new Date();
        timeTo.setTime(timeFrom.getTime() - seconds * 1000);
        return await conn.collection(NodeDataRepository.Table_name).find({ updatedAt: { $gt: timeTo, $lt: timeFrom } }).toArray();

    }

    //Used to calculate veh counts to return to other fog nodes
    async getVehicleInSecondsInDirection(seconds: number, fromNodeId: String, throughNodeId: String): Array<NodeDataModal> {
        const conn = getDbConnection();
        const timeTo = new Date();
        const timeFrom = new Date();
        timeTo.setTime(timeFrom.getTime() - seconds * 1000);
        return await conn.collection(NodeDataRepository.Table_name).find({ $and: [{ updatedAt: { $gt: timeTo, $lt: timeFrom } }, { fromNodeId: { $eq: throughNodeId } }, { prevNodeId: { $eq: fromNodeId } }] }).toArray();
        // return await conn.collection(NodeDataRepository.Table_name).find({ updatedAt: { $gt: timeTo, $lt: timeFrom } }).toArray();
        // return await conn.collection(NodeDataRepository.Table_name).find({ fromNodeId: { $eq: fromNodeId } }).toArray();

    }

    //Used to calculate veh counts of each direction (ex: From West) for this node 
    async getVehicleInSecondsFromDirection(seconds: number, fromNodeId: String): Array<NodeDataModal> {
        const conn = getDbConnection();
        const timeTo = new Date();
        const timeFrom = new Date();
        timeTo.setTime(timeFrom.getTime() - seconds * 1000);
        return await conn.collection(NodeDataRepository.Table_name).find({ $and: [{ updatedAt: { $gt: timeTo, $lt: timeFrom } }, { fromNodeId: { $eq: fromNodeId } }] }).toArray();
        // return await conn.collection(NodeDataRepository.Table_name).find({ updatedAt: { $gt: timeTo, $lt: timeFrom } }).toArray();
        // return await conn.collection(NodeDataRepository.Table_name).find({ fromNodeId: { $eq: fromNodeId } }).toArray();

    }

    async getByFromAndTo(fromNodeId: String, toNodeId: String, ): Array<NodeDataModel> {
        const conn = getDbConnection();
        return await conn.collection(NodeDataRepository.Table_name).find({ fromNodeId, toNodeId }).sort({ period: 1 }).toArray()
        // return await conn.collection(NodeDataRepository.Table_name).find({ fromNodeId, toNodeId }).toArray();
    }


}
