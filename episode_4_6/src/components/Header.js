import { useEffect, useState } from "react";
import localAssets from "../utils/localAssets";

const Header = () => {
  const [is_logged_in, set_is_logged_in] = useState(false);

  const toggle_login = () => {
    set_is_logged_in(prev => !prev);
  };

  // console.log("rendered");

  // useEffect(() => {
  //   console.log(is_logged_in, "rendered"); // this will be called once during the first render, and then only when the items in dependency array changes.
  // }, [is_logged_in]); // this is the dependency array.

  return (
    <div className="header">
      <div className="logo-container">
        <img src={localAssets?.logo_image} alt="app-logo" className="logo" />
      </div>
      <div className="nav-items">
        <ul>
          <li>Home</li>
          <li>About Us</li>
          <li>Contact Us</li>
          <li>Cart</li>
        </ul>
        <div style={{ width: "80px", display: "flex", justifyContent: "end", alignItems: "center" }}>
          <button style={{
            padding: "8px",
            borderRadius: "4px"
          }}
            onClick={toggle_login}
          >{
              is_logged_in ? "Log out" : "Log in"
            }</button>
        </div>
      </div>
    </div>
  );
};

export default Header;