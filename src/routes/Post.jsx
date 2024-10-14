import { useLoaderData } from "react-router-dom";

export default function Post() {
  const post = useLoaderData();

  return (
    <div className="post-page">
      <h1>{post.title}</h1>
      <h4>By {post.user.name}</h4>

      <p>{post.body}</p>

      <h3>Comments</h3>
      <ol>
        {post.comments.map((comment) => {
          return <li key={comment.id}>{comment.body}</li>;
        })}
      </ol>
    </div>
  );
}
