const menu = require('../data/menu');

function getProduct(id) {
    return menu.find(product => product.id === id);
}

module.exports = getProduct;