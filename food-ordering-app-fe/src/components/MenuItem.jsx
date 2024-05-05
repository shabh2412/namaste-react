import VegNonVeg from "./VegNonVeg";
import DiscountIcon from '@mui/icons-material/Discount';
import StarIcon from '@mui/icons-material/Star';
import { CDN_MENU_ICON } from "../utils/constants";
import { Button, IconButton, Tooltip } from "@mui/material";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';


const MenuItem = ({ menu_item_data = {} }) => {

  const {
    isBestSeller,
    isVeg,
    name,
    price,
    defaultPrice,
    offerTags,
    ratings: { aggregatedRating: { rating, ratingCountV2 } },
    description,
    imageId
  } = menu_item_data;

  // console.log({ menu_item_data });

  const add_to_cart = () => {
    console.log(`adding ${name} to cart`, menu_item_data);
  };

  return <>
    <div className="menu-item-card grid grid-cols-3 bg-slate-50 my-2 p-2 hover:bg-gray-100 md:p-4">
      {/* div for text information */}
      <div className="w-full col-span-2">
        <div style={{ display: "flex", gap: "4px" }}>
          <VegNonVeg isVeg={isVeg} />
        </div>
        {/* dish name */}
        <div className="dish-name text-lg font-bold">{name}</div>
        <div className="flex" style={{ gap: "4px" }} >
          <div className="dish-price">
            ₹{(price || defaultPrice || 0) / 100}
          </div>
          {
            offerTags && offerTags?.length > 0 &&
            <div className="offers">
              <DiscountIcon sx={{ fontSize: "12px", color: "#1ba672" }} />
              {
                offerTags?.map(offer_tag => <span key={`span-${name}`} >{offer_tag?.title} - {offer_tag?.subTitle}</span>)
              }
            </div>
          }
          {/* rating */}
        </div>
        {
          (rating || ratingCountV2) &&
          <div style={{
            fontSize: "13px",
            color: "#1ba672",
            gap: "4px", display: "flex"
          }}>
            <StarIcon sx={{ color: "#1ba672", }} />
            <div style={{ display: "flex", justifyContent: "start", alignItems: "center", gap: "8px" }} >
              {
                rating &&

                <span>{rating}</span>
              }
              {
                ratingCountV2 &&
                <span className="rating-count" >({ratingCountV2})</span>
              }
            </div>
          </div>
        }
        <Tooltip title={description}>
          <div className="meal-description overflow-hidden text-ellipsis text-nowrap md:text-wrap">
            {description}
          </div>
        </Tooltip>
      </div>

      {/* div for image and add button. */}
      <div className="menu-meal-img-container col-span-1 relative" >
        <img src={`${CDN_MENU_ICON}/${imageId}`} alt={name} className="w-full object-cover h-[120px] md:h-[180px]" />
        <div className="w-full bg-[rgba(45,45,45,0.5)] flex absolute bottom-0 justify-center">
          <IconButton size="small" onClick={add_to_cart} className="">
            <AddShoppingCartIcon className="bg-orange-400 text-white p-1 !h-8 !w-8 rounded" />
          </IconButton>
        </div>
      </div>
    </div>
    {/* <div className="bottom-divider"></div> */}
  </>;
};

export default MenuItem;