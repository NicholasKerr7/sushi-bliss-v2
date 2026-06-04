import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ReactNode,
} from "react";

type ButtonVariant = "primary" | "secondary" | "ghost";

interface BaseButtonProps {
  children: ReactNode;
  className?: string;
  disabled?: boolean;
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
};

function getButtonClassName(variant: ButtonVariant, className = "") {
  return [
    "inline-flex min-h-11 items-center justify-center gap-2 rounded-control border px-5 py-2.5 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
    variantClasses[variant],
    className,
  ]
    .filter(Boolean)
    .join(" ");
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
      variant = "primary",
      ...anchorProps
    } = props;
    const buttonClassName = getButtonClassName(variant, className);

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
    type = "button",
    variant = "primary",
    ...buttonProps
  } = props;
  const buttonClassName = getButtonClassName(variant, className);

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
