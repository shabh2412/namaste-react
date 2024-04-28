import { useEffect } from "react";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { base_url } from "../constants";

const useRestaurantMenuData = ({ restaurant_id }) => {
  const [restaurant_meta, set_restaurant_meta] = useState([]);
  const [restaurant_menu_main, set_restaurant_menu_main] = useState([]);
  const [menu_loading, set_menu_loading] = useState(false);
  const [error, set_error] = useState(false);

  const [search_params,] = useSearchParams();

  const get_restaurant_menu = async () => {
    try {
      set_menu_loading(true);
      const lat = search_params?.get("lat");
      const long = search_params?.get("long");

      const query_params = new URLSearchParams({
        lat, long, restaurantId: restaurant_id
      });

      const response = await fetch(`${base_url}/menu?${query_params}`);
      const result = await response?.json();
      // console.log(result);
      if (result?.statusMessage === "Oops!! Something Went Wrong") {
        throw new Error(result?.statusMessage);
      }
      else if (result?.data && result?.data?.cards && result?.data?.cards?.length > 0) {
        const { cards } = result?.data;
        const res_meta_card_obj = cards?.find(cardObj => cardObj?.card?.card?.info);
        if (res_meta_card_obj) {
          const { card: { card: { info: res_meta_card } } } = res_meta_card_obj || {};
          set_restaurant_meta(res_meta_card);
        }
        const res_menu_cards_obj = cards?.find(cardObj => cardObj?.groupedCard?.cardGroupMap?.REGULAR?.cards);
        if (res_menu_cards_obj) {
          const { groupedCard: { cardGroupMap: { REGULAR: { cards: res_menu_cards } } } } = res_menu_cards_obj;
          set_restaurant_menu_main(res_menu_cards?.filter(item => item?.card?.card?.["@type"] === "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"));
        }
      }
    } catch (error) {
      set_error(true);
      console.log(`error occured while loading menu`, error);
    } finally {
      set_menu_loading(false);
    }
  };

  useEffect(() => {
    get_restaurant_menu();
  }, []);

  return {
    restaurant_meta,
    restaurant_menu_main,
    menu_loading,
    error,
  };
};

export default useRestaurantMenuData;