## Pagination
- Track current page in component state (`currentPage`)
- Use query keys that include the page number ["`posts`", `currentPage`]
  - update `currentPage` state
  - fire off new query

## Prefetching
- Prefetch
  - adds data to cache
  - automatically stale (configurable)
  - shows while re-fetching
    - as long as cache hasn't expired
- Prefetching can be used for any anticipated data needs
  - not just pagination
- https://tanstack.com/query/v4/docs/react/reference/QueryClient#queryclientprefetchquery

## Mutations
- Mutation: making a network call that changes data on the server
  - jsonplaceholder API doesn't change server
  - go through the mechanics of making the change
- Day Spa app will demonstrate showing changes to user:
  - Optimistic updates (assume change will happen)
  - Update React Query cache with data returned from the server
  - Trigger re-fetch of relevant data (invalidation)

#### useMutation
- Similar to useQuery, but:
  - returns `mutate` function
  - doesn't need query key
  - `isLoading` but no `isFetching`
  - by defualt, no retries (configurable!)

- https://react-query.tanstack.com/guides/mutations