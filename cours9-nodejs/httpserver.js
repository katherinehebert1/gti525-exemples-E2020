// Exemple d'un serveur HTTP simple écrit avec Node.JS
// Source: node.js succinctly

var http = require('http');
if (! http) throw { msg: "Module HTTP introuvable" };

// Fonction simple pour servir une requête
var serveRequest = function(request, response) {
	console.log( request.headers );
	response.setHeader("AppId", "hello");
	response.write("Bienvenue à Node.JS!");
	response.end();
};

// Démarre le serveur en passant la fonction callback
// appropriée, et écoute sur le port spécifié
var port = 8080;
var server = http.createServer(serveRequest);
server.listen(port);
console.log("Démarrage du serveur sur le port: " + port);
