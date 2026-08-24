"use client";

import { useLayoutEffect, useRef } from "react";

import { Container } from "@/components/layout/Container";
import { EditorialGrid } from "@/components/layout/EditorialGrid";
import { Section } from "@/components/layout/Section";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { content } from "@/data/content";
import { getPrefersReducedMotion } from "@/hooks/useReducedMotion";
import { getAtumEase, gsap, registerMotion } from "@/motion/gsap";

export function ProtectedAssetsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const lineageRef = useRef<HTMLUListElement>(null);
  const philosophyRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    registerMotion();

    const section = sectionRef.current;
    const lineage = lineageRef.current;
    const philosophy = philosophyRef.current;

    if (!section || !lineage || !philosophy) return;

    const reduced = getPrefersReducedMotion();
    if (reduced) return;

    const ease = getAtumEase();
    const lines = lineage.querySelectorAll("li");
    const statements = philosophy.querySelectorAll("p");

    const ctx = gsap.context(() => {
      gsap.from(lines, {
        autoAlpha: 0,
        y: 18,
        stagger: 0.12,
        duration: 0.7,
        ease,
        scrollTrigger: {
          trigger: lineage,
          start: "top 82%",
        },
      });

      gsap.from(statements, {
        autoAlpha: 0,
        y: 24,
        stagger: 0.14,
        duration: 0.8,
        ease,
        scrollTrigger: {
          trigger: philosophy,
          start: "top 84%",
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <Section
      ref={sectionRef}
      id="product"
      label="Protected assets"
      className="scroll-mt-[var(--nav-height)]"
    >
      <Container>
        <SectionLabel>{content.protectedAssets.label}</SectionLabel>
        <h2 className="heading-section mt-5">
          Introducing Protected Assets.
        </h2>

        <EditorialGrid className="mt-12 items-end lg:mt-16">
          <ul
            ref={lineageRef}
            className="col-span-4 space-y-5 md:col-span-12 lg:col-span-6 lg:space-y-6"
          >
            {content.protectedAssets.lineage.map((line, index) => (
              <li
                key={line}
                className={
                  index === content.protectedAssets.lineage.length - 1
                    ? "max-w-xl text-body-lg text-accent"
                    : "max-w-xl text-body-lg text-foreground-secondary"
                }
              >
                {line}
              </li>
            ))}
          </ul>
          <p className="col-span-4 mt-8 max-w-xl text-body text-foreground-secondary md:col-span-12 md:text-body-lg lg:col-span-5 lg:col-start-8 lg:mt-0">
            {content.protectedAssets.body}
          </p>
        </EditorialGrid>

        <div ref={philosophyRef} className="mt-16 max-w-4xl md:mt-20">
          {content.protectedAssets.philosophy.map((line) => (
            <p key={line} className="heading-philosophy">
              {line}
            </p>
          ))}
        </div>
      </Container>
    </Section>
  );
}
