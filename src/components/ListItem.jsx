import React from "react";
import { NavLink } from "react-router-dom";

export const ListItem = ({ link: { icon, item, route } }) => {
  return (
    <li className="list-item my-xs px-lg py-sm br-sm hover-light">
      <NavLink
        to={route}
        className={({ isActive }) =>
          isActive ? " fr-ct-ct active" : "fr-ct-ct"
        }
      >
        {icon}
        <span className="ml-sm">{item}</span>
      </NavLink>
    </li>
  );
};
