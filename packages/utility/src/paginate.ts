export interface PaginationResult {
  skip: number;
  take: number;
}

function paginate(limit: number, pageNumber: number): PaginationResult {
  return {
    skip: (pageNumber - 1) * limit,
    take: limit,
  };
}

export default paginate;
