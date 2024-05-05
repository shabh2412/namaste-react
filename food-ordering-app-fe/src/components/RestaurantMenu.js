import React, { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { base_url } from "../utils/constants";
import { sample_restaurant_meta } from "../utils/mockData";
import MenuDropDown from "./MenuDropDown";
import RestaurantMeta from "./RestaurantMeta";
import useRestaurantMenuData from "../utils/hooks/useRestaurantMenuData";
import NotFoundPage from "./NotFound";
import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";
const RestaurantMenu = () => {

  const { restaurant_id } = useParams();

  const { error, menu_loading, restaurant_menu_main, restaurant_meta } = useRestaurantMenuData({ restaurant_id });

  const [restaurant_menu_copy, set_restaurant_menu_copy] = useState([]);

  const [veg_nonveg_filter, set_veg_nonveg_filter] = useState({ veg: false, nonveg: false });

  const toggle_veg_nonveg = (e) => {
    const { checked, name } = e?.target;
    set_veg_nonveg_filter(prev => ({ ...prev, [name]: checked }));
  };

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
    {
      error ? <NotFoundPage /> :
        (
          menu_loading ? <>
            Loading...
          </> :
            <div className="flex flex-col bg-gray-100">
              <div
                className="w-full px-4 mt-5 max-w-[400px] mx-auto md:max-w-[800px]"
              >
                <RestaurantMeta restaurant_meta={restaurant_meta} />
                {/* Veg/NonVeg Filter */}
                <FormGroup className="p-1" >
                  <FormControlLabel control={<Checkbox name="veg" checked={veg_nonveg_filter?.veg} onChange={toggle_veg_nonveg} />} label="Veg Only" />
                </FormGroup>
                {
                  restaurant_menu_copy?.map(menu => <MenuDropDown key={`${menu?.card?.card?.title}`} title={menu?.card?.card?.title} itemCards={menu?.card?.card?.itemCards} />)
                }
              </div>
            </div>
        )
    }
  </>;
};

export default RestaurantMenu;