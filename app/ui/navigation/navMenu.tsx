"use client";

import { Menu } from "antd";
import { MenuItemType } from "antd/es/menu/interface";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavMenuProps {
  setCollapsed: (collapsed: boolean) => void;
}

// Map of links to display in the side navigation.
const routes = [
  { name: "Dashboard", href: "/", icon: "category" },
  { name: "Manual Control", href: "/manual", icon: "autoplay" },
  {
    name: "Automatic Control",
    href: "/automatic",
    icon: "settings_slow_motion",
  },
];

const navLinks = routes.map((link) => {
  return (
    <Link key={link.href} href={link.href}>
      <div style={{ display: "flex", alignItems: "center" }}>
        <span className="material-symbols-outlined" style={{ marginRight: 8 }}>
          {link.icon}
        </span>
        {link.name}
      </div>
    </Link>
  );
});

const navMenuItems: MenuItemType[] = navLinks.map((link, index) => ({
  key: link.key || index,
  label: link,
}));

const NavMenu: React.FC<NavMenuProps> = ({ setCollapsed }) => {
  const currentPath = usePathname();
  return (
    <Menu
      theme="dark"
      mode="inline"
      items={navMenuItems}
      selectedKeys={currentPath ? [currentPath] : undefined}
      onClick={() => setCollapsed(true)}
    />
  );
};

export default NavMenu;
