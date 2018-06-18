// import { getDbConnection } from "../../infranstructures/mongodb";
import NodeDataModel from "../../models/NodeDataModel";
import NodeDataRepository from "../../repository/NodeDataRepository"
export default class NodeDataRepositoryService {
    constructor(
        // nodeDataModel: NodeDataModel,
        nodeDataRepository: NodeDataRepository,
    ) {
        // this.nodeDataModel = nodeDataModel;
        this.nodeDataRepository = nodeDataRepository;
        // this.memberRepository = memberRepository;

        // this.filterMembershipByMember = this.filterMembershipByMember.bind(this);
        // this.filterMembershipByCompany = this.filterMembershipByCompany.bind(this);
        // this.getMangagerMembership = this.getMangagerMembership.bind(this);
        // this.getMembership = this.getMembership.bind(this);
        // this.getCompanyMembers = this.getCompanyMembers.bind(this);
        // this.join = this.join.bind(this);
    }

    // async getLatestDataByDirection(from: string, to: string): NodeDataModel {
    //     return await this.nodeDataRepository.getByFromAndTo({ from, to }).sort((a, b) => { moment.max(a.updatedAt, b.updatedAt) })[0]
    // }
}