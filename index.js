var express = require('express');
var app = express();
var server = require('http').Server(app);

var io = require('socket.io')(server);

var port = process.env.PORT || 8080;

var processNamespaces = require("./lib/namespaceProcessor");

processNamespaces("/", express, app, io);

app.all('/', function (req, res) {
    res.writeHead(200);
    res.end("Nothing to see here");
});

server.listen(port);