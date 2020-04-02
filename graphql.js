require('dotenv').config();
const { ApolloServer, gql } = require("apollo-server-lambda");
const mongoose = require('mongoose');
const typeDefs = require('./apollo/typeDefs/index')
const resolvers = require('./apollo/resolvers/index')
const config = require('./config/config');

let mongoClient = null
async function start() {
  console.log('start mongo')
  // console.log('config', config)
  console.log('ready state before connection', mongoose.connection.readyState)
  if(mongoose.connection && mongoose.connection.readyState && mongoose.connection.readyState === 1) {
    console.log('mongoose already connected')
  } else if (mongoose.connection && mongoose.connection.readyState && mongoose.connection.readyState === 2) {
    console.log('mongoose is connecting')
  } else {
    console.log('mongoose not connected')
    // console.log('mongo url', config.MONGOURL)
    mongoClient = await mongoose.connect(config.MONGOURL);
    console.log('ready state after connection', mongoose.connection.readyState)
    mongoose.connection.on('error', function(err) {
      console.log('Mongoose default connection error: ' + err);
    });
  }
  
  return true;
}
start()

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ event, context }) => ({
    headers: event.headers,
    functionName: context.functionName,
    event,
    context
  })
});

// exports.graphqlHandler = server.createHandler();

exports.graphqlHandler = (event, lambdaContext, callback) => {
  // start mongo if not already or disconnected
  start()
  // Playground handler
  if (event.httpMethod === 'GET') {
    server.createHandler()(
      {...event, path: event.requestContext.path || event.path},
      lambdaContext,
      callback,
    );
  } else {
    server.createHandler()(event, lambdaContext, callback);
  }
};


