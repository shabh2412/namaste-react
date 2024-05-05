import { useEffect, useState } from "react";
import localAssets from "../utils/localAssets";
import { Link, NavLink } from "react-router-dom";
import useOnlineStatus from "../utils/hooks/useOnlineStatus";
import { Button } from "@mui/material";

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
    <div className="flex p-2 gap-4 shadow-sm">
      <div className="w-20">
        <Link to={"/"}>
          <img src={localAssets?.logo_image} alt="app-logo" className="rounded-full" />
        </Link>
      </div>
      <div className="flex w-full p-2 gap-4 justify-end">
        <ul className="w-full justify-end items-center gap-4 px-4 hidden md:flex">
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
        <div className="flex justify-center items-center w-32">
          <Button variant="contained" className="w-full" size="small" onClick={toggle_login}>
            {
              is_logged_in ? "Log out" : "Log in"
            }
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Header;