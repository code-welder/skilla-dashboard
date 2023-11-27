import Image from "next/image";
import styles from "./UserAvatar.module.css";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import clsx from "clsx";
import NoAvatarImg from "./noavatar.jpg";

interface Props {
  size?: "sm";
  src: string | StaticImport;
  alt?: string;
}

export const UserAvatar = ({ src, alt = "", size = "sm" }: Props) => {
  return (
    <div className={clsx(styles.core, styles[size])}>
      <Image src={src ? src : NoAvatarImg} alt={alt} fill />
    </div>
  );
};
