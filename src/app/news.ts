export class News {

    id: string;
    title: string;
    description: string;
    date: string;
    created: Date;
    updated: Date;
    

    constructor(id, title, description, date, updated) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.date = date;
        this.updated = updated;
    }
}
