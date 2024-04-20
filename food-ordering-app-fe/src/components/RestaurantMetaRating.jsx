import React from 'react';
import StarsIcon from '@mui/icons-material/Stars';


const RestaurantMetaRating = ({ costForTwoMessage, avgRating, totalRatingsString }) => {
  return (
    <div id="res-meta-ratings-container" >
      <StarsIcon
        sx={{
          color: "#1ba672",
          fontSize: "18px"
        }}
      />
      <div style={{ display: "flex", justifyContent: "start", alignItems: "center", gap: "2px" }} >
        <span>{avgRating}</span>
        <span>({totalRatingsString})</span>
        <div style={{
          width: "4px", height: "4px", backgroundColor: "#a4a6a8",
          minWidth: "4px",
          minHeight: "4px",
          borderRadius: "50%"
        }} ></div>
        <span>{costForTwoMessage}</span>
      </div>
    </div>
  );
};

export default RestaurantMetaRating;