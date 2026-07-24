"use client";

import React, { useState, useEffect } from "react";
import { Menu, X, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { name: "Services", href: "#services" },
    { name: "Anubis DeFi", href: "#anubis-defi" },
    { name: "How We Work", href: "#how-we-work" },
    { name: "About", href: "#about" },
    { name: "Insights", href: "#insights" },
  ];

  const handleScrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.querySelector(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b h-20 flex items-center",
          isScrolled
            ? "bg-background/85 backdrop-blur-md border-border-subtle py-2"
            : "bg-transparent border-transparent py-4"
        )}
      >
        <div className="max-w-[1320px] w-full mx-auto px-6 md:px-8 flex items-center justify-between">
          {/* Logo Left */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              setMobileMenuOpen(false);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="flex items-center cursor-pointer group py-1"
          >
            <img
              src="/logo.png"
              alt="Atum Finance"
              className="h-10 md:h-12 lg:h-[50px] w-auto object-contain transition-opacity duration-200 group-hover:opacity-90"
            />
          </a>

          {/* Centered Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleScrollTo(link.href);
                }}
                className="font-mono text-[11px] font-medium uppercase tracking-wider text-text-secondary hover:text-white transition-colors duration-150 relative py-1 hover:underline decoration-accent-emerald underline-offset-4 decoration-1"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* CTA Right */}
          <div className="hidden md:flex items-center">
            <button
              onClick={() => handleScrollTo("#contact")}
              className="inline-flex items-center justify-center border border-border-subtle bg-surface text-text-primary hover:border-accent-emerald px-4 py-2 text-[10px] font-mono uppercase tracking-wider transition-colors duration-150 rounded-xs cursor-pointer"
            >
              <span>Start a Project</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-text-secondary hover:text-white transition-colors p-2 cursor-pointer focus:outline-none focus:ring-1 focus:ring-accent-emerald/40 rounded-xs"
            aria-label="Toggle Menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed inset-0 z-40 bg-background/95 backdrop-blur-xl pt-24 px-6 md:hidden flex flex-col justify-between pb-8 border-b border-border-subtle overflow-y-auto"
          >
            <div className="flex flex-col gap-6">
              <div className="h-px bg-border-subtle w-full my-1" />
              {navLinks.map((link, idx) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.04 }}
                >
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleScrollTo(link.href);
                    }}
                    className="font-mono text-sm font-semibold uppercase tracking-widest block py-2 text-text-secondary hover:text-white transition-colors"
                  >
                    {link.name}
                  </a>
                </motion.div>
              ))}
              <div className="h-px bg-border-subtle w-full my-1" />
            </div>

            <button
              onClick={() => handleScrollTo("#contact")}
              className="w-full bg-surface border border-border-subtle hover:border-accent-emerald text-text-primary py-3.5 flex items-center justify-center gap-1.5 font-mono text-xs uppercase tracking-wider rounded-xs cursor-pointer mt-6"
            >
              <span>Start a Project</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
