const App = require("./src/app");
var debug = require('debug')('myapp:server');
var http = require('http');
//// funcion
async function main() {
	/**
	 * Listen on provided port, on all network interfaces.
	 */
    const {app , serverApollo} = await App();
     /**
   * Create HTTP server.
   */
    var server = http.createServer(app);

	server.listen(app.get("port"), () =>
		console.log(
			`Listening on port http://localhost:${app.get("port")}${serverApollo.graphqlPath}`
		)
	);

	server.on("error", onError);
	server.on("listening", onListening);

	/**
	 * Event listener for HTTP server "listening" event.
	 */

	function onListening() {
		var addr = server.address();
		var bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port;
		debug("Listening on " + bind);
	}


	/**
	 * Event listener for HTTP server "error" event.
	 */

	function onError(error) {
		if (error.syscall !== "listen") {
			throw error;
		}

		var bind = typeof port === "string" ? "Pipe " + port : "Port " + port;

		// handle specific listen errors with friendly messages
		switch (error.code) {
			case "EACCES":
				console.error(bind + " requires elevated privileges");
				process.exit(1);
				break;
			case "EADDRINUSE":
				console.error(bind + " is already in use");
				process.exit(1);
				break;
			default:
				throw error;
		}
	}
}
main();
