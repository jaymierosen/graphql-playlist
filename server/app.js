const express = require ('express');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema/schema');
const app = express();
const port = 4000;
// handling graphql requests
app.use('/graphql', graphqlHTTP({
  // pass a schema model through this request
  schema: schema,
  graphiql: true
}));
app.listen(port, () => {
  console.log(`port ${port} working`)
});