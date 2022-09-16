const shopsController = require('./shop')
const startPage = require('./startPage')
const product = require('./product')
const contact = require('./contact')
const cart = require('./cart')


module.exports = {
    cart: cart,
    contact: contact,
    product: product,
    startPage:  startPage,
    shops: shopsController,
}
