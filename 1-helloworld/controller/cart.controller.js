module.exports = {
    addToCart: (req, res, next) => {
        let productId = req.params.productId;
        let sessionId = req.signedCookies.sessionId;

        if (!sessionId) {
            res.redirect('/products');
            return;
        }
        let sessions = db.get('sessions');
        let count = sessions
            .find({ id: sessionId })
            .get('cart.' + productId, 0)
            .value();

        sessions.find({ id: sessionId })
            .set('cart.' + productId, count + 1)
            .write();

        let cart = sessions.find({ id: sessionId })
            .get('cart').value();
        let cartCounting = 0;

        if (cart) {
            for (const productId in cart) {
                cartCounting += cart[productId];
            }
        }

        res.cookie('cartCounting',cartCounting);
        res.redirect('/products');
    }
}