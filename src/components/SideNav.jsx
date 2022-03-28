import React from "react";
import { AiOutlineHome } from "react-icons/ai";
import { FaRegUserCircle, FaRegTrashAlt } from "react-icons/fa";
import { FiArchive } from "react-icons/fi";
import { MdLabelOutline } from "react-icons/md";
import { Button } from "./Button";
import { ListItem } from "./ListItem";

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

export const SideNav = () => {
  return (
    <div className="fc-fs-fs">
      {LINKS.map((link) => (
        <ListItem key={link.item} link={link} />
      ))}
      <Button variant="contained" color="primary" className="mt-xl">
        Create New Note
      </Button>
    </div>
  );
};
