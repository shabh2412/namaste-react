import { useEffect, useState } from "react";
import localAssets from "../utils/localAssets";
import { Link, NavLink } from "react-router-dom";
import useOnlineStatus from "../utils/hooks/useOnlineStatus";

const Header = () => {
  const [is_logged_in, set_is_logged_in] = useState(false);

  const toggle_login = () => {
    set_is_logged_in(prev => !prev);
  };

  // console.log("rendered");

  // useEffect(() => {
  //   console.log(is_logged_in, "rendered"); // this will be called once during the first render, and then only when the items in dependency array changes.
  // }, [is_logged_in]); // this is the dependency array.

  const is_online = useOnlineStatus();

  return (
    <div className="header">
      <div className="logo-container">
        <Link to={"/"}>
          <img src={localAssets?.logo_image} alt="app-logo" className="logo" />
        </Link>
      </div>
      <div className="nav-items">
        <ul>
          <li>
            Online Status : {is_online ? "✅" : "🔴"}
          </li>
          <li>
            <NavLink to={"/"}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to={"/about"}>
              About Us
            </NavLink>
          </li>
          <li>
            <NavLink to={"/contact"}>
              Contact Us
            </NavLink>
          </li>
          <li>
            <NavLink to={"/cart"}>
              Cart
            </NavLink>
          </li>
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