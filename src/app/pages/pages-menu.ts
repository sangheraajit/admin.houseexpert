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
  },
  {
    title: "Bookings",
    icon: "home-outline",
    link: "/pages/orders",
  },
  {
    title: "Article",
    icon: "home-outline",
    link: "/pages/artical/list",
  },
  // {
  //   title: "Services",
  //   icon: "edit-2-outline",
  //   children: [
  //     {
  //       title: "Services List",
  //       link: "/pages/service/list",
  //     },
  //     {
  //       title: "Option Groups",
  //       link: "/pages/forms/layouts",
  //     },
  //     {
  //       title: "Options",
  //       link: "/pages/forms/buttons",
  //     },
  //     {
  //       title: "Service Reviews",
  //       link: "/pages/forms/datepicker",
  //     },
  //   ],
  // },
  // {
  //   title: "Artical",
  //   icon: "edit-2-outline",
  //   children: [
  //     {
  //       title: "Atrical List",
  //       link: "/pages/artical/list",
  //     },
      
  //   ],
  // },
  // {
  //   title: "Bookings",
  //   icon: "keypad-outline",
  //   // link: '/pages/ui-features',
  //   children: [
  //     {
  //       title: "Bookings",
  //       link: "/pages/orders/list",
  //     },
  //     // {
  //     //   title: "Booking Statuses",
  //     //   link: "/pages/ui-features/icons",
  //     // },
  //   ],
  // },
  // {
  //   title: "Coupons",
  //   icon: "home-outline",
  //   link: "/pages/iot-dashboard",
  // },
  // {
  //   title: "Faqs",
  //   icon: "home-outline",
  //   link: "/pages/iot-dashboard",
  // },

  {
    title: "Settings",
    icon: "layout-outline",
    children: [
      {
        title: "City",
        link: "/pages/admin/city",
      },
      {
        title: "User",
        link: "/pages/admin/user",
      },
    ],
  },
  // {
  //   title: 'Miscellaneous',
  //   icon: 'shuffle-2-outline',
  //   children: [
  //     {
  //       title: '404',
  //       link: '/pages/miscellaneous/404',
  //     },
  //   ],
  // },
  // {
  //   title: 'Auth',
  //   icon: 'lock-outline',
  //   children: [
  //     {
  //       title: 'Login',
  //       link: '/auth/login',
  //     },
  //     {
  //       title: 'Register',
  //       link: '/auth/register',
  //     },
  //     {
  //       title: 'Request Password',
  //       link: '/auth/request-password',
  //     },
  //     {
  //       title: 'Reset Password',
  //       link: '/auth/reset-password',
  //     },
  //   ],
  // },
];
