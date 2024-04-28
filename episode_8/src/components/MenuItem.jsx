import VegNonVeg from "./VegNonVeg";
import DiscountIcon from '@mui/icons-material/Discount';
import StarIcon from '@mui/icons-material/Star';
import { CDN_MENU_ICON } from "../utils/constants";

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
    <div className="menu-item-card">
      {/* div for text information */}
      <div>
        <div style={{ display: "flex", gap: "4px" }}>
          <VegNonVeg isVeg={isVeg} />
        </div>
        {/* dish name */}
        <div className="dish-name">{name}</div>
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
        <div style={{ display: "flex", alignItems: "end", cursor: "pointer" }} >
          <div className="meal-description">
            {description}
          </div>
        </div>
      </div>

      {/* div for image and add button. */}
      <div className="menu-meal-img-container" >
        <img src={`${CDN_MENU_ICON}/${imageId}`} alt={name} />
        <button className="add-to-cart-button" onClick={add_to_cart} >Add</button>
      </div>
    </div>
    <div className="bottom-divider"></div>
  </>;
};

export default MenuItem;