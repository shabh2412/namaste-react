import { useSearchParams } from "react-router-dom";
import { CDN_URL } from "../utils/constants";
import { sample_restaurant_meta } from "../utils/mockData";
import Cuisines from "./Cuisines";
import DeliveryMeta from "./DeliveryMeta";
import RestaurantMetaRating from "./RestaurantMetaRating";

export default function RestaurantMeta({ restaurant_meta = sample_restaurant_meta }) {
  // console.log({ restaurant_meta });
  const { name, costForTwoMessage, areaName, avgRating, totalRatingsString, cuisines, expectationNotifiers } = restaurant_meta;

  const [search_params,] = useSearchParams();
  const res_img = search_params?.get("res_img");

  return <>
    {/* restaurant-meta-card */}
    <div className="my-4 bg-white rounded p-4 flex flex-col-reverse gap-2 md:flex-row" >
      <div className="w-full">
        <div id="restaurant-menu-header" className="text-3xl font-bold text-orange-400">
          {restaurant_meta?.name}
        </div>
        <div id="restaurant-meta-data" className="mt-2">
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
      {
        res_img &&
        <div>
          <img
            className="w-full md:w-[180px] h-[200px] object-cover rounded-lg"
            src={`${CDN_URL}${res_img}`} alt="res-logo"
          />
        </div>
      }
    </div>
  </>;
}

export { RestaurantMeta };