"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";

import { Logo } from "@/components/brand/Logo";
import { MenuIcon } from "@/components/ui/MenuIcon";
import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/config/site";
import { navigation } from "@/data/content";
import { useBodyScrollLock } from "@/hooks/useBodyScrollLock";
import { useScrolled } from "@/hooks/useScrolled";
import { cn, isConfiguredUrl } from "@/lib/utils";

const desktopLinkClass =
  "text-nav tracking-nav transition-colors duration-motion ease-atum hover:text-accent";

export function Navbar() {
  const scrolled = useScrolled();
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("hero");
  const menuId = useId();
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const lastFocused = useRef<HTMLElement | null>(null);

  useBodyScrollLock(open);

  const close = () => setOpen(false);
  const appHref = isConfiguredUrl(siteConfig.links.app)
    ? siteConfig.links.app
    : "/#protect";
  const appReady = isConfiguredUrl(siteConfig.links.app);

  useEffect(() => {
    const sections = [
      "hero",
      ...navigation.primary.map((item) => item.id),
      "protect",
    ]
      .map((id) => document.getElementById(id))
      .filter((node): node is HTMLElement => Boolean(node));

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        const next = visible[0]?.target.id;
        if (next) setActive(next);
      },
      {
        rootMargin: "-25% 0px -55% 0px",
        threshold: [0.1, 0.25, 0.5],
      },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!open) return;

    lastFocused.current = document.activeElement as HTMLElement | null;

    const panel = panelRef.current;
    const toggle = toggleRef.current;
    const panelFocusable = panel
      ? Array.from(
          panel.querySelectorAll<HTMLElement>(
            'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
          ),
        )
      : [];

    const focusable = [toggle, ...panelFocusable].filter(
      (node): node is HTMLElement => Boolean(node),
    );

    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    panelFocusable[0]?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        close();
        return;
      }

      if (event.key !== "Tab" || focusable.length === 0) return;

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  useEffect(() => {
    if (open) return;
    lastFocused.current?.focus();
  }, [open]);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 1024) close();
    };

    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-nav transition-[background-color,border-color,backdrop-filter] duration-motion ease-atum",
        scrolled || open
          ? "border-b border-border bg-background/80 backdrop-blur-md"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <div className="flex h-[var(--nav-height)] w-full items-center justify-between px-gutter-mobile md:px-gutter-tablet lg:grid lg:grid-cols-3 lg:px-gutter-desktop">
        <Link
          href="/#hero"
          className="relative z-10 shrink-0 justify-self-start text-foreground transition-colors duration-motion ease-atum hover:text-accent"
        >
          <Logo wordmark={siteConfig.shortName.toUpperCase()} size="header" />
        </Link>

        <nav
          aria-label="Primary"
          className="hidden items-center justify-center gap-7 lg:flex"
        >
          {navigation.primary.map((item) => (
            <a
              key={item.id}
              href={item.href}
              className={cn(
                desktopLinkClass,
                active === item.id
                  ? "text-foreground"
                  : "text-foreground-secondary",
              )}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center justify-self-end lg:flex">
          <Button
            href={appHref}
            size="sm"
            tooltip={appReady ? undefined : "Coming soon"}
            tooltipPlacement="bottom"
          >
            Launch App
          </Button>
        </div>

        <button
          ref={toggleRef}
          type="button"
          className="relative z-10 ml-auto flex size-11 shrink-0 items-center justify-center text-foreground lg:hidden"
          aria-expanded={open}
          aria-controls={menuId}
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((value) => !value)}
        >
          <MenuIcon open={open} />
        </button>
      </div>

      <div
        ref={panelRef}
        id={menuId}
        role="dialog"
        aria-modal={open}
        aria-label="Navigation menu"
        inert={!open}
        className={cn(
          "absolute inset-x-0 top-[var(--nav-height)] z-overlay h-[calc(100dvh-var(--nav-height))] bg-background px-gutter-mobile md:px-gutter-tablet lg:hidden",
          "transition-opacity duration-motion ease-atum",
          open
            ? "pointer-events-auto visible opacity-100"
            : "pointer-events-none invisible opacity-0",
        )}
      >
        <nav
          aria-label="Mobile"
          className="flex h-full flex-col justify-between pb-[max(2.5rem,env(safe-area-inset-bottom))] pt-8"
        >
          <ul className="flex flex-col gap-1">
            {navigation.primary.map((item) => (
              <li key={item.id}>
                <a
                  href={item.href}
                  onClick={close}
                  className={cn(
                    "block py-3 text-subhead font-medium tracking-section transition-colors duration-motion ease-atum hover:text-accent",
                    active === item.id
                      ? "text-accent"
                      : "text-foreground",
                  )}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          <div>
            <Button
              href={appHref}
              tooltip={appReady ? undefined : "Coming soon"}
              onClick={close}
            >
              Launch App
            </Button>
          </div>
        </nav>
      </div>
    </header>
  );
}
