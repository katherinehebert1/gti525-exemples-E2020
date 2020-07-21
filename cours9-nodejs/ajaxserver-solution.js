// Serveur pour le client AJAX du cours sur AJAX avec logging

var http = require("http");
if (! http) process.exit(1);

var fs = require("fs");
if (! fs) process.exit(2);

var path="";
var seq=0;

var serveRequest = function(request, response) {
	if ( request.url.startsWith("/hello") ) {
		// Si c'est une requête AJAX, retourner world
		console.log( "Reçu: " + request.url );
		var fileName = path + "/req.log";
		console.log(fileName);
		fs.appendFile(fileName, "[" + seq + "]" + " " request.url + "\n", function(err) {
			if (err) console.log("Erreur d'écriture: " + fileName);
		});
		seq++;
		setTimeout( function() {
			var count = request.url.split("-")[1];
			response.write("world-" + count);
			response.statusCode = 200;
			response.end();
		}, 3000);
	} else if ( request.url.endsWith(".html") || request.url.endsWith(".js")) {
		// Si c'est un fichier HTML ou JS, récupérer et retourner le fichier demandé
		response.statusCode = 200;
		var fileName = path + request.url;
		var rs = fs.createReadStream(fileName);
		console.log("Lecture du fichier: " + fileName);
		rs.on("error", function(error) {
			console.log(error);
			response.write("Impossible de lire le fichier: " + fileName);
			response.statusCode = 404;
		});
		rs.on("data", function(data) {
			response.write(data);
		});
		rs.on("end", function() {
			response.end();
		});
	} else {
		response.write("Requête inconnue " + request.url);
		response.statusCode = 404;
		response.end();
	}
};


// Démarre le serveur sur le port demandé et configure la réponse
var port = 8080;
var server = http.createServer(serveRequest);
server.listen(port);
console.log("Démarrage du serveur sur le port: " + port);
