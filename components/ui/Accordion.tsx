"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

interface AccordionItem {
  id: string;
  title: string;
  content: React.ReactNode;
}

export interface AccordionProps {
  items: AccordionItem[];
  className?: string;
}

export const Accordion: React.FC<AccordionProps> = ({ items, className }) => {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggle = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className={cn("divide-y divide-border-subtle border-t border-b border-border-subtle", className)}>
      {items.map((item) => {
        const isOpen = expandedId === item.id;
        return (
          <div key={item.id} className="overflow-hidden">
            <button
              onClick={() => toggle(item.id)}
              className="flex w-full items-center justify-between py-5 text-left font-sans text-base font-medium text-text-primary hover:text-white transition-colors duration-200 cursor-pointer"
            >
              <span className="font-semibold tracking-tight">{item.title}</span>
              <span className="text-text-muted flex items-center justify-center w-6 h-6 rounded-full bg-surface border border-border-subtle group-hover:border-white/20 transition-all">
                {isOpen ? (
                  <Minus className="h-3 w-3 text-accent-emerald" />
                ) : (
                  <Plus className="h-3 w-3 text-text-muted" />
                )}
              </span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="pb-6 text-sm text-text-secondary leading-relaxed font-sans pr-8">
                    {item.content}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
};
