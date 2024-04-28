import { useEffect, useState } from "react";
import { initial_lat_long } from "../mockData";
import { base_url } from "../constants";


const useRestaurantListing = () => {
  const [list_of_restaurants, set_list_of_restaurants] = useState([]);
  const [filtered_restaurants, set_filtered_restaurants] = useState([]);

  const [loading, set_loading] = useState(false);

  const [minimum_rating, set_minimum_rating] = useState(4);


  const filter_data_based_on_ratings = () => {
    const filteredList = list_of_restaurants?.filter(item => {
      return item?.info?.avgRating >= minimum_rating;
    });
    set_filtered_restaurants(filteredList);
  };

  const fetch_data = async ({ lat, long } = initial_lat_long) => {
    try {
      set_loading(true);
      const url = `${base_url}/list?lat=${lat}&long=${long}`;
      const res = await fetch(url);
      const json_data = await res?.json();
      console.log(json_data);
      const element = json_data?.data?.cards?.find((item) => item?.card?.card?.id === "restaurant_grid_listing");
      console.log({ element });
      set_list_of_restaurants(
        element?.card?.card?.gridElements?.infoWithStyle?.restaurants ||
        json_data?.data?.cards?.[2]?.card?.card?.gridElements?.infoWithStyle?.restaurants || json_data?.data?.cards?.[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants || []
      );
      set_filtered_restaurants(
        element?.card?.card?.gridElements?.infoWithStyle?.restaurants ||
        json_data?.data?.cards?.[2]?.card?.card?.gridElements?.infoWithStyle?.restaurants || json_data?.data?.cards?.[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants || []
      );
    } catch (error) {
      console.log({ error });
    } finally {
      set_loading(false);
    }
  };

  useEffect(() => {
    filter_data_based_on_ratings();
  }, [list_of_restaurants]);

  const [current_lat_long, set_current_lat_long] = useState(initial_lat_long);

  useEffect(() => {
    if (!navigator?.geolocation) {
      console.log("geolocation is not supported.");
    } else {
      set_loading(true);
      navigator.geolocation.getCurrentPosition((position) => {
        const { coords: { latitude, longitude } } = position;
        set_current_lat_long({
          lat: latitude,
          long: longitude,
        });
        fetch_data({ lat: latitude, long: longitude });
      }, () => {
        fetch_data();
      }, {
        enableHighAccuracy: false,
        timeout: 5000,
        maximumAge: Infinity
      }
      );
    }
  }, []);

  return {
    list_of_restaurants,
    filtered_restaurants,
    current_lat_long,
    set_filtered_restaurants,
    minimum_rating,
    set_minimum_rating,
    filter_data_based_on_ratings,
    loading,
  };
};

export default useRestaurantListing;