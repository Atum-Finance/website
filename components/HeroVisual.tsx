"use client";

import React from "react";
import { motion } from "framer-motion";

export const HeroVisual = () => {
  // Balanced 7-node coordinates in 300x300 viewport
  const nodes = [
    { id: "center", cx: 150, cy: 150, r: 9, glow: true },
    { id: "top", cx: 150, cy: 45, r: 4.5, glow: false },
    { id: "top-right", cx: 240, cy: 97, r: 4.5, glow: false },
    { id: "bottom-right", cx: 240, cy: 203, r: 4.5, glow: false },
    { id: "bottom", cx: 150, cy: 255, r: 4.5, glow: false },
    { id: "bottom-left", cx: 60, cy: 203, r: 4.5, glow: false },
    { id: "top-left", cx: 60, cy: 97, r: 4.5, glow: false },
  ];

  // Structural lines connecting the nodes
  const connections = [
    { from: 1, to: 0 },
    { from: 2, to: 0 },
    { from: 3, to: 0 },
    { from: 4, to: 0 },
    { from: 5, to: 0 },
    { from: 6, to: 0 },
    
    // Outer perimeter ring
    { from: 1, to: 2 },
    { from: 2, to: 3 },
    { from: 3, to: 4 },
    { from: 4, to: 5 },
    { from: 5, to: 6 },
    { from: 6, to: 1 },
  ];

  // Traveling signal coordinates (slow, calm loop)
  const signalPath = [
    { cx: 150, cy: 45 },  // top
    { cx: 150, cy: 150 }, // center
    { cx: 240, cy: 203 }, // bottom-right
    { cx: 150, cy: 255 }, // bottom
    { cx: 150, cy: 150 }, // center
    { cx: 60, cy: 97 },   // top-left
    { cx: 150, cy: 45 }   // top
  ];

  return (
    <div className="w-full h-full flex items-center justify-center relative p-4">
      {/* Dynamic behind-surface light sweep for depth */}
      <div className="absolute w-[280px] h-[280px] rounded-full bg-[radial-gradient(circle_at_center,rgba(43,174,102,0.04)_0%,transparent_70%)] pointer-events-none filter blur-xl" />

      <svg
        viewBox="0 0 300 300"
        className="w-full max-w-[320px] md:max-w-[380px] h-auto select-none pointer-events-none"
      >
        <defs>
          <radialGradient id="signalGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#2BAE66" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#2BAE66" stopOpacity="0" />
          </radialGradient>
          
          <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(255, 255, 255, 0.03)" />
            <stop offset="50%" stopColor="rgba(43, 174, 102, 0.12)" />
            <stop offset="100%" stopColor="rgba(255, 255, 255, 0.03)" />
          </linearGradient>
        </defs>

        {/* 1. Animated line drawing of the network grid on load */}
        {connections.map((conn, idx) => {
          const fromNode = nodes[conn.from];
          const toNode = nodes[conn.to];
          return (
            <motion.line
              key={idx}
              x1={fromNode.cx}
              y1={fromNode.cy}
              x2={toNode.cx}
              y2={toNode.cy}
              stroke="url(#lineGrad)"
              strokeWidth="0.8"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{
                pathLength: { duration: 2.5, ease: [0.16, 1, 0.3, 1], delay: idx * 0.05 },
                opacity: { duration: 0.5, delay: idx * 0.05 }
              }}
            />
          );
        })}

        {/* 2. Expanding wave from the center node representing state transitions */}
        <motion.circle
          cx="150"
          cy="150"
          r="9"
          fill="none"
          stroke="#2BAE66"
          strokeWidth="0.5"
          animate={{
            r: [9, 85, 140],
            opacity: [0.35, 0.15, 0]
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeOut"
          }}
        />

        <motion.circle
          cx="150"
          cy="150"
          r="9"
          fill="none"
          stroke="#2BAE66"
          strokeWidth="0.5"
          animate={{
            r: [9, 85, 140],
            opacity: [0.35, 0.15, 0]
          }}
          transition={{
            duration: 6,
            delay: 3,
            repeat: Infinity,
            ease: "easeOut"
          }}
        />

        {/* 3. Traveling signal node with soft emerald trails */}
        <motion.circle
          r="4.5"
          fill="#2BAE66"
          animate={{
            cx: signalPath.map((p) => p.cx),
            cy: signalPath.map((p) => p.cy),
            opacity: [0.1, 1, 1, 1, 1, 1, 0.1]
          }}
          transition={{
            duration: 16,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        <motion.circle
          r="9"
          fill="none"
          stroke="#2BAE66"
          strokeWidth="0.5"
          strokeOpacity="0.3"
          animate={{
            cx: signalPath.map((p) => p.cx),
            cy: signalPath.map((p) => p.cy),
          }}
          transition={{
            duration: 16,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* 4. Draw static nodes with loading reveals */}
        {nodes.map((node) => (
          <g key={node.id}>
            {/* Center node specific visual detail */}
            {node.glow && (
              <>
                {/* Radial glow */}
                <circle
                  cx={node.cx}
                  cy={node.cy}
                  r="24"
                  fill="url(#signalGlow)"
                />
                
                {/* Micro outer dash ring */}
                <motion.circle
                  cx={node.cx}
                  cy={node.cy}
                  r="14"
                  fill="none"
                  stroke="rgba(43, 174, 102, 0.4)"
                  strokeWidth="0.5"
                  strokeDasharray="3 3"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                />
              </>
            )}

            {/* Node base */}
            <motion.circle
              cx={node.cx}
              cy={node.cy}
              r={node.r}
              fill="#050505"
              stroke={node.glow ? "#2BAE66" : "rgba(255, 255, 255, 0.18)"}
              strokeWidth={node.glow ? "1.2" : "0.75"}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 100, delay: node.glow ? 0.2 : 0.8 }}
            />

            {/* Inner dot */}
            <circle
              cx={node.cx}
              cy={node.cy}
              r={node.glow ? 2.5 : 1.25}
              fill={node.glow ? "#2BAE66" : "rgba(255, 255, 255, 0.4)"}
            />
          </g>
        ))}
      </svg>
    </div>
  );
};
