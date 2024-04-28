import React from 'react';

const Offline = () => {
  return (
    <div style={{
      width: "100vw",
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    }}>
      <div>
        It seems to us that you're offline right now. Please check your connection and try again.
      </div>
    </div>
  );
};

export default Offline;