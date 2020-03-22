require("dotenv").config();
const { ApolloServer } = require("apollo-server");
const typeDefs = require("./schema");
const resolvers = require("./resolvers");
const CasesAPI = require("./datasource/cases");

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({
    caseApi: new CasesAPI()
  })
});

server.listen().then(({ url }) => {
  console.log(`Listening at ${url}`);
});
