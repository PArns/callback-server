var bootstrapNamespace = function (webserver, io) {

    webserver.post('/', function (req, res) {
        var requestData = req.body;

        if (requestData && requestData.home_id) {
            io.sockets.in(requestData.home_id).emit('alert', requestData);
        }

        res.writeHead(200);
        res.end("OK");
    });

    webserver.get('/', function (req, res) {
        res.writeHead(200);
        res.end("Netatmo");
    });

    io.on('connection', function (socket) {
        socket.on('registerHome', function (homeId) {
            socket.join(homeId);
        });
    });
};

module.exports = bootstrapNamespace;