import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ReactNode,
} from "react";

import { classNames } from "@/lib/classNames";

type ButtonSize = "sm" | "md" | "lg";

type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";

interface BaseButtonProps {
  children: ReactNode;
  className?: string;
  disabled?: boolean;
  size?: ButtonSize;
  variant?: ButtonVariant;
}

type ButtonProps = BaseButtonProps &
  Omit<
    ButtonHTMLAttributes<HTMLButtonElement>,
    keyof BaseButtonProps | "className" | "children" | "disabled"
  > & {
    href?: never;
  };

type ButtonLinkProps = BaseButtonProps &
  Omit<
    AnchorHTMLAttributes<HTMLAnchorElement>,
    keyof BaseButtonProps | "className" | "children"
  > & {
    href: string;
  };

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "border-sb-red bg-sb-red text-sb-rice hover:bg-sb-red-deep focus-visible:outline-sb-gold",
  secondary:
    "border-sb-gold/70 bg-sb-gold/10 text-sb-gold-soft hover:bg-sb-gold/20 focus-visible:outline-sb-gold",
  ghost:
    "border-sb-line bg-transparent text-sb-muted hover:bg-sb-rice/5 focus-visible:outline-sb-gold",
  danger:
    "border-sb-red-deep bg-sb-red-deep/70 text-sb-rice hover:bg-sb-red focus-visible:outline-sb-gold",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "min-h-9 px-3 py-1.5 text-xs",
  md: "min-h-11 px-5 py-2.5 text-sm",
  lg: "min-h-12 px-6 py-3 text-base",
};

function getButtonClassName(
  variant: ButtonVariant,
  size: ButtonSize,
  className = "",
) {
  return classNames(
    "inline-flex items-center justify-center gap-2 rounded-control border font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
    variantClasses[variant],
    sizeClasses[size],
    className,
  );
}

function isButtonLinkProps(
  props: ButtonProps | ButtonLinkProps,
): props is ButtonLinkProps {
  return typeof props.href === "string";
}

export function Button(props: ButtonProps | ButtonLinkProps) {
  if (isButtonLinkProps(props)) {
    const {
      children,
      className,
      disabled,
      href,
      size = "md",
      variant = "primary",
      ...anchorProps
    } = props;
    const buttonClassName = getButtonClassName(variant, size, className);

    if (disabled) {
      return (
        <button className={buttonClassName} disabled type="button">
          {children}
        </button>
      );
    }

    return (
      <a className={buttonClassName} href={href} {...anchorProps}>
        {children}
      </a>
    );
  }

  const {
    children,
    className,
    disabled,
    size = "md",
    type = "button",
    variant = "primary",
    ...buttonProps
  } = props;
  const buttonClassName = getButtonClassName(variant, size, className);

  return (
    <button
      className={buttonClassName}
      disabled={disabled}
      type={type}
      {...buttonProps}
    >
      {children}
    </button>
  );
}
