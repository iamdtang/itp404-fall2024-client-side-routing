import { useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";

export default function EditPost() {
  const post = useLoaderData();
  const [title, setTitle] = useState(post.title);
  const [body, setBody] = useState(post.body);

  const navigate = useNavigate();

  return (
    <form
      method="post"
      onSubmit={(event) => {
        event.preventDefault();

        fetch(`/posts/${post.id}`, {
          method: "PATCH",
          body: JSON.stringify({
            title,
            body,
          }),
          headers: {
            "Content-type": "application/json",
          },
        }).then(() => {
          navigate(`/posts/${post.id}`);
        });
      }}
    >
      <div className="mb-3">
        <input
          className="form-control"
          type="text"
          name="title"
          placeholder="Title"
          value={title}
          onChange={(event) => {
            setTitle(event.target.value);
          }}
        />
      </div>
      <div className="form-floating mb-3">
        <textarea
          className="form-control"
          id="body"
          style={{ height: "100px" }}
          value={body}
          onChange={(event) => {
            setBody(event.target.value);
          }}
        />
        <label htmlFor="body">Write your post here</label>
      </div>
      <button type="submit" className="btn btn-primary">
        Save
      </button>
    </form>
  );
}
