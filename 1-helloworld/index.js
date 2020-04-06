const express = require('express');
const app = express();
const port = 3000;

let users = [
    {id: 1, name: 'Thinh'},
    {id: 2, name: 'Hung'},
    {id: 3, name: 'Tai'},
    {id: 4, name: 'Thien'},
]

app.set('view engine', 'pug');
app.set('views', './views');

app.get('/', function (req, res) {
    res.render('index',{    // path & object{key: val,...}
        name: 'AAA',
    });
});

app.get('/users', function (req, res) {
    res.render('users/index', {
        users
    });
});

app.get('/users/search', function (req, res) {
    let name = req.query.name;
    let foundUSers = users.filter((user) =>{
        return (user.name.toLowerCase().includes(name.toLowerCase())) ? user : undefined;
    });
    res.render('users/index',{
        users : foundUSers
    });
});


app.listen(port, () => console.log(`Example app listening on port ${port}`));

