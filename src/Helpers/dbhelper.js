import DataStore from 'nedb';

export default class Database {
    constructor(name){
        this.db = new DataStore({filename:`./db/${name}.db`, autoload:true})
    }

    // This is used for inserting 
    insert(obj) {
        return new Promise((res, rej) => {
            this.db.insert(obj, (err) => {
                if (err) rej(err);
                res();
            });
        });
    }
}