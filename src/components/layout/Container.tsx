import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type ContainerWidth = "default" | "narrow" | "wide";
type ContainerTag = "div" | "article" | "nav" | "header" | "footer";

interface ContainerProps {
  as?: ContainerTag;
  width?: ContainerWidth;
  className?: string;
  children: ReactNode;
}

const widthClass: Record<ContainerWidth, string> = {
  narrow: "max-w-container-narrow",
  default: "max-w-container",
  wide: "max-w-container-wide",
};

export function Container({
  as: Tag = "div",
  width = "default",
  className,
  children,
}: ContainerProps) {
  return (
    <Tag
      className={cn(
        "relative mx-auto w-full px-gutter-mobile md:px-gutter-tablet lg:px-gutter-desktop",
        widthClass[width],
        className,
      )}
    >
      {children}
    </Tag>
  );
}
