import { Button, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
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
    <div className="w-full p-4">
      <div className="filter">
        <Search
          current_lat_long={current_lat_long}
          set_filtered_restaurants={set_filtered_restaurants}
          list_of_restaurants={list_of_restaurants}
        />
        <div className="grid grid-cols-5 my-4 gap-2 md:grid-cols-12">
          <FormControl fullWidth className="col-span-4 md:col-span-2">
            <InputLabel id="min-rating-label">Minimum Rating</InputLabel>
            <Select fullWidth
              labelId="min-rating-label"
              id="min-rating"
              value={minimum_rating}
              label="Minimum Rating"
              onChange={(e) => {
                set_minimum_rating(+(e?.target?.value));
              }}
            >
              <MenuItem value={5}>5</MenuItem>
              <MenuItem value={4}>4</MenuItem>
              <MenuItem value={3}>3</MenuItem>
              <MenuItem value={2}>2</MenuItem>
              <MenuItem value={1}>1</MenuItem>
            </Select>
          </FormControl>
          <Button variant="outlined" className="filter-btn"
            onClick={filter_data_based_on_ratings}
          >Apply</Button>
        </div>
      </div>
      {/* restaurant cards container */}
      <div className="my-2 grid grid-cols-2 sm:grid-cols-2 gap-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-6 2xl:grid-cols-8 justify-center items-center">
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