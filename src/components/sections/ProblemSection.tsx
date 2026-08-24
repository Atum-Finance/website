"use client";

import { useLayoutEffect, useRef } from "react";

import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { colors } from "@/design/tokens";
import { content } from "@/data/content";
import { getPrefersReducedMotion } from "@/hooks/useReducedMotion";
import { getAtumEase, gsap, registerMotion } from "@/motion/gsap";

export function ProblemSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const supportRef = useRef<HTMLDivElement>(null);
  const emphasisRef = useRef<HTMLSpanElement>(null);
  const termsRef = useRef<HTMLUListElement>(null);
  const resolveRef = useRef<HTMLParagraphElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);

  useLayoutEffect(() => {
    registerMotion();

    const section = sectionRef.current;
    const support = supportRef.current;
    const emphasis = emphasisRef.current;
    const termsList = termsRef.current;
    const resolve = resolveRef.current;
    const headline = headlineRef.current;

    if (!section || !support || !emphasis || !termsList || !resolve || !headline) {
      return;
    }

    const terms = termsList.querySelectorAll<HTMLElement>("[data-term]");
    const reduced = getPrefersReducedMotion();
    const ease = getAtumEase();

    if (reduced) {
      return;
    }

    const media = gsap.matchMedia();

    const ctx = gsap.context(() => {
      media.add(
        "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
        () => {
          gsap.set(terms, { autoAlpha: 0, y: 16 });
          gsap.set(resolve, { autoAlpha: 0, y: 28 });

          const timeline = gsap.timeline({
            defaults: { ease },
            scrollTrigger: {
              trigger: section,
              start: "top var(--nav-height)",
              end: "+=100%",
              pin: true,
              scrub: 0.65,
              anticipatePin: 1,
              invalidateOnRefresh: true,
            },
          });

          timeline
            .to(emphasis, { color: colors.accent, duration: 0.4 }, 0.05)
            .to(support, { autoAlpha: 0, y: -12, duration: 0.3 }, 0.25)
            .to(
              terms,
              { autoAlpha: 1, y: 0, stagger: 0.045, duration: 0.35 },
              0.38,
            )
            .to(
              terms,
              { y: 40, autoAlpha: 0, scale: 0.92, stagger: 0.02, duration: 0.4 },
              1.05,
            )
            .to(headline, { autoAlpha: 0.2, duration: 0.28 }, 1.28)
            .to(resolve, { autoAlpha: 1, y: 0, duration: 0.45 }, 1.32);
        },
      );

      media.add(
        "(max-width: 1023px) and (prefers-reduced-motion: no-preference)",
        () => {
          gsap.from(emphasis, {
            color: colors.text,
            scrollTrigger: {
              trigger: headline,
              start: "top 78%",
              end: "top 45%",
              scrub: 0.4,
            },
          });

          gsap.from(terms, {
            autoAlpha: 0,
            y: 12,
            stagger: 0.05,
            duration: 0.45,
            ease,
            scrollTrigger: {
              trigger: termsList,
              start: "top 86%",
            },
          });

          gsap.from(resolve, {
            autoAlpha: 0,
            y: 18,
            duration: 0.65,
            ease,
            scrollTrigger: {
              trigger: resolve,
              start: "top 88%",
            },
          });
        },
      );
    }, section);

    return () => {
      media.revert();
      ctx.revert();
    };
  }, []);

  return (
    <Section
      ref={sectionRef}
      id="problem"
      label="The problem"
      className="scroll-mt-[var(--nav-height)]"
    >
      <Container>
        <SectionLabel>{content.problem.label}</SectionLabel>

        <h2
          ref={headlineRef}
          className="heading-section mt-5"
        >
          Crypto ownership comes with{" "}
          <span ref={emphasisRef}>unlimited downside</span>.
        </h2>

        <div className="mt-12 grid grid-cols-4 gap-grid-mobile md:grid-cols-12 md:gap-grid-desktop lg:mt-16">
          <div
            ref={supportRef}
            className="col-span-4 max-w-xl space-y-4 text-body text-foreground-secondary md:col-span-12 md:text-body-lg lg:col-span-6"
          >
            {content.problem.body.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>

          <ul
            ref={termsRef}
            className="col-span-4 mt-8 grid grid-cols-2 gap-x-4 gap-y-3 md:col-span-12 lg:col-span-4 lg:col-start-9 lg:mt-2"
            aria-label="Derivative terminology"
          >
            {content.problem.terms.map((term) => (
              <li
                key={term}
                data-term
                className="text-technical font-medium uppercase tracking-technical text-foreground-muted lg:text-label"
              >
                {term}
              </li>
            ))}
          </ul>
        </div>

        <p
          ref={resolveRef}
          className="heading-close mt-16 md:mt-20"
        >
          {content.problem.close.map((line, index) => (
            <span key={line}>
              {index > 0 ? <br /> : null}
              {line}
            </span>
          ))}
        </p>
      </Container>
    </Section>
  );
}
