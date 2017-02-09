export class Data {
    id: string;
    data: {};
    created: Date;
    updated: Date;
    deviceId: string;
    

    constructor(id, data, created, updated, deviceId) {
        this.id = id;
        this.data = data;
        this.created = created;
        this.updated = updated;
        this.deviceId = deviceId;

    }
}
