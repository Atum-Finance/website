"use client";

import { useLayoutEffect, useRef, useState } from "react";

import { Container } from "@/components/layout/Container";
import { EditorialGrid } from "@/components/layout/EditorialGrid";
import { Section } from "@/components/layout/Section";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ProtectionDemo } from "@/components/visualizations/ProtectionDemo";
import { content, illustrativeExample } from "@/data/content";
import { getPrefersReducedMotion } from "@/hooks/useReducedMotion";
import { getAtumEase, gsap, registerMotion, ScrollTrigger } from "@/motion/gsap";

export function HowItWorksSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const closeRef = useRef<HTMLDivElement>(null);
  const stepRefs = useRef<Array<HTMLElement | null>>([]);
  const [step, setStep] = useState(0);
  const [durationDays, setDurationDays] = useState<number>(
    illustrativeExample.durationDays,
  );
  const [protectionLevelUsd, setProtectionLevelUsd] = useState<number>(
    illustrativeExample.protectionLevelUsd,
  );

  useLayoutEffect(() => {
    registerMotion();
    const section = sectionRef.current;
    const close = closeRef.current;
    if (!section || !close) return;

    const reduced = getPrefersReducedMotion();
    const ease = getAtumEase();
    const media = gsap.matchMedia();

    const ctx = gsap.context(() => {
      const steps = stepRefs.current.filter((node): node is HTMLElement => Boolean(node));

      steps.forEach((element, index) => {
        ScrollTrigger.create({
          trigger: element,
          start: "top 58%",
          end: "bottom 42%",
          onEnter: () => setStep(index),
          onEnterBack: () => setStep(index),
        });
      });

      if (steps[0]) {
        media.add("(min-width: 1024px)", () => {
          ScrollTrigger.create({
            trigger: steps[0],
            start: "top 20%",
            onEnterBack: () => setStep(0),
          });
        });
      }

      if (!reduced) {
        gsap.from(close.children, {
          autoAlpha: 0,
          y: 22,
          stagger: 0.1,
          duration: 0.7,
          ease,
          scrollTrigger: {
            trigger: close,
            start: "top 84%",
          },
        });
      }
    }, section);

    return () => {
      media.revert();
      ctx.revert();
    };
  }, []);

  return (
    <Section
      ref={sectionRef}
      id="how-it-works"
      label="How it works"
      className="scroll-mt-[var(--nav-height)]"
    >
      <Container>
        <SectionLabel>{content.howItWorks.label}</SectionLabel>
        <h2 className="heading-section mt-5">
          Protection, reduced to four decisions.
        </h2>

        <EditorialGrid className="mt-12 lg:mt-16 lg:items-start">
          <div className="col-span-4 md:col-span-12 lg:col-span-5">
            <ol className="flex flex-col gap-12 lg:gap-0">
              {content.howItWorks.steps.map((item, index) => (
                <li
                  key={item.id}
                  ref={(node) => {
                    stepRefs.current[index] = node;
                  }}
                  className="lg:flex lg:flex-col lg:justify-center lg:py-12"
                >
                  <p
                    className={`text-technical font-medium uppercase tracking-technical transition-colors duration-motion ease-atum ${
                      step === index ? "text-accent" : "text-foreground-muted"
                    }`}
                  >
                    {item.index} — {item.title}
                  </p>
                  <p
                    className={`mt-4 max-w-md text-body-lg transition-colors duration-motion ease-atum ${
                      step === index ? "text-foreground" : "text-foreground-secondary"
                    }`}
                  >
                    {item.description}
                  </p>
                  {item.detail ? (
                    <p className="mt-3 text-technical uppercase tracking-technical text-foreground-muted">
                      {item.detail}
                    </p>
                  ) : null}
                </li>
              ))}
            </ol>
          </div>

          <div className="col-span-4 order-first mb-8 min-w-0 md:col-span-12 lg:order-none lg:col-span-7 lg:mb-0 lg:sticky lg:top-[calc(var(--nav-height)+1.5rem)] lg:max-h-[calc(100dvh-var(--nav-height)-3rem)]">
            <ProtectionDemo
              step={step}
              durationDays={durationDays}
              protectionLevelUsd={protectionLevelUsd}
              onDurationChange={setDurationDays}
              onProtectionChange={setProtectionLevelUsd}
              className="lg:min-h-[28rem]"
            />
          </div>
        </EditorialGrid>

        <div ref={closeRef} className="mt-16 max-w-3xl md:mt-20">
          <p className="heading-close">
            {content.howItWorks.closeHeadline}
          </p>
          <p className="mt-6 max-w-xl text-body-lg text-foreground-secondary">
            {content.howItWorks.closeBody}
          </p>
        </div>
      </Container>
    </Section>
  );
}
