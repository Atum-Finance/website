"use client";

import React from "react";
import { motion } from "framer-motion";

export const ServicesDiagram = () => {
  const steps = [
    { name: "Strategy", x: 40 },
    { name: "Contracts", x: 140 },
    { name: "Privacy", x: 240 },
    { name: "Applications", x: 340 },
    { name: "Infrastructure", x: 440 },
    { name: "Launch", x: 540 }
  ];

  return (
    <div className="w-full border border-border-subtle bg-surface/50 p-6 rounded-xs overflow-x-auto select-none scrollbar-thin">
      <div className="min-w-[600px] relative h-20">
        <svg viewBox="0 0 580 80" className="w-full h-full">
          {/* Base connector line */}
          <line
            x1="40"
            y1="40"
            x2="540"
            y2="40"
            stroke="rgba(255, 255, 255, 0.06)"
            strokeWidth="1.5"
          />

          {/* Active drawing line */}
          <motion.line
            x1="40"
            y1="40"
            x2="540"
            y2="40"
            stroke="#2BAE66"
            strokeWidth="1.5"
            strokeDasharray="10 100"
            animate={{ strokeDashoffset: [-580, 0] }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "linear"
            }}
          />

          {/* Draw connecting steps */}
          {steps.map((step, idx) => {
            return (
              <g key={step.name}>
                {/* Node outer circle */}
                <motion.circle
                  cx={step.x}
                  cy="40"
                  r="6"
                  fill="#050505"
                  stroke="rgba(255, 255, 255, 0.2)"
                  strokeWidth="1"
                  whileHover={{ scale: 1.1 }}
                />

                {/* Node active core dot */}
                <motion.circle
                  cx={step.x}
                  cy="40"
                  r="2.5"
                  fill="#2BAE66"
                  animate={{
                    opacity: [0.2, 1, 0.2],
                    scale: [0.9, 1.2, 0.9]
                  }}
                  transition={{
                    duration: 2,
                    delay: idx * 0.4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />

                {/* Step Label */}
                <text
                  x={step.x}
                  y="62"
                  fill="#AEB4BC"
                  fontSize="9"
                  fontFamily="monospace"
                  textAnchor="middle"
                  fontWeight="600"
                  letterSpacing="0.05em"
                >
                  {step.name.toUpperCase()}
                </text>

                {/* Arrow head indicator */}
                {idx < steps.length - 1 && (
                  <path
                    d={`M ${step.x + 48} 37 L ${step.x + 52} 40 L ${step.x + 48} 43`}
                    fill="none"
                    stroke="rgba(255, 255, 255, 0.15)"
                    strokeWidth="1.2"
                  />
                )}
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
};
