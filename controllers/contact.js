const {MongoClient} = require('mongodb')
const {Router} = require('express')
const url = 'mongodb://0.0.0.0:27017/'
const bodyParser = require('body-parser')
const urlencodedParser = bodyParser.urlencoded({ extended: false })
const contact = new Router()

contact.get('/contacts', function (req, res){
    res.render('contacts')
})
contact.post('/contacts', urlencodedParser, function (req, res) {
  if(!req.body) return res.sendStatus(500)

    MongoClient.connect(url, function (err, db){
        let user = req.body;
        const dbo = db.db('shop');
        const col = dbo.collection('users');
        if(err) return res.sendStatus(500);
        col.insertOne(user, function (err, res){
            console.log(req.body);
            db.close();

        })
        res.render('contacts')
    })

} )
module.exports = contact