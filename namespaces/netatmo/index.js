var bootstrapNamespace = function (webserver, ioNamespace) {
    var bodyParser = require('body-parser');

    webserver.use(bodyParser.json());

    webserver.post('/', function (req, res) {
        var requestData = req.body;

        if (requestData && requestData.home_id) {
            ioNamespace.in(requestData.home_id).emit('alert', requestData);
        }

        res.writeHead(200);
        res.end("OK");
    });

    webserver.get('/', function (req, res) {
        res.writeHead(200);
        res.end("Netatmo");
    });

    ioNamespace.on('connection', function (socket) {
        socket.on('registerHome', function (homeId) {
            socket.join(homeId);
        });
    });
};

module.exports = bootstrapNamespace;