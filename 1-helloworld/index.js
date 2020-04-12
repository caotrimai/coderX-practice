require('dotenv').config();
const express = require('express');
var bodyParser = require('body-parser')
const app = express();
const port = 3000;
var userRoutes = require('./routers/user.route');
var productRoutes = require('./routers/product.router');
var authRoutes = require('./routers/auth.route');
var cartRoutes = require('./routers/cart.route');
var cookieParser = require('cookie-parser');
var sessionMiddleware = require('./middlewares/session.middleware');
const db = require('./db');

const authMiddleWare = require('./middlewares/auth.middleware');

app.use(bodyParser.urlencoded({ extended: false })) // parse application/x-www-form-urlencoded
app.use(bodyParser.json()) // parse application/json
app.use(express.static('public'));
app.use(cookieParser(process.env.SESSION_SECRET));
app.use(sessionMiddleware);

app.set('view engine', 'pug');
app.set('views', './views');

app.get('/', function (req, res) {
    res.render('index', {    // path & object{key: val,...}
        name: 'AAA',
    });
});

app.listen(port, () => console.log(`Example app listening on port ${port}`));

app.use('/users', authMiddleWare.requireAuth, userRoutes);
app.use('/products', sessionMiddleware, productRoutes);
app.use('/auth', authRoutes);
app.use('/cart', cartRoutes);


