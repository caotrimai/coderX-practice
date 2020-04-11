const shortid = require('shortid');

const db = require('../db');

module.exports = {
    getUsers: function (req, res) {
        res.render('users/index', {
            users: db.get('users').value()
        });
    },
    search: (req, res) => {
        let name = req.query.name;
        let users = db.get('users').value();
        let foundUSers = users.filter((user) => {
            return (user.name.toLowerCase().includes(name.toLowerCase())) ? user : undefined;
        });
        res.render('users/index', {
            users: foundUSers
        });
    },
    create: (req, res) => {
        res.render('users/create');
    },
    postCreate: (req, res) => {
        let user = req.body;
        user.id = shortid.generate();
        db.get('users')
            .push(user)
            .write();
        res.redirect('/users');
    },
    find: (req, res) => {
        let id = req.params.id;
        let user = db.get('users').find({ id: id }).value();
        res.render('users/detail', { user });
    }
}
