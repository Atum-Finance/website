"use client";

import { useRef } from "react";

import { Container } from "@/components/layout/Container";
import { EditorialGrid } from "@/components/layout/EditorialGrid";
import { Section } from "@/components/layout/Section";
import { Badge } from "@/components/ui/Badge";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { SettlementChart } from "@/components/visualizations/SettlementChart";
import { content } from "@/data/content";

export function SettlementSection() {
  const belowSceneRef = useRef<HTMLDivElement>(null);

  return (
    <Section
      id="settlement"
      label="Settlement"
      className="scroll-mt-[var(--nav-height)]"
    >
      <Container>
        <SectionLabel>{content.settlement.label}</SectionLabel>
        <h2 className="heading-section mt-5">
          Two outcomes.
          <br />
          One simple experience.
        </h2>

        <div ref={belowSceneRef} className="mt-12 lg:mt-16">
          <EditorialGrid className="items-start">
            <div className="col-span-4 md:col-span-12 lg:col-span-4">
              <p className="text-technical uppercase tracking-technical text-accent">
                Below protection
              </p>
              <h3 className="mt-4 text-subhead font-medium tracking-section text-accent">
                {content.settlement.below.title}
              </h3>
              <div className="mt-5 space-y-3 text-body text-foreground-secondary">
                {content.settlement.below.body.map((line) => (
                  <p key={line}>{line}</p>
                ))}
              </div>
            </div>
            <div className="col-span-4 mt-8 min-w-0 md:col-span-12 lg:col-span-8 lg:mt-0 lg:sticky lg:top-[calc(var(--nav-height)+1.5rem)]">
              <SettlementChart act="below" sceneRef={belowSceneRef} />
            </div>
          </EditorialGrid>
        </div>

        <div className="mt-16 border-t border-border pt-12 md:mt-20 md:pt-16">
          <p className="text-technical uppercase tracking-technical text-accent">
            {content.settlement.coverage.label}
          </p>
          <div className="mt-4">
            <Badge>{content.settlement.coverage.exampleLabel}</Badge>
          </div>
          <p className="mt-6 font-medium tabular-nums text-[clamp(3.5rem,1.8rem+8vw,8.5rem)] leading-[0.9] tracking-hero text-accent">
            {content.settlement.coverage.value}
          </p>
          <p className="copy-lede mt-6">{content.settlement.coverage.body}</p>
        </div>

        <EditorialGrid className="mt-16 items-start md:mt-20">
          <div className="col-span-4 md:col-span-12 lg:col-span-4">
            <p className="text-technical uppercase tracking-technical text-accent">
              Above protection
            </p>
            <h3 className="mt-4 text-subhead font-medium tracking-section text-accent">
              {content.settlement.above.title}
            </h3>
            <div className="mt-5 space-y-3 text-body text-foreground-secondary">
              {content.settlement.above.body.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </div>
          </div>
          <div className="col-span-4 mt-8 min-w-0 md:col-span-12 lg:col-span-8 lg:mt-0">
            <SettlementChart act="above" />
          </div>
        </EditorialGrid>
      </Container>
    </Section>
  );
}
