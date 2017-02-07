export class Data {
    id: string;
    name: string;
    description: string;
    created: Date;
    updated: Date;
    

    constructor(id, name, description, updated) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.updated = updated;

    }
}
