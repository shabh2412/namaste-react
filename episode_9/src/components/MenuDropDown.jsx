import { useState } from "react";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import MenuItem from "./MenuItem";

export const MenuDropDown = ({ title = "", itemCards = [] }) => {
  const [open, set_open] = useState(true);

  const toggle = () => {
    set_open(prev => !prev);
  };

  return <>
    <div style={{ width: "100%" }}>
      <div style={{
        // margin: "24px 16px 16px",
        width: "100%"
      }}
        className="restaurant-menu-dropdown"
      >
        <div style={{ width: "100%" }}>
          <div className="restaurant-menu-dropdown-button" onClick={toggle} >
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
          <div style={{
            height: open ? "100%" : "0%",
            visibility: open ? "visible" : "hidden",
            display: open ? "block" : "none",
          }} >
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