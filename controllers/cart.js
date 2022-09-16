const {MongoClient} = require('mongodb')

const {Router} = require('express')
const url = 'mongodb://0.0.0.0:27017/';
const bodyParser = require('body-parser')
const urlencodedParser = bodyParser.urlencoded({ extended: false })
const axios = require('axios')
const cart = new Router();
//if (typeof localStorage === "undefined" || localStorage === null) {
    const LocalStorage = require('node-localstorage').LocalStorage;
    localStorage = new LocalStorage('./scratch');
  //  console.log('Всі ключіfdfsffdssfdfdsfdsfdssfdsfd');
//}else {console.log('Всі ключі');}

cart.get('/cart', function (req, res) {


    MongoClient.connect(url, function (err, db) {
        if (err) throw res.sendStatus(500);
        let dbo = db.db('shop');
        const keys = [];
        const items = [];
        dbo.collection('product').find().toArray(function (err, result) {
            if (err) throw res.sendStatus(500);
            let objBase = [];
            if(localStorage.key(0) !== null){

               for(let i = 0; i<localStorage.length; i++){
                   keys.push(localStorage.key(i));


               }
            }
            for (let o = 0; o<localStorage.length; o++){
            for (let j = 0; j < result.length; j++) {
                if (':' + result[j]._id === keys[o]) {
                    result[j].count = localStorage.getItem(keys[o]);
                    objBase.push(result[j]);
                }
            }
            }
            res.render('cart', {product: objBase})
        })
    })
})
cart.post('/cart', urlencodedParser, function (req, res) {
  console.log(req.body);
  if(req.body.conf !== null){

      let x = req.body.inputValue;
      console.log('Id товару', req.body.conf);
      localStorage.setItem((':' + req.body.conf), x);
  }
    if(req.body.onePlus !== null){
      let y =  localStorage.getItem((':' + req.body.onePlus));
      y = +y + 1;
      localStorage.setItem((':' + req.body.onePlus), y);
    }

    if(req.body.oneMin !== null){
        let x =  localStorage.getItem((':' + req.body.oneMin));
        x = +x - 1;
        localStorage.setItem((':' + req.body.oneMin), x);
    }

    const remove = ':' + req.body.butDelete;
    localStorage.removeItem(remove);
    MongoClient.connect(url, function (err, db) {
        if (err) throw res.sendStatus(500);
        let dbo = db.db('shop');
        const keys = [];
        const items = [];
        dbo.collection('product').find().toArray(function (err, result) {
            if (err) throw res.sendStatus(500);
            let objBase = [];
            if(localStorage.key(0) !== null){
                for(let i = 0; i<localStorage.length; i++){
                    keys.push(localStorage.key(i));
                }
            }
            for (let o = 0; o<localStorage.length; o++){
                for (let j = 0; j < result.length; j++) {
                    if (':' + result[j]._id === keys[o]) {
                        result[j].count = localStorage.getItem(keys[o]);
                        objBase.push(result[j]);
                    }
                }
            }

            res.render('cart', {product: objBase})
        })
    })
})
module.exports = cart