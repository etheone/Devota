export class Device {

    id: string;
    name: string;
    description: string;
    created: Date;
    

    constructor(id, name, description) {
        this.id = id;
        this.name = name;
        this.description = description;

    }
}
