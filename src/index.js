import "bootstrap/dist/css/bootstrap.css";

import React from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Index from "./routes/Index";
import Contact from "./routes/Contact";
import Post from "./routes/Post";
import Root from "./routes/Root";

const router = createBrowserRouter([
  {
    element: <Root />, // doesn't need to be called Root
    children: [
      {
        path: "/",
        element: <Index />,
        loader() {
          return fetch(
            "https://jsonplaceholder.typicode.com/posts?_expand=user"
          ).then((response) => {
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
            `https://jsonplaceholder.typicode.com/posts/${params.postId}?_expand=user&_embed=comments`
          ).then((response) => {
            return response.json();
          });
        },
        element: <Post />,
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
