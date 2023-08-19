# Introduction to React Query

### React Query
- Server State Management for React
- Plus...
  - Loading / Error states
  - Pagination / infinite scroll
  - Prefetching
  - Mutations
  - De-duplication of requests
  - Retry on error
  - Callbacks

#### Client State vs. Server State
- Client state: information relevant to browser session
  - example: user's chosen language or theme
- Server state: information stored on server
  - example: blog post data from database

#### What problem does Reacct Query solve?
- React Query maintains cashe of server data on client
  - when you fetch server data, do it via React Query

#### React Query Manages Data
- indicate when to update cache with new data from server
  - imperatively: invalidate data
  - declaratively: configure how (e.g. window focus) & when to trigger a re-fetch
```
key: 'blog-posts'
data: [
  1: {
    title: 'React Query',
    tagLine: 'What is this thing?'
  },
  2: {
    title: 'React Query Mutations',
    tagLine: 'Not just for ninja turtles'
  }
]
staleTime: 30 seconds
```

# Prerequisites

- React
- React hooks
- For testing section: Jest and Testing Library
- IMPORTANT: This Cource was written with **React Query version 3**.
- Sample project: `/base-blog-em`

### isFetching vs isLoading
- `isFetching`
  - the async query function hasn't yet resloved
- `isLoading`
  - no cached data, plus `isFetching`

### React Query Dev Tools
- Shows queries (by key)
  - status of queries
  - last updated timestamp
- Data explorer
- Query explorer
- https://react-query.tanstack.com/devtools


### Stale Data
- Why does it matter if the data is stale?
- Data refetch only triggers for stale data
  - For example, component remount, window refocus
  - `staleTime` translates to "max age"
  - How to tolerate data potentially being out of date?

### Why is default `staleTime` set to 0?
- Tweet from Tanner Linsley, crator of React Query
  - https://twitter.com/tannerlinsley/status/1385258144549330952
  - By defaulting to a stale time of zero, we are always assuming that the data is out of date and that it needs to be re fetched from the server. That makes it mus less likely that you are going to accidentally have out of date data on the client.

### `staleTime` vs. `cacheTime`
- `staleTime` is for re-fetching
- Cache is for data that might be re-used later
  - query goes into "cold storage" if there's no active `useQuery`
  - cache data expires after `cacheTime` (default: 5 minutes)
    - how long it's been since the last active `useQuery`
  - After the cache expires, the data is garbage collected
- Cache is backup data to display while fetching
