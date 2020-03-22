module.exports.paginate = (
  pageSize,
  pageNum,
  sortBy,
  sortDirection,
  results
) => {
  results = results.sort((case1, case2) => {
    if (case1[sortBy] < case2[sortBy]) {
      return -1;
    }
    if (case1[sortBy] > case2[sortBy]) {
      return 1;
    }
    return 0;
  });

  if (sortDirection === "desc") {
    results = results.reverse();
  }
  const index = pageSize * pageNum - pageSize;
  const sortedResults = results.slice(index, index + pageSize);

  return {
    cases: sortedResults,
    totalCount: results.length,
    totalPages: Math.ceil(results.length / pageSize),
    pageSize
  };
};
