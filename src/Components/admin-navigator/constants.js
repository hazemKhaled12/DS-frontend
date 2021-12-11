import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import LogoutIcon from "@mui/icons-material/Logout";

export const drawerWidth = 240;

export const sidebarItems = [
  {
    title: "Profile",
    icon: <AccountCircleIcon />,
    name: "title",
    link: "/profile"
  },
  {
    title: "Products",
    icon: <Inventory2Icon />,
    name: "product",
    link: "/admin/products"
  },
  { title: "LogOut", icon: <LogoutIcon />, name: "logout", link: "" }
];
