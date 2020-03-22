const { gql } = require("apollo-server");

const typeDefs = gql`
  type Query {
    cases: [Case]!
    case(id: Int): Case
  }

  type Case {
    id: Int!
    caseNum: String!
    age: Int
    gender: String!
    nationality: String!
    residence: String!
    travelHistory: String
    symptoms: String
    confirmed: String!
    hospital: String!
    status: String
    link: String
  }
`;
module.exports = typeDefs;
