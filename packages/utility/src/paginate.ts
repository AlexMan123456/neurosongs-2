export interface PaginationResult {
  skip: number;
  take: number;
}

/** Returns an object that can be used in a Prisma query to deal with pagination
 * @param limit - The maximum number of items per page.
 * @param pageNumber - The page number to start on.
 * @returns an object that maps the inputs to an object with `skip` and `take`, which can then be spread into a Prisma query.
 */
function paginate(limit: number, pageNumber: number): PaginationResult {
  return {
    skip: (pageNumber - 1) * limit,
    take: limit,
  };
}

export default paginate;
