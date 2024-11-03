import "bootstrap/dist/css/bootstrap.css";
import "react-toastify/dist/ReactToastify.min.css";

import React from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Index from "./routes/Index";
import Contact from "./routes/Contact";
import Post from "./routes/Post";
import Root from "./routes/Root";
import WritePost from "./routes/WritePost";
import EditPost from "./routes/EditPost";

const router = createBrowserRouter([
  {
    element: <Root />, // doesn't need to be called Root
    children: [
      {
        path: "/",
        element: <Index />,
        loader() {
          return fetch("/posts?_expand=user").then((response) => {
            return response.json();
          });
        },
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/posts/:postId",
        loader({ params }) {
          return fetch(
            `/posts/${params.postId}?_expand=user&_embed=comments`
          ).then((response) => {
            return response.json();
          });
        },
        element: <Post />,
      },
      {
        path: "/write",
        element: <WritePost />,
      },
      {
        path: "/posts/:postId/edit",
        loader({ params }) {
          return fetch(`/posts/${params.postId}`).then((response) => {
            return response.json();
          });
        },
        element: <EditPost />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
