import useOnlineStatus from "../utils/hooks/useOnlineStatus";
import useRestaurantListing from "../utils/hooks/useRestaurantListing";
import Offline from "./Offline";
import RestaurantCard from "./RestaurantCard";
import Search from "./Search";
// previously: Body & Body.js
const RestaurantListings = () => {

  const { current_lat_long, filtered_restaurants, list_of_restaurants, set_filtered_restaurants, minimum_rating, set_minimum_rating, filter_data_based_on_ratings, loading } = useRestaurantListing();

  const is_online = useOnlineStatus();

  if (!is_online) return <Offline />;

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