import { createRoot } from "react-dom/client";
import App from "./src/App";
import About from "./src/components/About";
import ContactPage from "./src/components/ContactPage";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import NotFoundPage from "./src/components/NotFound";
import RestaurantListings from "./src/components/RestaurantListings";
import RestaurantMenu from "./src/components/RestaurantMenu";

const rootContainer = document.getElementById("root");
const root = createRoot(rootContainer);

const routerConfiguration = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFoundPage />,
    children: [
      {
        path: "/",
        element: <RestaurantListings />,
      },
      {
        path: "/about",
        element: <About />,
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