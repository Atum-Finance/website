import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { content } from "@/data/content";

export function VisionSection() {
  return (
    <Section
      id="vision"
      label="Long-term vision"
      className="scroll-mt-[var(--nav-height)]"
    >
      <Container>
        <SectionLabel>{content.vision.label}</SectionLabel>
        <h2 className="heading-section mt-5">
          Make every digital asset
          <br />
          a Protected Asset.
        </h2>

        <div className="copy-lede mt-6 space-y-4">
          {content.vision.body.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>

        <p className="heading-close mt-16 md:mt-20">{content.vision.close}</p>
      </Container>
    </Section>
  );
}
