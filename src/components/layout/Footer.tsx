import Link from "next/link";

import { Logo } from "@/components/brand/Logo";
import { Container } from "@/components/layout/Container";
import { siteConfig } from "@/config/site";
import { footerNavigation } from "@/data/content";
import { isConfiguredUrl } from "@/lib/utils";

type FooterLink =
  (typeof footerNavigation.columns)[number]["links"][number];

function resolveFooterHref(link: FooterLink): string {
  if ("href" in link) {
    return link.href;
  }

  return siteConfig.links[link.hrefKey];
}

function isLiveFooterLink(link: FooterLink): boolean {
  return isConfiguredUrl(resolveFooterHref(link));
}

function FooterNavLink({ link }: { link: FooterLink }) {
  const href = resolveFooterHref(link);
  const classes =
    "text-nav tracking-nav text-foreground-secondary transition-colors duration-motion ease-atum hover:text-accent";

  const external = href.startsWith("http://") || href.startsWith("https://");

  return (
    <a
      href={href}
      className={classes}
      {...(external
        ? { target: "_blank", rel: "noreferrer noopener" }
        : {})}
    >
      {link.label}
    </a>
  );
}

export function Footer() {
  const columns = footerNavigation.columns
    .map((column) => ({
      ...column,
      links: column.links.filter(isLiveFooterLink),
    }))
    .filter((column) => column.links.length > 0);

  return (
    <footer className="relative z-content border-t border-border">
      <Container className="pt-section-mobile pb-0 md:pt-section-tablet lg:pt-section-desktop">
        <div className="flex flex-col gap-10 lg:flex-row lg:justify-between lg:gap-16">
          <div className="min-w-0">
            <Link
              href="/#hero"
              className="text-foreground transition-colors duration-motion ease-atum hover:text-accent"
            >
              <Logo
                wordmark={footerNavigation.brand.name.toUpperCase()}
                size="footer"
              />
            </Link>
            <p className="mt-3 max-w-[16rem] text-nav leading-relaxed text-foreground-secondary">
              {footerNavigation.brand.tagline}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-x-8 gap-y-10 sm:flex sm:flex-wrap sm:gap-x-16">
            {columns.map((column) => (
              <nav
                key={column.id}
                aria-label={column.title}
                className="min-w-0"
              >
                <p className="text-technical uppercase tracking-technical text-foreground-muted">
                  {column.title}
                </p>
                <ul className="mt-3 flex flex-col gap-2.5">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      <FooterNavLink link={link} />
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        <p className="mt-10 border-t border-border py-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] text-technical uppercase tracking-technical text-foreground-muted">
          © 2026 Atum Finance
        </p>
      </Container>
    </footer>
  );
}
