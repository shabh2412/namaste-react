import { sample_restaurant_meta } from "../utils/mockData";
import Cuisines from "./Cuisines";
import DeliveryMeta from "./DeliveryMeta";
import RestaurantMetaRating from "./RestaurantMetaRating";

export default function RestaurantMeta({ restaurant_meta = sample_restaurant_meta }) {
  // console.log({ restaurant_meta });
  const { name, costForTwoMessage, areaName, avgRating, totalRatingsString, cuisines, expectationNotifiers } = restaurant_meta;
  return <>
    <div className="restaurant-meta-card" >
      <div id="restaurant-menu-header">
        {restaurant_meta?.name}
      </div>
      <div className="restaurant-meta-data">
        <div style={{ marginBottom: "20px" }}></div>
        {
          avgRating && totalRatingsString &&
          <RestaurantMetaRating avgRating={avgRating} costForTwoMessage={costForTwoMessage} totalRatingsString={totalRatingsString} />
        }
        {
          <Cuisines cuisines={cuisines} />
        }
        <hr />
        <DeliveryMeta expectationNotifier={expectationNotifiers?.[0]} />
      </div>
    </div>
  </>;
}

export { RestaurantMeta };