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

    // This method is for getting all the docs
    find(q) {
        return new Promise((res, rej) => {
            this.db.find(q || {}, (err, docs) => {
                if (err) rej(err);
                res(docs);
            });
        });
    }

    updateQuantity(hash, quantity) {
        return new Promise((res, rej) => {
            this.db.update({ hash: hash},
                { $set: { 
                    quantity: Number(quantity) 
                   } },
                 { multi: true }, function (err, numReplaced) {
                    if (err) rej(err);
                    res(numReplaced)
           });
        });
    }

    updateMrp(hash, mrp){
        return new Promise((res, rej) => {
        });
    }
}