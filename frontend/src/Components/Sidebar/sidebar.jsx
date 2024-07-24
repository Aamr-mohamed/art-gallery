import React from "react";
import { Link } from "react-router-dom";
import { SidebarData } from "./sidebarData";
import "./sidebar.css";
import { IconContext } from "react-icons";

function SideBar() {
  return (
    <div className="bg-blue-700 pl-8 pt-7">
      <IconContext.Provider value={{ color: "black" }}>
        <nav className="nav-menu active">
          <ul className="nav-menu-items">
            {SidebarData.map((item, index) => {
              return (
                <li key={index} className={item.cName}>
                  <Link to={item.path}>
                    {item.icon}
                    <span style={{ marginLeft: "10px" }}>{item.title}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </IconContext.Provider>
    </div>
  );
}

export default SideBar;
