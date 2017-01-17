var fs = require('fs');

function processNamespaces(route_path, express, app, io) {
    var fullPath = __dirname + "/../namespaces" + route_path;

    fs.readdirSync(fullPath).forEach(function (file) {
        var filepath = fullPath + file;

        fs.stat(filepath, function (err, stat) {
            if (stat) {
                if (stat.isDirectory()) {
                    processNamespaces(route_path + file + "/", express, app, io);
                } else {
                    var router = express.Router();
                    app.use(route_path, router);

                    var nsp = io.of(route_path);

                    require(filepath)(router, nsp);
                }
            }
        });
    });
}

module.exports = processNamespaces;