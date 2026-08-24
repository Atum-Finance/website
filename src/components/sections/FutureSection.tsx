import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { content } from "@/data/content";

export function FutureSection() {
  return (
    <Section
      id="future"
      label="Future products"
      className="scroll-mt-[var(--nav-height)]"
    >
      <Container>
        <SectionLabel>{content.future.label}</SectionLabel>
        <h2 className="heading-section mt-5">
          Protection shouldn&apos;t stop
          <br />
          at downside.
        </h2>
        <p className="copy-lede mt-6">{content.future.note}</p>

        <ul className="section-card-grid mt-16 md:mt-20">
          {content.future.products.map((product) => (
            <li key={product.id} className="section-card">
              <h3 className="text-subhead font-medium tracking-section text-accent">
                {product.title}
              </h3>
              <p className="mt-4 max-w-md text-body text-foreground-secondary">
                {product.description}
              </p>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
