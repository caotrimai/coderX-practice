const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync('db.json');
const shortid = require('shortid');

db = low(adapter);

db.defaults({ posts: [], user: {} }).write();

module.exports = db