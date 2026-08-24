"use client";

import { useLayoutEffect, useRef } from "react";

import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { content } from "@/data/content";
import { getPrefersReducedMotion } from "@/hooks/useReducedMotion";
import { getAtumEase, gsap, registerMotion } from "@/motion/gsap";

export function OwnershipSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    registerMotion();

    const section = sectionRef.current;
    const copy = copyRef.current;
    if (!section || !copy) return;
    if (getPrefersReducedMotion()) return;

    const ease = getAtumEase();

    const ctx = gsap.context(() => {
      gsap.from(copy.children, {
        autoAlpha: 0,
        y: 22,
        stagger: 0.1,
        duration: 0.75,
        ease,
        scrollTrigger: {
          trigger: copy,
          start: "top 82%",
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <Section
      ref={sectionRef}
      id="ownership"
      label="Asset ownership"
      className="scroll-mt-[var(--nav-height)]"
    >
      <Container>
        <div ref={copyRef} className="max-w-5xl">
          <SectionLabel>{content.ownership.label}</SectionLabel>
          <h2 className="heading-statement mt-5">
            {content.ownership.headlines[0]}
            <br />
            {content.ownership.headlines[1]}
          </h2>
          <p className="copy-lede mt-6">{content.ownership.body}</p>
        </div>
      </Container>
    </Section>
  );
}
