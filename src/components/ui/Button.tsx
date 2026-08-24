import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ReactNode,
} from "react";

import { cn, isConfiguredUrl } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

const variantClass: Record<ButtonVariant, string> = {
  primary:
    "bg-accent text-background hover:bg-accent-bright",
  secondary:
    "border border-border bg-transparent text-foreground hover:border-border-hover",
  ghost:
    "bg-transparent text-foreground-secondary hover:text-foreground",
};

const sizeClass: Record<ButtonSize, string> = {
  sm: "h-9 px-3.5 text-nav",
  md: "h-11 px-5 text-nav",
  lg: "h-12 px-6 text-nav",
};

const baseClass =
  "inline-flex items-center justify-center gap-2 rounded-md font-medium tracking-nav transition-[color,background-color,border-color,opacity,transform] duration-motion ease-atum focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-foreground disabled:cursor-not-allowed disabled:opacity-40";

interface SharedProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  tooltip?: string;
  tooltipPlacement?: "top" | "bottom";
  children: ReactNode;
}

type ButtonAsButton = SharedProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children" | "className"> & {
    href?: undefined;
  };

type ButtonAsLink = SharedProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "children" | "className"> & {
    href: string;
  };

export type ButtonProps = ButtonAsButton | ButtonAsLink;

function TooltipLabel({
  text,
  placement = "top",
}: {
  text: string;
  placement?: "top" | "bottom";
}) {
  return (
    <span
      role="tooltip"
      className={cn(
        "pointer-events-none absolute left-1/2 z-overlay w-max -translate-x-1/2 rounded-sm border border-border bg-panel px-2 py-1 text-technical uppercase tracking-technical text-foreground-secondary opacity-0 shadow-glow transition-opacity duration-motion-fast ease-atum group-hover/tip:opacity-100 group-focus-within/tip:opacity-100",
        placement === "bottom"
          ? "top-[calc(100%+0.5rem)]"
          : "bottom-[calc(100%+0.5rem)]",
      )}
    >
      {text}
    </span>
  );
}

export function Button({
  variant = "primary",
  size = "md",
  className,
  tooltip,
  tooltipPlacement = "bottom",
  children,
  ...props
}: ButtonProps) {
  const classes = cn(baseClass, variantClass[variant], sizeClass[size], className);

  const wrap = (node: ReactNode) =>
    tooltip ? (
      <span className={cn("group/tip relative inline-flex", className)}>
        {node}
        <TooltipLabel text={tooltip} placement={tooltipPlacement} />
      </span>
    ) : (
      node
    );

  if ("href" in props && props.href !== undefined) {
    const { href, ...anchorProps } = props;
    const destination = isConfiguredUrl(href) ? href : undefined;

    if (!destination) {
      return wrap(
        <button
          type="button"
          className={cn(classes, tooltip && "cursor-default opacity-40")}
          disabled={!tooltip}
          aria-disabled="true"
          {...(anchorProps.onClick
            ? {
                onClick: () => {
                  (anchorProps.onClick as () => void)();
                },
              }
            : {})}
        >
          {children}
        </button>,
      );
    }

    return wrap(
      <a href={destination} className={classes} {...anchorProps}>
        {children}
      </a>,
    );
  }

  const buttonProps = props as ButtonAsButton;

  return wrap(
    <button type="button" className={classes} {...buttonProps}>
      {children}
    </button>,
  );
}
