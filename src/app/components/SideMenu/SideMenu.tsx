import { Nav } from "../Nav";
import styles from "./SideMenu.module.css";
import PlusIcon from "@icons/circled-plus.svg";
import AlertIcon from "@icons/circled-alert.svg";
import { Button } from "@ui/Button";

interface Props {}

export const SideMenu = ({}: Props) => {
  return (
    <div className={styles.core}>
      <Nav />
      <div className={styles.actions}>
        <Button variant="contained" iconContainerClass={styles.actionIcon} endIcon={<PlusIcon />}>
          Добавить заказ
        </Button>
        <Button variant="contained" iconContainerClass={styles.actionIcon} endIcon={<AlertIcon />}>
          Оплата
        </Button>
      </div>
    </div>
  );
};
