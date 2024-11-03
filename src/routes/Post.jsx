import { useLoaderData, useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";

export default function Post() {
  const post = useLoaderData();
  const navigate = useNavigate();

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

      <button
        type="button"
        className="btn btn-danger"
        onClick={() => {
          const isDeleteConfirmed = window.confirm(
            "Are you sure you want to delete this post?"
          );

          if (isDeleteConfirmed) {
            fetch(`/posts/${post.id}`, {
              method: "DELETE",
            }).then(() => {
              navigate("/");
              toast.success("Your post was successfully deleted.");
            });
          }
        }}
      >
        Delete
      </button>
      <Link to={`/posts/${post.id}/edit`} className="btn btn-primary mx-3">
        Update
      </Link>
    </div>
  );
}
