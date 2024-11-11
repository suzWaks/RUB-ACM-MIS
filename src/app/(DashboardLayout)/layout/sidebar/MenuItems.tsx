import {
  IconHome,
  IconUsers,
  IconCalendarEvent,
  IconSpeakerphone,
  IconCoins,
} from "@tabler/icons-react";

import { uniqueId } from "lodash";

const Menuitems = [
  {
    navlabel: true,
    subheader: "-",
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
    adminOnly: true,
  },
];

export default Menuitems;

///
