const { gql } = require("apollo-server");

const typeDefs = gql`
  type Query {
    cases(
      pageSize: Int
      pageNum: Int
      sortBy: SortFields
      sortDirection: SortDirection
    ): CaseResult!
    case(id: Int): Case
  }

  enum SortFields {
    id
    caseNum
    age
    gender
    nationality
    residence
    travelHistory
    symptoms
    confirmed
    hospital
    status
  }

  enum SortDirection {
    asc
    desc
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

  type CaseResult {
    totalCount: Int!
    totalPages: Int!
    pageSize: Int!
    cases: [Case]!
  }
`;
module.exports = typeDefs;
