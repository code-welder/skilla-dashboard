import styles from "./CallPhoneInfo.module.css";
import WebSvg from "./web.svg";
import TelSvg from "./tel.svg";

interface Props {
  phoneNumber: string;
  fromSite: boolean;
}

export const CallPhoneInfo = ({ phoneNumber, fromSite }: Props) => {
  return (
    <div className={styles.core}>
      <span className={styles.icon}>{fromSite && <WebSvg />}</span>
      <a href={`tel:${phoneNumber}`} className={styles.link}>
        <span className={styles.icon}>{<TelSvg />}</span>
        {formatPhoneNumber(phoneNumber)}
      </a>
    </div>
  );
};

const formatPhoneNumber = (phoneNumber: string) => {
  return `+${phoneNumber[0]} (${phoneNumber.substring(1, 4)}) ${phoneNumber.substring(
    4,
    7
  )}-${phoneNumber.substring(7, 9)}-${phoneNumber.substring(9, 11)}`;
};
