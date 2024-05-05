import { Link } from "react-router-dom";
import { CDN_URL } from "../utils/constants";
import StarIcon from '@mui/icons-material/Star';
import { Tooltip } from "@mui/material";
import React from "react";

const RestaurantCard = (props) => {
  // console.log(props);

  const { resData, lat, long } = props;

  const { name, cloudinaryImageId, costForTwo, cuisines, sla, avgRating, areaName } = resData;

  return (
    <Link to={`/restaurants/${resData?.id}?lat=${lat}&long=${long}`} >
      <div className="w-[180px] bg-gray-50 hover:bg-gray-200 rounded-lg" id={resData?.id} style={{
        // backgroundColor: "var(--light-gray)"
      }}>
        <div className="res-logo-container mb-2">
          <img
            className="w-[180px] h-[200px] object-cover rounded-t-lg"
            src={`${CDN_URL}${cloudinaryImageId}`} alt="res-logo"
          />
        </div>
        <div className="res-details-container p-2">
          <h3
            className="font-bold text-lg mb-1 overflow-hidden text-ellipsis text-nowrap"
          >{name}</h3>
          <div className="star-and-delivery">
            <div>
              <div className="flex justify-start items-center gap-2 my-1">
                <p className="m-0 text-lg">
                  {avgRating}
                </p>
                <StarIcon color="warning" />
              </div>
            </div>
            <div>
              <h4>{sla?.slaString}</h4>
            </div>
          </div>
          {/* cuisines */}
          <Tooltip title={
            <React.Fragment>
              <h4>
                {cuisines?.join(", ")}
              </h4>
              <div className="flex text-sm justify-start flex-col">
                {costForTwo && <p className="costForTwo">• {costForTwo}</p>}
                {areaName && <div className="areaName">• Restaurant location: {areaName}</div>}
              </div>
            </React.Fragment>
          } >
            <h4 className="text-sm mb-1 overflow-hidden text-ellipsis text-nowrap text-gray-500">{cuisines?.join(", ")}</h4>
          </Tooltip>
          {/* other details */}
          {/* <div className="flex text-sm justify-start flex-col">
            {costForTwo && <p className="costForTwo">• {costForTwo}</p>}
            {areaName && <div className="areaName">• {areaName}</div>}
          </div> */}
        </div>
      </div>
    </Link>
  );
};

export default RestaurantCard;