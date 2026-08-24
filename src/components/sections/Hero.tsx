"use client";

import { useLayoutEffect, useRef } from "react";

import { Container } from "@/components/layout/Container";
import { GridBackground } from "@/components/layout/GridBackground";
import { ArrowIcon } from "@/components/ui/ArrowIcon";
import { Button } from "@/components/ui/Button";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { HeroVisual } from "@/components/visualizations/HeroVisual";
import { content } from "@/data/content";
import { getPrefersReducedMotion } from "@/hooks/useReducedMotion";
import { resolveCtaHref } from "@/lib/cta";
import { motion } from "@/motion/config";
import { getAtumEase, gsap, registerMotion } from "@/motion/gsap";

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subheadRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);

  const primaryHref = resolveCtaHref(content.hero.primaryCta);
  const secondaryHref = resolveCtaHref(content.hero.secondaryCta);

  useLayoutEffect(() => {
    registerMotion();

    const section = sectionRef.current;
    const copy = copyRef.current;
    const heading = headingRef.current;
    const subhead = subheadRef.current;
    const cta = ctaRef.current;
    const visual = visualRef.current;

    if (!section || !copy || !heading || !subhead || !cta || !visual) {
      return;
    }

    const reduced = getPrefersReducedMotion();
    const ease = getAtumEase();

    if (reduced) {
      gsap.set([heading, subhead, cta, visual], { autoAlpha: 1, y: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.set(heading, { autoAlpha: 0, y: 24 });
      gsap.set(subhead, { autoAlpha: 0, y: 16 });
      gsap.set(cta, { autoAlpha: 0, y: 14 });

      const intro = gsap.timeline({ defaults: { ease } });
      intro
        .to(heading, { autoAlpha: 1, y: 0, duration: motion.duration.slow }, 0.55)
        .to(subhead, { autoAlpha: 1, y: 0, duration: motion.duration.base }, 0.78)
        .to(cta, { autoAlpha: 1, y: 0, duration: motion.duration.base }, 0.96);
    }, section);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      aria-label="Introduction"
      className="relative isolate min-h-dvh min-w-0 overflow-x-clip pt-[var(--nav-height)]"
    >
      <GridBackground className="absolute inset-0" />

      <div className="relative flex min-h-[calc(100dvh-var(--nav-height))] min-w-0 flex-col justify-center">
        <Container className="pointer-events-none relative z-20 flex items-center py-8 md:py-10">
          <div
            ref={copyRef}
            className="pointer-events-auto w-full min-w-0 max-w-lg lg:max-w-[32rem]"
          >
            <SectionLabel>{content.hero.eyebrow}</SectionLabel>

            <h1
              ref={headingRef}
              className="mt-5 min-w-0 text-hero font-medium uppercase tracking-hero text-foreground"
            >
              The protection
              <br />
              layer for
              <br />
              digital assets.
            </h1>

            <div
              ref={subheadRef}
              className="mt-6 max-w-sm space-y-2 text-body text-foreground-secondary"
            >
              {content.hero.subheadlines.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </div>

            <div
              ref={ctaRef}
              className="mt-8 flex w-full flex-col gap-3 sm:max-w-none sm:flex-row sm:flex-wrap sm:items-center"
            >
              <Button
                href={primaryHref ?? ""}
                size="lg"
                tooltip="Coming soon"
                className="group w-full sm:w-auto"
              >
                {content.hero.primaryCta.label}
                <ArrowIcon />
              </Button>
              <Button
                href={secondaryHref ?? ""}
                variant="secondary"
                size="lg"
                className="w-full sm:w-auto"
              >
                {content.hero.secondaryCta.label}
              </Button>
            </div>
          </div>
        </Container>

        <div
          ref={visualRef}
          className="relative z-[1] min-h-[11rem] w-full min-w-0 flex-1 max-h-[40vh] sm:min-h-[14rem] lg:absolute lg:inset-y-0 lg:right-gutter-desktop lg:max-h-none lg:min-h-0 lg:w-[min(62vw,calc(100%-5rem))]"
        >
          <HeroVisual className="h-full w-full" />
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-content h-px bg-accent/30" />
    </section>
  );
}
