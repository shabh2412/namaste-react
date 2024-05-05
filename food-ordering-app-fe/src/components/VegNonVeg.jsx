import React from 'react';

const VegNonVeg = ({ isVeg }) => {
  return (
    <div style={{
      width: "10px",
      height: "10px",
      display: 'flex',
      justifyContent: "center",
      alignItems: "center",
      borderRadius: "2px",
      // padding: "4px",
    }}
      className={`${isVeg ? "border-green-500" : "border-red-500"} border p-2`}
    >
      <div
        className={`${isVeg ? "bg-green-500" : "bg-red-500"} p-1`}
        style={{ width: "8px", height: "8px", borderRadius: "50%" }} ></div>
    </div>
  );
};

export default VegNonVeg;