import { useEffect, useState } from "react";
import RestaurantCard from "./RestaurantCard";
import { res_list } from "../utils/mockData";

const Body = () => {

  const [list_of_restaurants, set_list_of_restaurants] = useState(res_list);

  const [minimum_rating, set_minimum_rating] = useState(4);

  const [count, set_count] = useState(0);

  useEffect(() => {
    set_count(count + 1);
    set_count(count + 1);
    set_count(count + 1);
  }, []);

  useEffect(() => {
    console.log(`count changed: ${count}`);
  }, [count]);

  useEffect(() => {
    set_count(count + 1);
    set_count(count + 1);
    set_count(count + 1);
  }, []);

  useEffect(() => {
    console.log(`count changed: ${count}`);
  }, [count]);

  return (
    <div className="body">
      {count}
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
        {
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