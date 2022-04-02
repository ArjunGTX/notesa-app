import React from "react";
import { NavLink } from "react-router-dom";

export const ListItem = ({ link: { icon, item, route } }) => {
  return (
    <li className="list-item my-xs px-xl ml-xl py-sm br-sm hover-light full-width">
      <NavLink
        to={route}
        className={({ isActive }) =>
          isActive ? "fr-fs-ct active full-width" : "fr-fs-ct full-width"
        }
      >
        {icon}
        <span className="ml-sm">{item}</span>
      </NavLink>
    </li>
  );
};
