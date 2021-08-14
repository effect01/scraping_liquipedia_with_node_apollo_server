const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const { ApolloServer , gql} = require('apollo-server-express');
const scrapeIt = require("scrape-it");

const typeDefs = require('./graphql/graphql');
const resolvers = require('./graphql/resolvers');


async function startApolloServer() {
  const serverApollo = new ApolloServer({ typeDefs, resolvers });
  const app = express();
  /**
   * Get port from environment and store in Express.
   */

  var port = normalizePort(process.env.PORT || '3000');
  app.set('port', port);
  const corsOptions = {
    origin: '*',
    credentials: true
  }
  app.use(cors(corsOptions) );


 

  app.use(logger('dev'));
  app.use(express.json());
  app.use(cookieParser());
  app.use(express.static(path.join(__dirname, 'public')));

  await serverApollo.start();

  serverApollo.applyMiddleware({ app });


  app.use('/',function(req, res ) {



})



// catch 404 and forward to error handler
  app.use(function(req, res, next) {
    next(createError(404));
  });

  // error handler
  app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
  });
 


  return {app, serverApollo};
}


module.exports = startApolloServer;




	/**
	 * Normalize a port into a number, string, or false.
	 */

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}