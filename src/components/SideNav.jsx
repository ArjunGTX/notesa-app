import React, { useRef } from "react";
import { AiOutlineHome } from "react-icons/ai";
import { FaRegUserCircle, FaRegTrashAlt } from "react-icons/fa";
import { FiArchive } from "react-icons/fi";
import { MdLabelOutline } from "react-icons/md";
import { GrClose } from "react-icons/gr";
import { Button } from "./Button";
import { ListItem } from "./ListItem";
import { useSideNav } from "../contexts";
import { useClickOutside } from "../utils/hooks";

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
  {
    item: "Profile",
    route: "/profile",
    icon: <FaRegUserCircle />,
  },
];

export const SideNav = ({ className }) => {
  const { isSideNavActive, toggleSideNav } = useSideNav();

  const sideNavRef = useRef(null);

  const closeSideNav = () => toggleSideNav(false);

  useClickOutside(sideNavRef, closeSideNav);

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
      <Button variant="contained" color="primary" className="mt-xl full-width">
        Create New Note
      </Button>
    </div>
  );
};
