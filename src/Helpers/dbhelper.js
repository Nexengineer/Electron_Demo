import DataStore from 'nedb';

export default class Database {
    constructor(name){
        this.db = new DataStore({filename:`./db/${name}.db`, autoload:true});
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

    findUsingHash(hash) {
        return new Promise((res, rej) => {
            this.db.find({ hash: hash }, (err, docs) => {
                if (err) rej(err);
                res(docs);
            });
        });
    }

    findUsingBillNo(billNo) {
        return new Promise((res, rej) => {
            this.db.find({ billNo: billNo }, (err, docs) => {
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
            this.db.update({ hash: hash},
                { $set: { 
                    mrp: mrp 
                   } },
                 { multi: true }, function (err, numReplaced) {
                    if (err) rej(err);
                    res(numReplaced)
           });
        });
    }

    updateValueHash(id, quantity, predicatedEarning, actualEarning, soldDates) {
        return new Promise((res, rej) => {
            this.db.update({ id: id},
                { $set: { 
                    quantity: quantity,
                    predicatedEarning: predicatedEarning,
                    actualEarning: actualEarning,
                    soldDates: soldDates
                   },
                 }, { multi: true }, function (err, numReplaced) {
                    if (err) rej(err);
                    res(numReplaced);
           });
        });

    }

    findUsingSoldHash(id) {
        return new Promise((res, rej) => {
            this.db.find({ id: id }, (err, docs) => {
                if (err) rej(err);
                res(docs);
            });
        });
    }
}