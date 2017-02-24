export class Advanced {

    id: string;
    title: string;
    description: string;
    created: Date;
    updated: Date;
    

    constructor(id, title, description, updated) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.updated = updated;
    }
}
