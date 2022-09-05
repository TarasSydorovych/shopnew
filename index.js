const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const urlencodedParser = bodyParser.urlencoded({ extended: false })
const router = express.Router()
var MongoClient = require('mongodb').MongoClient
var url = 'mongodb://0.0.0.0:27017/'
const { shops } = require('./controllers')

app.set('view engine', 'ejs')
app.use('/public', express.static('public'))
app.get('/', function (req, res) {
    MongoClient.connect(url, function (err, db) {
        if (err) throw err
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
app.get('/about', function (req, res) {
    res.render('about')
})

app.get('/shop1', function (req, res) {
    MongoClient.connect(url, function (err, db) {
        if (err) throw err
        let dbo = db.db('shop')
        let dbo1 = db.db('shop')
        dbo.collection('product')
            .find()
            .toArray(function (err, result) {
                dbo1.collection('category')
                    .find()
                    .toArray(function (err, result1) {
                        res.render('shop1', { jas: result, cat: result1 })
                    })
            })
    })
})
app.get('/shop1/:id', function (req, res) {
    MongoClient.connect(url, async function (err, db) {
        if (err) throw err
        let dbo = db.db('shop')
        let dbo1 = db.db('shop')
        let objBase

        const result1 = await dbo1.collection('category').find().toArray()
        dbo1.collection('category')
            .find()
            .toArray(function (err, result1) {
                for (let i = 0; i < result1.length; i++) {
                    console.log('результ' + result1[i]._id)
                    console.log('змінна' + req.params.id)
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

app.use('/shops', shops)

app.post('/about', urlencodedParser, function (req, res) {
    if (!req.body) return ser.sendStatus(400)
    let myobj = req.body
    MongoClient.connect(url, function (err, db) {
        if (err) throw err
        let dbo = db.db('shop')

        dbo.collection('users').insertOne(myobj, function (err, res) {
            if (err) throw err
            console.log('1 document inserted', req.body)
            db.close()
        })
    })

    res.render('about-add', { data: req.body })
})

app.get('/product/:id', function (req, res) {
    MongoClient.connect(url, function (err, db) {
        if (err) throw err
        let dbo = db.db('shop')

        dbo.collection('product')
            .find()
            .toArray(function (err, result) {
                let objBase
                console.log(result)
                for (let i = 0; i < result.length; i++) {
                    console.log('Id з базиf' + result[i]._id)
                    console.log('Id з силки' + req.params.id)
                    if (':' + result[i]._id === req.params.id) {
                        objBase = result[i]
                    }
                }
                console.log(objBase)
                res.render('product', { product: objBase })
            })
    })
})
//////////////////////////////////////////////////////////////////////////////////////////
app.get('/product', function (req, res) {
    res.render('product', {})
})
app.listen(3000)
