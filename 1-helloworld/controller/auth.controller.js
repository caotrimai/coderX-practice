const shortid = require('shortid');
const db = require('../db');

module.exports = {
    login : (req, res) => {
        res.render('auth/login');
    },
    postLogin: (req, res) =>{
        let email = req.body.email;
        let password = req.body.password;

        let user = db.get('users').find({email }).value();
        if(!user){
            res.render('auth/login', {
                errors: [
                    'User does not exist.'
                ]
            });
            return;
        }
        if(user.password !== password){
            res.render('auth/login', {
                errors: [
                    'Wrong password.'
                ]
            });
            return;
        }

        res.cookie('userId', user.id, {
            signed: true
        });
        res.redirect('/users');
    }
}

