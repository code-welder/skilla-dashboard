import styles from "./Button.module.css";
import clsx from "clsx";
import { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";

interface Props<E extends ElementType> {
  size?: "lg" | "md" | "sm";
  variant?: "contained" | "outlined" | "text";
  color?: "primary" | "secondary";
  children?: ReactNode;
  className?: string;
  endIcon?: ReactNode;
  iconContainerClass?: string;
  as?: E;
}

const defaultElement = "button";

export const Button = <E extends ElementType = typeof defaultElement>({
  size = "md",
  variant = "text",
  color = "primary",
  children,
  endIcon,
  iconContainerClass,
  className,
  as,
  ...rest
}: Props<E> & ComponentPropsWithoutRef<E>) => {
  const Component = as || defaultElement;
  const classes = clsx(
    styles.core,
    styles[size],
    styles[variant],
    styles[color],
    endIcon && styles.withIcon,
    className
  );
  const endIconClasses = clsx(styles.icon, iconContainerClass);

  return (
    <Component className={classes} {...rest}>
      {children}
      {endIcon && <span className={endIconClasses}>{endIcon}</span>}
    </Component>
  );
};
