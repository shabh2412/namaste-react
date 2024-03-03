import { useEffect, useState } from "react";
import RestaurantCard from "./RestaurantCard";
import { initial_lat_long, res_list } from "../utils/mockData";

const Body = () => {

  const [list_of_restaurants, set_list_of_restaurants] = useState([]);

  const [minimum_rating, set_minimum_rating] = useState(4);

  const [loading, set_loading] = useState(false);

  const fetch_data = async ({ lat, long } = initial_lat_long) => {
    try {
      set_loading(true);
      const url = `https://www.swiggy.com/dapi/restaurants/list/v5?lat=${lat}&lng=${long}&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING`;
      const res = await fetch(url);
      const json_data = await res?.json();
      console.log(json_data);
      set_list_of_restaurants(json_data?.data?.cards?.[2]?.card?.card?.gridElements?.infoWithStyle?.restaurants || json_data?.data?.cards?.[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants || []);
    } catch (error) {
      console.log({ error });
    } finally {
      set_loading(false);
    }
  };

  useEffect(() => {
    if (!navigator?.geolocation) {
      console.log("geolocation is not supported.");
    } else {
      set_loading(true);
      navigator.geolocation.getCurrentPosition((position) => {
        const { coords: { latitude, longitude } } = position;
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
            onClick={() => {
              const filteredList = res_list.filter(item => {
                return item?.info?.avgRating >= minimum_rating;
              });
              set_list_of_restaurants(filteredList);
            }}
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
            list_of_restaurants?.map((restaurant) => <RestaurantCard
              key={`${restaurant?.info?.id}`}
              resData={restaurant?.info}
            />)
        }
      </div>
    </div>
  );
};

export default Body;