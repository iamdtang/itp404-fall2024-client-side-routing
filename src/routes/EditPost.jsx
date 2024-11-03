import { useLoaderData, useNavigate } from "react-router-dom";
import PostForm from "../PostForm";
import { toast } from "react-toastify";

export default function EditPost() {
  const post = useLoaderData();
  const navigate = useNavigate();

  return (
    <PostForm
      post={post}
      onSubmit={(updatedPost) => {
        fetch(`/posts/${post.id}`, {
          method: "PATCH",
          body: JSON.stringify(updatedPost),
          headers: {
            "Content-type": "application/json",
          },
        }).then(() => {
          navigate(`/posts/${post.id}`);
          toast.success("Your post was successfully updated.");
        });
      }}
    />
  );
}
