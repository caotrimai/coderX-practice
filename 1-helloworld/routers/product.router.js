const db = require('../db');
var express = require('express');
const router = express.Router();

var productController = require('../controller/product.controller');

router.get('/', productController.getProducts);

module.exports = router;