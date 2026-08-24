import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { ArrowIcon } from "@/components/ui/ArrowIcon";
import { Button } from "@/components/ui/Button";
import { content } from "@/data/content";
import { resolveCtaHref } from "@/lib/cta";

export function FinalCtaSection() {
  const primaryHref = resolveCtaHref(content.finalCta.primaryCta) ?? "";

  return (
    <Section
      id="protect"
      label="Protect against the downside"
      className="scroll-mt-[var(--nav-height)]"
    >
      <Container>
        <h2 className="heading-statement">
          Don&apos;t predict the downside.
          <br />
          Protect against it.
        </h2>
        <p className="copy-lede mt-6">{content.finalCta.body}</p>

        <div className="mt-8">
          <Button
            href={primaryHref}
            size="lg"
            tooltip="Coming soon"
            className="group w-full sm:w-auto"
          >
            {content.finalCta.primaryCta.label}
            <ArrowIcon />
          </Button>
        </div>
      </Container>
    </Section>
  );
}
