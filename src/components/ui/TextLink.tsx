import type { AnchorHTMLAttributes } from "react";

import { cn, isConfiguredUrl } from "@/lib/utils";

interface TextLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  subtle?: boolean;
}

export function TextLink({
  href,
  className,
  children,
  subtle = false,
  ...props
}: TextLinkProps) {
  const configured = isConfiguredUrl(href);

  const classes = cn(
    "inline-flex items-center text-nav tracking-nav transition-colors duration-motion ease-atum",
    "underline decoration-transparent underline-offset-4 hover:decoration-accent",
    subtle ? "text-foreground-secondary hover:text-foreground" : "text-foreground hover:text-accent",
    !configured && "pointer-events-none opacity-40",
    className,
  );

  if (!configured) {
    return (
      <span className={classes} aria-disabled="true">
        {children}
      </span>
    );
  }

  return (
    <a href={href} className={classes} {...props}>
      {children}
    </a>
  );
}
