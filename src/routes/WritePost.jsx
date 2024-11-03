import { useNavigate } from "react-router-dom";
import PostForm from "../PostForm";

export default function WritePost() {
  const navigate = useNavigate();

  return (
    <PostForm
      onSubmit={(newPost) => {
        fetch(`/posts`, {
          method: "POST",
          body: JSON.stringify(newPost),
          headers: {
            "Content-type": "application/json",
          },
        }).then(() => {
          navigate("/");
        });
      }}
    />
  );
}
