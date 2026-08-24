"use client";

import gsap from "gsap";
import { CustomEase } from "gsap/CustomEase";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { motion } from "@/motion/config";

let registered = false;

export function registerMotion(): void {
  if (registered || typeof window === "undefined") {
    return;
  }

  gsap.registerPlugin(ScrollTrigger, CustomEase);
  CustomEase.create("atum", motion.ease.gsap);
  registered = true;
}

export function getAtumEase(): string {
  return registered ? "atum" : motion.ease.premium;
}

export { gsap, ScrollTrigger };
