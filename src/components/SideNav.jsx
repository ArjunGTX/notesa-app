import React, { useRef } from "react";
import { AiOutlineHome } from "react-icons/ai";
import { FaRegUserCircle, FaRegTrashAlt } from "react-icons/fa";
import { FiArchive } from "react-icons/fi";
import { MdLabelOutline } from "react-icons/md";
import { GrClose } from "react-icons/gr";
import { ListItem } from "./ListItem";
import { useAuth, useSideNav } from "../contexts";
import { useClickOutside } from "../utils/hooks";
import { Button } from "./Button";
import { useNavigate } from "react-router-dom";

const LINKS = [
  {
    item: "Home",
    route: "/",
    icon: <AiOutlineHome />,
  },
  {
    item: "Label",
    route: "/label",
    icon: <MdLabelOutline />,
  },
  {
    item: "Archive",
    route: "/archive",
    icon: <FiArchive />,
  },
  {
    item: "Trash",
    route: "/trash",
    icon: <FaRegTrashAlt />,
  },
];

export const SideNav = ({ className }) => {
  const navigate = useNavigate();
  const { setAuth } = useAuth();
  const { isSideNavActive, toggleSideNav } = useSideNav();

  const sideNavRef = useRef(null);

  const closeSideNav = () => toggleSideNav(false);

  useClickOutside(sideNavRef, closeSideNav);

  const handleLogout = () => {
    setAuth({
      isLoggedIn: false,
      encodedToken: "",
    });
    navigate("/");
  };

  return (
    <div
      ref={sideNavRef}
      className={`fc-fs-fs p-xl side-nav ${
        isSideNavActive ? "show-side-nav" : ""
      } ${className ? className : ""}`}
    >
      <button onClick={closeSideNav} className="close m-xl ml-auto">
        <GrClose className="txt-lg" />
      </button>
      {LINKS.map((link) => (
        <ListItem key={link.item} link={link} />
      ))}
      <div className="mx-xl">
        <Button
          onClick={handleLogout}
          variant="outlined"
          color="primary"
          className="ml-xl mt-lg txt-xs"
        >
          Logout
        </Button>
      </div>
    </div>
  );
};
