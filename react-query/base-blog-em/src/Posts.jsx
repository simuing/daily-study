import { useState } from "react";

import { PostDetail } from "./PostDetail";
import { useQuery } from "react-query";

const maxPostPage = 10;

async function fetchPosts() {
  const response = await fetch(
    "https://jsonplaceholder.typicode.com/posts?_limit=10&_page=0"
  );
  return response.json();
}

export function Posts() {
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedPost, setSelectedPage] = useState(null);

  const { data, isError, error, isLoading } = useQuery("posts", fetchPosts, { staleTime: 2000 });
  if (isLoading) return <div>is loading...</div>
  if (isError) return <div>is error... <br />{error.toString()}</div>

  return (
    <>
      <ul>
        {data.map((post) => (
          <li
            key={post.id}
            className="post-title"
            onClick={() => setSelectedPage(post)}
          >
            {post.title}
          </li>
        ))}
      </ul>

      <div className="pages">
        <button
          disabled
          onClick={() => {
            // TODO
          }}>
          Next page
        </button>
      </div>
      <hr />
      {selectedPost && <PostDetail post={selectedPost} />}
    </>
  );
}

