import { NbMenuItem } from "@nebular/theme";

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: "کارتابل",
    group: true,
  },
  {
    title: "درخواست های من",
    link: "/cartable/my-request",
    icon:"paper-plane-outline"
  },
  {
    title: "صندوق ورودی",
    link: "/cartable/request-list",
    icon:"inbox-outline"
  },
];
