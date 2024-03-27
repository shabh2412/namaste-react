import React from "react";
import Header from "./components/Header";
import RestaurantListings from "./components/RestaurantListings";

const App = () => {
  return <div className="app">
    <Header />
    <RestaurantListings />
  </div>;
};

export default App;