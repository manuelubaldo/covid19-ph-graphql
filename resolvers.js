module.exports = {
  Query: {
    cases: async (_, __, { dataSources }) => {
      return await dataSources.caseApi.getAllCases();
    },
    case: async (_, { id }, { dataSources }) => {
      return await dataSources.caseApi.getCase(id);
      //return {};
    }
  }
};
