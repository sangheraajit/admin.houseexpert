import { NbMenuItem } from "@nebular/theme";

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: "Dashboard",
    icon: "shopping-cart-outline",
    link: "/pages/dashboard",
    home: true,
  },
  // {
  //   title: 'IoT Dashboard',
  //   icon: 'home-outline',
  //   link: '/pages/iot-dashboard',
  // },
  {
    title: "App Management",
    group: true,
  },
  {
    title: "Providers",
    icon: "layout-outline",
    hidden: !findRole("Providers"),
    children: [
      {
        title: "Provider Types",
        link: "/pages/eProviders/types",
      },
      {
        title: "Providers",
        link: "/pages/eProviders/list",
      },
      {
        title: "Providers Requests",
        link: "/pages/eProviders/request-list",
      },
      // {
      //   title: "Galleries",
      //   link: "/pages/layout/accordion",
      // },
      // {
      //   title: "Awards",
      //   pathMatch: "prefix",
      //   link: "/pages/layout/tabs",
      // },
      // {
      //   title: "Experiences",
      //   pathMatch: "prefix",
      //   link: "/pages/layout/tabs",
      // },
      // {
      //   title: "Availability Hours",
      //   pathMatch: "prefix",
      //   link: "/pages/layout/tabs",
      // },
      // {
      //   title: "Addresses",
      //   pathMatch: "prefix",
      //   link: "/pages/layout/tabs",
      // },
    ],
  },
  {
    title: "Categories",
    icon: "home-outline",
    link: "/pages/categories",
    hidden: !findRole("Categories"),
  },
  {
    title: "Bookings",
    icon: "home-outline",
    link: "/pages/orders",
    hidden: !findRole("Bookings"),
  },
  {
    title: "Article",
    icon: "home-outline",
    link: "/pages/artical/list",
    hidden: !findRole("Article"),
  },
  // {
  //   title: "Charges",
  //   icon: "home-outline",
  //   link: "/pages/charges/list",
  //   hidden: !findRole("Charges"),
  // },
  // {
  //   title: "CFT Rate",
  //   icon: "home-outline",
  //   link: "/pages/cftrate/list",
  //   hidden: !findRole("CFT Rate"),
  // },
  {
    title: "Floor Rate",
    icon: "home-outline",
    link: "/pages/cftrate/floorlist",
    hidden: !findRole("Floor Rate"),
  },
  {
    title: "Packages",
    icon: "home-outline",
    link: "/pages/packages/list",
    hidden: !findRole("Packages"),
  },
  {
    title: "Settings",
    icon: "layout-outline",
    hidden: !findRole("Settings"),
    children: [
      {
        title: "City",
        link: "/pages/admin/city",
      },
      {
        title: "User",
        link: "/pages/admin/user",
      },
      {
        title: "Role Master",
        link: "/pages/admin/role",
      },
      // {
      //   title: "User Role Assignment",
      //   link: "/pages/admin/userrole",
      // },
    ],
  },
   
];
function findRole(pagename) {
  let temp1 = localStorage.getItem("menulist");
  let menulist;
  if(temp1){
                menulist = temp1.split(",");
                if(menulist.find(x=>x==pagename))
                {
                  return true;
                }
                else
                {
                  return false;
                }
            }
return false;
} 
