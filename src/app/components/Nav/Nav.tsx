"use client";
import { usePathname } from "next/navigation";
import { NavItem } from "../NavItem";
import styles from "./Nav.module.css";
import { navList } from "./config";

export const Nav = () => {
  const pathname = usePathname();

  return (
    <nav>
      <ul className={styles.core}>
        {navList.map((navItem) => (
          <li key={navItem.link}>
            <NavItem
              link={navItem.link}
              title={navItem.title}
              icon={<navItem.icon />}
              isActive={navItem.link === pathname}
            />
          </li>
        ))}
      </ul>
    </nav>
  );
};
