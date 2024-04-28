import { useEffect, useRef, useState } from "react";
import RestaurantCard from "./RestaurantCard";
import { initial_lat_long } from "../utils/mockData";
import Search from "./Search";
import { base_url } from "../utils/constants";

// previously: Body & Body.js
const RestaurantListings = () => {

  const [list_of_restaurants, set_list_of_restaurants] = useState([]);
  const [filtered_restaurants, set_filtered_restaurants] = useState([]);

  const [minimum_rating, set_minimum_rating] = useState(4);

  const [loading, set_loading] = useState(false);

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

  const timeout = useRef(null);

  const debounce = (func, delay) => {
    if (timeout?.current) {
      clearTimeout(timeout?.current);
    }
    timeout.current = setTimeout(func, delay);
  };

  return (
    <div className="body">
      <div className="filter">
        {/* <button
          className="filter-btn"
          onClick={() => {
            const filteredList = res_list.filter(item => {
              return item?.info?.avgRating >= 4;
            });
            set_list_of_restaurants(filteredList);
          }}
        >
          Top Rated Restaurants
        </button> */}
        <Search
          current_lat_long={current_lat_long}
          set_filtered_restaurants={set_filtered_restaurants}
          list_of_restaurants={list_of_restaurants}
        />
        <div className="flex gap-1 items-center">
          <label htmlFor="minRating">Minimum Rating</label>
          <select name="minRating" id="minRating" value={minimum_rating} onChange={(e) => {
            set_minimum_rating(+(e?.target?.value));
          }}>
            <option value="5">5</option>
            <option value="4">4</option>
            <option value="3">3</option>
            <option value="2">2</option>
            <option value="1">1</option>
          </select>
          <button className="filter-btn"
            onClick={filter_data_based_on_ratings}
          >Apply</button>
        </div>
      </div>
      <div className="res-container">
        {/* Restaurant Cards */}
        {/* <RestaurantCard resData={resObj} /> */}
        {/* Below is an example of conditional rendering */}
        {
          loading ? (new Array(9))?.fill(0)?.map((item, idx) => <div key={`Shimmer-${idx}-loading`} className="shimmer-card" >
            <div style={{ width: "100%", height: "100%" }} className="shimmer-effect"></div>
          </div>) :
            filtered_restaurants?.map((restaurant) => <RestaurantCard
              key={`${restaurant?.info?.id}`}
              resData={restaurant?.info}
              lat={current_lat_long?.lat}
              long={current_lat_long?.long}
            />)
        }
      </div>
    </div>
  );
};

export default RestaurantListings;