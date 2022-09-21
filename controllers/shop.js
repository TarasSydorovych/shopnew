const { MongoClient } = require('mongodb')
const { Router } = require('express')
const url = 'mongodb://0.0.0.0:27017/'
const shopsController = new Router();

shopsController.get('/shop1', function (req, res) {

    MongoClient.connect(url, function (err, db) {
        if (err) throw res.sendStatus(500);
        let dbo = db.db('shop')
        let dbo1 = db.db('shop')
        dbo.collection('product')
            .find()
            .toArray(function (err, result) {
                if (err) throw res.sendStatus(500);
                dbo1.collection('category')
                    .find()
                    .toArray(function (err, result1) {
                        res.render('shop1', { jas: result, cat: result1 })
                    })
            })
    })
})
shopsController.get('/shop1/:id', function (req, res) {
    MongoClient.connect(url, function (err, db) {
        if (err) throw res.sendStatus(500);
        let dbo = db.db('shop')
        let dbo1 = db.db('shop')
        let objBase
        dbo1.collection('category')
            .find()
            .toArray(function (err, result1) {
                if (err) throw res.sendStatus(500);
                for (let i = 0; i < result1.length; i++) {
                    if (':' + result1[i]._id === req.params.id) {
                        objBase = result1[i].name
                    }
                }
                dbo.collection('product')
                    .find({ brand: objBase })
                    .toArray(function (err, result) {
                        res.render('shop1', { jas: result, cat: result1 })
                    })
            })
    })
})
module.exports = shopsController