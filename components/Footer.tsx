"use client";

import React from "react";

export const Footer = () => {
  const handleScrollTo = (id: string) => {
    const element = document.querySelector(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const navLinks = [
    { name: "Services", href: "#services" },
    { name: "Anubis DeFi", href: "#anubis-defi" },
    { name: "How We Work", href: "#how-we-work" },
    { name: "About", href: "#about" },
    { name: "Insights", href: "#insights" },
    { name: "Contact", href: "#contact" },
  ];

  const socialLinks = [
    { name: "Email", href: "mailto:hello@atum.finance" },
    { name: "X", href: "https://x.com/atumfinance" },
    { name: "LinkedIn", href: "https://linkedin.com/company/atumfinance" },
    { name: "GitHub", href: "https://github.com/atumfinance" },
  ];

  return (
    <footer className="relative bg-background border-t border-border-subtle pt-16 pb-12 z-10 font-sans">
      <div className="max-w-[1320px] mx-auto px-6 md:px-8">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-10 pb-12 border-b border-border-subtle">
          
          {/* Logo & Headline */}
          <div className="space-y-4 max-w-sm text-left">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="inline-block cursor-pointer group"
            >
              <img
                src="/logo.png"
                alt="Atum Finance"
                className="h-11 md:h-13 w-auto object-contain transition-opacity duration-200 group-hover:opacity-90"
              />
            </a>
            <p className="text-sm text-text-secondary leading-relaxed">
              Building financial products from first principles.
            </p>
          </div>

          {/* Navigation links grid */}
          <div className="flex flex-wrap gap-x-8 gap-y-4 text-left">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleScrollTo(link.href);
                }}
                className="font-mono text-[11px] font-medium uppercase tracking-wider text-text-secondary hover:text-white transition-colors duration-150"
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>

        {/* Socials & Copyright */}
        <div className="flex flex-col sm:flex-row items-center sm:justify-between gap-6 pt-10 text-xs text-text-secondary">
          {/* Socials */}
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-6">
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-[10px] font-semibold uppercase tracking-widest text-text-secondary hover:text-white transition-colors duration-150"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Copyright Statement */}
          <div className="font-mono text-[10px] uppercase tracking-wider text-center sm:text-right text-text-secondary">
            © 2026 Atum Finance. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};
