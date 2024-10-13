import { Component, Show } from "solid-js";

import DesktopNavigation from "./desktop-navigation";
import MobileNavigation from "./mobile-navigation";

const Navigation: Component<{ isDesktop: boolean; isCollapsed: boolean }> = (
  props,
) => {
  const links = [
    {
      title: "agenda",
      href: "/",
    },
    {
      title: "oxids",
      href: "/oxids",
    },
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
