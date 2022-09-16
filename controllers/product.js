const {MongoClient} = require('mongodb')

const {Router} = require('express')
const url = 'mongodb://0.0.0.0:27017/';
const bodyParser = require('body-parser')
const urlencodedParser = bodyParser.urlencoded({ extended: false })
const product = new Router();
if (typeof localStorage === "undefined" || localStorage === null) {
    const LocalStorage = require('node-localstorage').LocalStorage;
    localStorage = new LocalStorage('./scratch');

}


product.get('/product/:id', function (req, res) {
    MongoClient.connect(url, function (err, db) {
        if (err) throw res.sendStatus(500);
        let dbo = db.db('shop')

        dbo.collection('product')
            .find()
            .toArray(function (err, result) {
                if (err) throw res.sendStatus(500);
                let objBase
                for (let i = 0; i < result.length; i++) {
                    if (':' + result[i]._id === req.params.id) {
                        objBase = result[i]
                    }
                }
               // console.log(objBase._id.toString());
                res.render('product', { product: objBase })
            })
    })
})
product.post('/product/:id', urlencodedParser, function (req, res){
    if(!req.body) return res.sendStatus(500);
     let data1 = req.params.id;
    let data = req.body.name;

    if(localStorage.key(0) == null){
    localStorage.setItem(data1, data);
    }else if(localStorage.getItem(data1) !== null){
        let valHt = data, valSt = localStorage.getItem(data1), sum;
        sum = +valHt + +valSt;
        localStorage.setItem(data1, sum)
    }else {localStorage.setItem(data1, data);}


    MongoClient.connect(url, function (err, db) {
        if (err) throw res.sendStatus(500);
        let dbo = db.db('shop')

        dbo.collection('product')
            .find()
            .toArray(function (err, result) {
                if (err) throw res.sendStatus(500);
                let objBase

                for (let i = 0; i < result.length; i++) {
                    if (':' + result[i]._id === req.params.id) {
                        objBase = result[i]
                    }
                }
                res.render('product', {product:  objBase})
            })
    })
})


module.exports = product