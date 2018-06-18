import { getDbConnection } from '../../infranstructures/mongodb';
import CycleDataModel from "../../models/CycleDataModel";
export default class CycleDataRepository {
    static Table_name = "cycle.data"

    async save(cycleDataModel: CycleDataModel) {
        const conn = getDbConnection();
        cycleDataModel.updated();
        await conn
            .collection(CycleDataRepository.Table_name)
            .update({ id: cycleDataModel.id }, cycleDataModel, { upsert: true });
    }

    async getByPeriod(period: Date): Array<CycleDataModel> {
        const conn = getDbConnection();
        return await conn
            .collection(CycleDataRepository.Table_name)
            .find({ period });
    }

    async getByFromAndTo(from: String, to: String): Array<CycleDataModel> {
        const conn = getDbConnection();
        return await conn.collection(CycleDataModel.Table_name).find({ from, to })
    }


}
