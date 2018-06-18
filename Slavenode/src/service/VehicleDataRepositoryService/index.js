// import { getDbConnection } from "./../../infranstructures/mongodb";
import VehicleDataModel from "../../models/VehicleDataModel";
import VehicleDataRepository from "../../repository/VehicleDataRepository"

export default class VehicleDataRepositoryService {
    constructor(
        cycleDataRepository: VehicleDataRepository,
    ) {
        this.cycleDataRepository = cycleDataRepository;
        this.getVehicleInSeconds = this.getVehicleInSeconds.bind(this);
    }

    getVehicleInSeconds(seconds: number) {

    }
}