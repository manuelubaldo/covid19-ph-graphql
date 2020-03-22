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
const PORT = process.env.PORT || 3000;
server.listen({ port: PORT }).then(({ url }) => {
  console.log(`Listening at ${url}`);
});
