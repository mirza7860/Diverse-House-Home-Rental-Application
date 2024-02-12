import React, { useState } from "react";
import { IconButton } from "@mui/material";
import { Search, Menu, Person } from "@mui/icons-material";
import color from "../colors/color.js";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { setLogout } from "../redux/state.js";
import "../styles/Navbar.scss";
const Navbar = () => {
  const [dropdownMenu, setdropdownMenu] = useState(false);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  return (
    <div className="navbar">
      <a href="/">
        <img src="../../public/assets/Logo3.png" alt="" />
      </a>

      <div className="navbar_search">
        <input type="text" placeholder="Search ...." />
        <IconButton>
          <Search sx={{ color: color.pinkred }} />
        </IconButton>
      </div>

      <div className="navbar_right">
        {user ? (
          <a href="/create-listing" className="host">
            Become A Host
          </a>
        ) : (
          <a href="/login" className="host">
            Become A HOST
          </a>
        )}

        <button className="navbar_right_account">
          <Menu
            sx={{ color: color.darkgrey }}
            onClick={() => {
              setdropdownMenu(!dropdownMenu);
            }}
          />
          {!user ? (
            <Person sx={{ color: color.darkgrey }} />
          ) : (
            <img
              src={`http://localhost:8000/${user.profileimagepath?.replace(
                "public",
                ""
              )}`}
              alt="Profile Photo"
              style={{ objectFit: "cover", borderRadius: "50%" }}
            />
          )}
        </button>

        {dropdownMenu && !user && (
          <div className="navbar_right_accountmenu">
            <Link to="/login">Log In</Link>
            <Link to="/signup">Sign Up</Link>
          </div>
        )}

        {dropdownMenu && user && (
          <div className="navbar_right_accountmenu">
            <Link to="">Trip List</Link>
            <Link to="">Wish List</Link>
            <Link to="">Property List</Link>
            <Link to="">Reservation List</Link>
            <Link to="/create-listing">Become A HOST</Link>
            <Link
              to="/login"
              onClick={() => {
                dispatch(setLogout());
              }}
            >
              Log Out
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
