import { NbMenuItem } from "@nebular/theme";

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: "عملیات ‌اصلی",
    group: true,
    link: "/admin/dashboard/wizard",
  },
  {
    title: "طراحی‌ فرایند",
    link: "/admin/process-modeler/list",
    icon: "flip-2-outline",
  },
  {
    title: "طراحی‌ مدل داده",
    link: "/admin/data-modeler/list",
    icon: "archive-outline",
  },
  {
    title: "طراحی‌ فرم",
    link: "/admin/form-modeler/list",
    icon: "browser-outline",
  },
  {
    title: "قوانین فرایند",
    link: "/admin/business-rule/list",
    icon: "alert-triangle-outline",
  },
  {
    title: "مجریان فرایند",
    link: "/admin/performers/list",
    icon: "people-outline",
  },
  {
    title: "اجرا",
    link: "/admin/execution/list",
    icon: "play-circle-outline",
  },
  {
    title: "اطلاعات پایه",
    group: true,
  },
  {
    title: "سازمان",
    link: "/admin/organization/list",
  },
  {
    title: "پرسنل",
    link: "/admin/user-managment/list",
  },
  {
    title: "آمار سیستم",
    link: "/admin/statistics",
  }
];
