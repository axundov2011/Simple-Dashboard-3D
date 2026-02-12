import { createBrowserRouter } from "react-router-dom";
import Layout from "../components/Layout";
import Designers from "../pages/Designers/Designers";
import Editor from "../pages/Editor/Editor";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Designers /> },
      { path: "designers", element: <Designers /> },
      { path: "editor", element: <Editor /> },
    ],
  },
]);
