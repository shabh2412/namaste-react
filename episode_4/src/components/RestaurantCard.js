import { CDN_URL } from "../utils/constants";

const RestaurantCard = (props) => {
  // console.log(props);

  const { resData } = props;
  console.log(resData);

  const { name, cloudinaryImageId, costForTwo, cuisines, sla, avgRating } = resData;

  return (
    <div className="res-card" style={{
      // backgroundColor: "var(--light-gray)"
    }}>
      <div className="res-logo-container">
        <img
          className="res-logo"
          src={`${CDN_URL}${cloudinaryImageId}`} alt="res-logo"
        />
      </div>
      <div className="res-details-container">
        <h3 style={{
          marginTop: 0,
          overflow: "hidden",
          whiteSpace: "nowrap",
          textOverflow: "ellipsis",
        }}>{name}</h3>
        <div className="star-and-delivery">
          <div>
            <h4>{avgRating} Stars</h4>
          </div>
          <div>
            <h4>{sla?.slaString}</h4>
          </div>
        </div>
        <h4 className="cuisines">{cuisines?.join(", ")}</h4>
        <p className="costForTwo">{costForTwo}</p>
      </div>
    </div>
  );
};

export default RestaurantCard;