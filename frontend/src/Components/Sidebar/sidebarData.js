import React from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";
import * as ImIcons from "react-icons/im";
import * as BsIcons from "react-icons/bs";

export const SidebarData = [
  {
	title: "DashBoard",
	path: "/adminpanel",
	icon: <AiIcons.AiFillHome />,
	cName: "nav-text",
  },
  {
	title: "Customers",
	path: "/adminpanel/customers",
	icon: <ImIcons.ImAccessibility />,
	cName: "nav-text",
  },
  {
	title: "Orders",
	path: "/adminpanel/orders",
	icon: <FaIcons.FaShoppingCart />,
	cName: "nav-text",
  },
  {
	title: "Products",
	path: "/adminpanel/products",
	icon: <BsIcons.BsBox2HeartFill />,
	cName: "nav-text",
  },
];
