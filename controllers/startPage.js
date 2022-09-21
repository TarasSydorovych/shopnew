const { MongoClient } = require('mongodb')
const { Router } = require('express')
const url = 'mongodb://0.0.0.0:27017/'
const startPage = new Router();

startPage.get('/', function (req, res) {

    MongoClient.connect(url, function (err, db) {
        if (err) throw res.sendStatus(500);
        let dbo = db.db('shop')

        dbo.collection('product')
            .find()
            .toArray(function (err, result) {
                let objBase = {}

                console.log()
                res.render('index', { jas: result })
            })
    })
})
module.exports = startPage