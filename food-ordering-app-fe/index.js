import { createRoot } from "react-dom/client";
import App from "./src/App";
// import About from "./src/components/About";
import ContactPage from "./src/components/ContactPage";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import NotFoundPage from "./src/components/NotFound";
// import RestaurantListings from "./src/components/RestaurantListings";
import RestaurantMenu from "./src/components/RestaurantMenu";
import { lazy } from "react";
import { Suspense } from "react";

const rootContainer = document.getElementById("root");
const root = createRoot(rootContainer);

const RestaurantListings = lazy(() => import("./src/components/RestaurantListings"));
const About = lazy(() => import("./src/components/About"));

const routerConfiguration = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFoundPage />,
    children: [
      {
        path: "/",
        element: <Suspense fallback={<h1>Loading...</h1>} >
          <RestaurantListings />,
        </Suspense>
      },
      {
        path: "/about",
        element: <Suspense fallback={<h1>Loading...</h1>}>
          <About />,
        </Suspense>
      },
      {
        path: "/contact",
        element: <ContactPage />,
      },
      {
        path: "/restaurants/:restaurant_id",
        element: <RestaurantMenu />
      },
    ]
  },
]);

root.render(
  <RouterProvider router={routerConfiguration} />
);