var static = require('node-static');
var fileServer = new static.Server('./public');
var port = process.env.PORT || 5000;

require('http').createServer(function (request, response) {
    request.addListener('end', function () {
        fileServer.serve(request, response, function (err, result) {
            if (err) {
                switch (err.status) {
                case 500:
                case 404:
                    fileServer.serveFile('/' + err.status + '.html', err.status, {}, request, response);
                    break;
                default:
                    // Respond to the client
                    response.writeHead(err.status, err.headers);
                    response.end();
                }
            }
        });
    }).resume();
}).listen(port);

