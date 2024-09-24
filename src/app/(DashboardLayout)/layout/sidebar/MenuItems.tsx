import {
  IconAperture,
  IconCopy,
  IconHome,
  IconLayoutDashboard,
  IconLogin,
  IconMoodHappy,
  IconTypography,
  IconUserPlus,
  IconUsers,
  IconCalendarEvent,
  IconSpeakerphone,
  IconCoins
} from "@tabler/icons-react";

import { uniqueId } from "lodash";

const Menuitems = [
  {
    navlabel: true,
    subheader: "Home",
  },
  {
    id: uniqueId(),
    title: "Dashboard",
    icon: IconHome,
    href: "/pages/dashboard",
  },
  {
    id: uniqueId(),
    title: "Members",
    icon: IconUsers,
    href: "/pages/members-page",
  },
  {
    id: uniqueId(),
    title: "Events",
    icon: IconCalendarEvent,
    href: "/pages/events-page",
  },
  {
    id: uniqueId(),
    title: "Announcements",
    icon: IconSpeakerphone,
    href: "/pages/announcements-page",
  },
  {
    id: uniqueId(),
    title: "Finance",
    icon: IconCoins,
    href: "/pages/finance-page",
  },
  {
    navlabel: true,
    subheader: "Utilities",
  },
  {
    id: uniqueId(),
    title: "Dashboard Sample",
    icon: IconLayoutDashboard,
    href: "/",
  },
  {
    id: uniqueId(),
    title: "Typography",
    icon: IconTypography,
    href: "/utilities/typography",
  },
  {
    id: uniqueId(),
    title: "Shadow",
    icon: IconCopy,
    href: "/utilities/shadow",
  },
  {
    id: uniqueId(),
    title: "Icons",
    icon: IconMoodHappy,
    href: "/icons",
  },
  {
    id: uniqueId(),
    title: "Login",
    icon: IconLogin,
    href: "/authentication/login",
  },
  {
    id: uniqueId(),
    title: "Register",
    icon: IconUserPlus,
    href: "/authentication/register",
  },
];

export default Menuitems;
