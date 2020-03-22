const { paginate } = require("./utils");

module.exports = {
  Query: {
    cases: async (
      _,
      { pageSize = 20, pageNum = 1, sortBy = "id", sortDirection = "asc" },
      { dataSources }
    ) => {
      const cases = await dataSources.caseApi.getAllCases();
      return paginate(pageSize, pageNum, sortBy, sortDirection, cases);
    },
    case: async (_, { id }, { dataSources }) => {
      return await dataSources.caseApi.getCase(id);
    }
  }
};
