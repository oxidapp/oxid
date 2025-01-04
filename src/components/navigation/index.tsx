import { Component, Show } from "solid-js";

import DesktopNavigation from "./desktop-navigation";
import MobileNavigation from "./mobile-navigation";

const Navigation: Component<{ isDesktop: boolean; isCollapsed: boolean }> = (
  props,
) => {
  const links = [
    {
      title: "tauri example page",
      href: "/",
    },
    {
      title: "tasks",
      href: "/tasks",
    },
    {
      title: "agenda",
      href: "/agenda",
    }
  ];

  const isDesktop = () => props.isDesktop;
  const isCollapsed = () => props.isCollapsed;

  return (
    <Show
      when={isDesktop()}
      fallback={<MobileNavigation links={links} />}
      children={<DesktopNavigation isCollapsed={isCollapsed()} links={links} />}
    />
  );
};

export default Navigation;
