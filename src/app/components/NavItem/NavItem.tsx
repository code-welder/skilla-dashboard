import Link from "next/link";
import styles from "./NavItem.module.css";
import clsx from "clsx";

interface Props {
  link: string;
  title: string;
  icon?: React.ReactNode;
  isActive?: boolean;
}

export const NavItem = ({ link, title, icon, isActive }: Props) => {
  return (
    <Link href={link} className={clsx(styles.core, isActive && styles.active)}>
      <span className={styles.icon}>{icon}</span> {title}
    </Link>
  );
};
