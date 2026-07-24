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
            ? "bg-[#050505]/80 backdrop-blur-md border-[#ffffff]/8 py-2"
            : "bg-transparent border-transparent py-4"
        )}
      >
        <div className="max-w-[1320px] w-full mx-auto px-6 md:px-8 flex items-center justify-between">
          {/* Logo Left */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="flex items-center gap-1.5 cursor-pointer font-mono text-xs font-bold tracking-widest text-[#FFFFFF]"
          >
            <span>ATUM FINANCE</span>
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
                className="font-mono text-[11px] font-medium uppercase tracking-wider text-[#AEB4BC] hover:text-[#FFFFFF] transition-colors duration-150 relative py-1 hover:underline decoration-accent-emerald underline-offset-4 decoration-1"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* CTA Right */}
          <div className="hidden md:flex items-center">
            <button
              onClick={() => handleScrollTo("#contact")}
              className="inline-flex items-center justify-center border border-border-subtle bg-[#101418] text-[#FFFFFF] hover:border-accent-emerald px-4 py-2 text-[10px] font-mono uppercase tracking-wider transition-colors duration-150 rounded-xs cursor-pointer"
            >
              <span>Start a Project</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-[#AEB4BC] hover:text-[#FFFFFF] transition-colors cursor-pointer"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
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
            className="fixed inset-0 z-40 bg-[#050505]/95 backdrop-blur-lg pt-24 px-6 md:hidden flex flex-col justify-between pb-8 border-b border-border-subtle"
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
                    className="font-mono text-sm font-semibold uppercase tracking-widest block py-1 text-[#AEB4BC] hover:text-[#FFFFFF]"
                  >
                    {link.name}
                  </a>
                </motion.div>
              ))}
              <div className="h-px bg-border-subtle w-full my-1" />
            </div>

            <button
              onClick={() => handleScrollTo("#contact")}
              className="w-full bg-[#101418] border border-border-subtle hover:border-accent-emerald text-[#FFFFFF] py-3.5 flex items-center justify-center gap-1.5 font-mono text-xs uppercase tracking-wider rounded-xs cursor-pointer"
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
