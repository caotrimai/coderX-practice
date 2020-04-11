const db = require('../db');

module.exports = {
    getProducts: (req, res) => {
        let page = 1;
        let perPage = 3;
        page = (req.query.page) ? parseInt(req.query.page) : page;
        perPage = (req.query.perPage) ? parseInt(req.query.perPage) : perPage;
        let products = db.get('products').value();
        let totalPages = Math.ceil(products.lenth/perPage);
        res.render('product/index', {
            products : products.slice((page-1)*perPage, page*perPage),
            totalPages,
            perPage,
            page,
        });
    }
}