import { FC } from "react";
import styles from "./Spinner.module.css";
interface SpinnerProps {
  size?: "small" | "medium" | "large" | number;
}
const Spinner: FC<SpinnerProps> = ({ size = "large" }) => {
  const sizeClass =
    size === "small"
      ? styles.small
      : size === "medium"
      ? styles.medium
      : styles.large
      ? styles.large
      : "";
  return (
    <span
      className={`${styles.loader} ${sizeClass}`}
      style={
        typeof size === "number"
          ? ({
              "--size": `${size}px`,
              "--size-after": `${size * 0.83}px`,
            } as object)
          : undefined
      }
    ></span>
  );
};

export default Spinner;
