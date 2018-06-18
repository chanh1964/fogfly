import uuid from "uuid/v4";
export default class BaseEntity {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    isArchived: Boolean;

    constructor() {
        // console.log("constructed")
        this.id = uuid();
        this.createdAt = new Date();
        this.updatedAt = new Date();
        this.isArchived = false;
        // console.log(this.updatedAt.toLocaleTimeString())
    }
    updated() {
        this.updatedAt = new Date();
    }
}
