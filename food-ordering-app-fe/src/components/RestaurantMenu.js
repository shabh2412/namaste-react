import React, { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { base_url } from "../utils/constants";
import { sample_restaurant_meta } from "../utils/mockData";
import MenuDropDown from "./MenuDropDown";
import RestaurantMeta from "./RestaurantMeta";
const RestaurantMenu = () => {

  const { restaurant_id } = useParams();

  const [search_params,] = useSearchParams();

  const [menu_loading, set_menu_loading] = useState(false);

  const [error, set_error] = useState(false);

  const [restaurant_meta, set_restaurant_meta] = useState({});

  const [restaurant_menu_main, set_restaurant_menu_main] = useState([]);

  const [restaurant_menu_copy, set_restaurant_menu_copy] = useState([]);

  const [veg_nonveg_filter, set_veg_nonveg_filter] = useState({ veg: false, nonveg: false });

  const toggle_veg_nonveg = (e) => {
    const { checked, name } = e?.target;
    set_veg_nonveg_filter(prev => ({ ...prev, [name]: checked }));
  };

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
      if (result?.data && result?.data?.cards && result?.data?.cards?.length > 0) {
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

  const onlyVegFilter = () => {
    if (veg_nonveg_filter?.veg) {
      const filtered_data = restaurant_menu_main?.map(menu => {
        const { card: { card: { itemCards } } } = menu;
        const newItemCards = itemCards?.filter(itemCard => {
          const { card: { info: { isVeg } } } = itemCard;
          return isVeg === 1;
        });
        // console.log(newItemCards);
        return {
          ...menu,
          card: {
            ...menu?.card,
            card: {
              ...menu?.card?.card,
              itemCards: newItemCards
            }
          }
        };
      });
      // console.log({ filtered_data });
      set_restaurant_menu_copy(filtered_data);
    }
    else {
      set_restaurant_menu_copy([...restaurant_menu_main]);
    }
  };

  useEffect(() => {
    onlyVegFilter();
  }, [veg_nonveg_filter]);

  useEffect(() => {
    // console.log(restaurant_menu_main);
    set_restaurant_menu_copy(JSON.parse(JSON.stringify(restaurant_menu_main)));
  }, [restaurant_menu_main]);

  return <>
    <div style={{
      display: "flex",
      flexDirection: "column",
    }}>
      <div style={{
        maxWidth: "800px",
        minHeight: "600px",
        margin: "20px auto 0",
        width: "100%"
      }}>
        <RestaurantMeta restaurant_meta={restaurant_meta} />
        {/* Veg/NonVeg Filter */}
        <div className="flex gap-1 items-center justify-start my-1 mx-1" >
          <div className="flex" >
            <div>Veg Only</div>
            <input name="veg" type="checkbox" checked={veg_nonveg_filter?.veg} onChange={toggle_veg_nonveg} />
          </div>
          {/* <div className="flex" >
            <div>Non Veg</div>
            <input type="checkbox" checked={veg_nonveg_filter?.nonveg} />
          </div> */}
        </div>
        {
          restaurant_menu_copy?.map(menu => <MenuDropDown key={`${menu?.card?.card?.title}`} title={menu?.card?.card?.title} itemCards={menu?.card?.card?.itemCards} />)
        }
      </div>
    </div>
  </>;
};

export default RestaurantMenu;