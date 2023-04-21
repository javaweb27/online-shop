const maxResults = 3

export const paginateItems = (page: number, myItems: unknown[]) => {
  const totalPages = Math.ceil(myItems.length / maxResults)

  if (page < 1) {
    page = 1
  } else if (page > totalPages) {
    page = totalPages
  }

  const start = (page - 1) * maxResults
  const end = page * maxResults

  const next = end < myItems.length ? page + 1 : null
  const previous = start > 0 ? page - 1 : null

  return {
    totalPages,
    current: page,
    next,
    previous,
    results: myItems.slice(start, end),
  }
}
