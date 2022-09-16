const express = require('express')
const app = express();
const bodyParser = require('body-parser')
const urlencodedParser = bodyParser.urlencoded({ extended: false })
const router = express.Router()
const MongoClient = require('mongodb').MongoClient
const url = 'mongodb://0.0.0.0:27017/'
const { shops, startPage, product, contact, cart } = require('./controllers')

app.set('view engine', 'ejs')
app.use('/public', express.static('public'))
app.use(startPage);
app.use(shops);
app.use(product);
app.use(contact);
app.use(cart);

app.listen(3000)
