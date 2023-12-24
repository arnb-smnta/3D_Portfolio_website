import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./Home";
import About from "./About";
import Contact from "./Contact";
import Projects from "./Projects";
import Navbar from "./Navbar";
import Body from "./Body";

const App = () => {
  const approuter = createBrowserRouter([
    {
      path: "/",
      element: <Body />,

      children: [
        {
          path: "/",
          element: <Home />,
        },
        { path: "/about", element: <About /> },
        { path: "/Contact", element: <Contact /> },
        { path: "/Projects", element: <Projects /> },
      ],
    },
  ]);
  return (
    <RouterProvider router={approuter}>
      <main className="bg-slate-300/20"></main>
    </RouterProvider>
  );
};

export default App;
