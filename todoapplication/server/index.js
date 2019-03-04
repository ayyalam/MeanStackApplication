var express = require("express");
var app = express();
const path = require('path');
const bodyParser = require('body-parser');

var todos = require('./routes/todos');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use('/', todos);

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});
