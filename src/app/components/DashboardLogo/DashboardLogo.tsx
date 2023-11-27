import Link from "next/link";
import styles from "./DashboardLogo.module.css";
import { Logo } from "@ui/Logo";

interface Props {}

export const DashboardLogo = ({}: Props) => {
  return (
    <Link href="/" className={styles.core}>
      <Logo />
    </Link>
  );
};
