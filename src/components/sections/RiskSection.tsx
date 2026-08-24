import { Container } from "@/components/layout/Container";
import { EditorialGrid } from "@/components/layout/EditorialGrid";
import { Section } from "@/components/layout/Section";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { RiskMonitor } from "@/components/visualizations/RiskMonitor";
import { content } from "@/data/content";

export function RiskSection() {
  return (
    <Section
      id="risk"
      label="Risk management"
      className="scroll-mt-[var(--nav-height)]"
    >
      <Container>
        <SectionLabel>{content.risk.label}</SectionLabel>
        <h2 className="heading-section mt-5">
          Protection is engineered,
          <br />
          not promised.
        </h2>

        <EditorialGrid className="mt-12 items-start lg:mt-16">
          <div className="col-span-4 md:col-span-12 lg:col-span-4">
            <p className="text-technical uppercase tracking-technical text-accent">
              Designed to
            </p>
            <ul className="mt-6 space-y-4">
              {content.risk.designedTo.map((item) => (
                <li
                  key={item}
                  className="border-t border-border pt-4 text-body text-foreground-secondary first:border-t-0 first:pt-0"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="col-span-4 mt-8 min-w-0 md:col-span-12 lg:col-span-8 lg:mt-0">
            <RiskMonitor />
          </div>
        </EditorialGrid>

        <div className="mt-16 max-w-4xl md:mt-20">
          {content.risk.statements.map((line) => (
            <p key={line} className="heading-philosophy">
              {line}
            </p>
          ))}
        </div>
      </Container>
    </Section>
  );
}
