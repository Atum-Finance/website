"use client";

import type { ReactNode } from "react";
import { useEffect } from "react";

import { registerMotion } from "@/motion/gsap";

export function MotionProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    registerMotion();
  }, []);

  return children;
}
