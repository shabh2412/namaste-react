import { useState } from "react";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import MenuItem from "./MenuItem";

export const MenuDropDown = ({ title = "", itemCards = [] }) => {
  const [open, set_open] = useState(true);

  const toggle = () => {
    set_open(prev => !prev);
  };

  return <>
    <div className="w-full">
      <div
        className="restaurant-menu-dropdown w-full"
      >
        <div className="w-full">
          <div className="restaurant-menu-dropdown-button w-full flex justify-between bg-white p-4 rounded-t cursor-pointer mt-4 hover:bg-gray-200" onClick={toggle} >
            <div>
              <h3>
                {
                  title
                }
                {" "}
                ({itemCards?.length})
              </h3>
            </div>
            <div>
              <KeyboardArrowDownIcon sx={{
                transform: open ? "rotate(180deg)" : "rotate(0deg)",
              }} />
            </div>
          </div>
        </div>
        {
          <div
            className="bg-white p-4 rounded-b"
            style={{
              height: open ? "100%" : "0%",
              visibility: open ? "visible" : "hidden",
              display: open ? "block" : "none",
            }}
          >
            {
              itemCards?.map(item => <MenuItem key={`${title}-${item?.card?.info?.id}`} menu_item_data={item?.card?.info} />)
            }
          </div>
        }
      </div>
    </div>
    <div className="menu-dropdown-border" >
    </div>
  </>;
};

export default MenuDropDown;