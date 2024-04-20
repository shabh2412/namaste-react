import React from 'react';

const VegNonVeg = ({ isVeg }) => {
  return (
    <div style={{
      width: "10px",
      height: "10px",
      display: 'flex',
      justifyContent: "center",
      alignItems: "center",
      borderRadius: "8px",
      border: "1px solid",
      padding: "4px",
      margin: "4px"
    }}
      className={`is-${isVeg ? "veg" : "nonveg"}`}
    >
      <div style={{ width: "8px", height: "8px", borderRadius: "50%" }} ></div>
    </div>
  );
};

export default VegNonVeg;