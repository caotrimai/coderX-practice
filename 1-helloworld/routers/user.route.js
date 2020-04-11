var express = require('express');
const router = express.Router();

const userController = require('../controller/user.controller'); 
const validate = require('../validate/user.validate');

router.get('/', userController.getUsers);

router.get('/cookie', function (req, res, next) {
    res.cookie('user-id', 12345);
    res.send('Hello');
});
router.get('/search', userController.search);

router.get('/create', userController.create);

router.post('/create', validate.postCreate, userController.postCreate);

router.get('/:id', userController.find);

module.exports = router;