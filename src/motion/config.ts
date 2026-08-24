export const motion = {
  ease: {
    /** Primary Atum easing. Slow, precise, premium. */
    premium: "cubic-bezier(0.22, 1, 0.36, 1)",
    /** GSAP CustomEase equivalent of `premium`. */
    gsap: "M0,0 C0.22,1 0.36,1 1,1",
    linear: "linear",
  },
  duration: {
    instant: 0.12,
    fast: 0.28,
    base: 0.55,
    slow: 0.9,
    slower: 1.35,
    path: 1.2,
  },
  stagger: {
    tight: 0.04,
    base: 0.08,
    loose: 0.14,
  },
  reveal: {
    y: 24,
    durationKey: "base" as const,
  },
  slide: {
    y: 32,
    x: 24,
    durationKey: "base" as const,
  },
  fade: {
    durationKey: "base" as const,
  },
  scroll: {
    start: "top 80%",
    end: "bottom 20%",
  },
} as const;

export type MotionEase = keyof typeof motion.ease;
export type MotionDuration = keyof typeof motion.duration;
