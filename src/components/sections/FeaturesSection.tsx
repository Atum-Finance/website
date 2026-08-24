import { Container } from "@/components/layout/Container";
import { EditorialGrid } from "@/components/layout/EditorialGrid";
import { Section } from "@/components/layout/Section";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { content } from "@/data/content";

export function FeaturesSection() {
  const { comparison, items } = content.features;

  return (
    <Section
      id="why"
      label="Why Atum"
      className="scroll-mt-[var(--nav-height)]"
    >
      <Container>
        <SectionLabel>{content.features.label}</SectionLabel>
        <h2 className="heading-section mt-5">
          Users purchase protection.
          <br />
          Not options.
        </h2>
        <p className="copy-lede mt-6">{content.features.body}</p>

        <EditorialGrid className="mt-12 lg:mt-16">
          <div className="col-span-4 border-t border-border pt-6 md:col-span-6 lg:col-span-5">
            <p className="text-technical uppercase tracking-technical text-foreground-muted">
              {comparison.traditional.label}
            </p>
            <p className="mt-4 text-compare font-medium uppercase tracking-section text-foreground-secondary">
              {comparison.traditional.statement}
            </p>
          </div>
          <div className="col-span-4 mt-8 border-t border-accent/40 pt-6 md:col-span-6 md:mt-0 lg:col-span-5 lg:col-start-8">
            <p className="text-technical uppercase tracking-technical text-accent">
              {comparison.atum.label}
            </p>
            <p className="mt-4 text-compare font-medium uppercase tracking-section text-foreground">
              {comparison.atum.statement}
            </p>
          </div>
        </EditorialGrid>

        <ul className="section-card-grid mt-16 md:mt-20">
          {items.map((item) => (
            <li key={item.id} className="section-card">
              <p className="text-label font-medium uppercase tracking-technical text-accent">
                {item.title}
              </p>
              <p className="mt-4 max-w-md text-body text-foreground-secondary">
                {item.description}
              </p>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
