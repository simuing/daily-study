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

