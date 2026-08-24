import { Container } from "@/components/layout/Container";
import { EditorialGrid } from "@/components/layout/EditorialGrid";
import { Section } from "@/components/layout/Section";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ArchitectureDiagram } from "@/components/visualizations/ArchitectureDiagram";
import { ProtocolStack } from "@/components/visualizations/ProtocolStack";
import { content } from "@/data/content";

export function ArchitectureSection() {
  return (
    <Section
      id="protocol"
      label="Protocol infrastructure"
      className="scroll-mt-[var(--nav-height)]"
    >
      <Container>
        <SectionLabel>{content.architecture.label}</SectionLabel>
        <h2 className="heading-section mt-5">
          Simple on the surface.
          <br />
          Sophisticated underneath.
        </h2>
        <p className="copy-lede mt-6">{content.architecture.intro}</p>

        <EditorialGrid className="mt-12 items-start lg:mt-16">
          <div className="col-span-4 md:col-span-12 lg:col-span-4">
            <p className="text-technical uppercase tracking-technical text-accent">
              Under the hood
            </p>
            <ProtocolStack className="mt-8" />
          </div>
          <div className="col-span-4 mt-8 min-w-0 md:col-span-12 lg:col-span-8 lg:mt-0">
            <ArchitectureDiagram />
          </div>
        </EditorialGrid>

        <ul className="section-card-grid mt-16 md:mt-20">
          {content.architecture.nodes.map((node) => (
            <li key={node.id} className="section-card">
              <p className="text-label font-medium uppercase tracking-technical text-accent">
                {node.title}
              </p>
              <p className="mt-4 max-w-md text-body text-foreground-secondary">
                {node.description}
              </p>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
