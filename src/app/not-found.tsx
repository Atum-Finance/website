import { Container } from "@/components/layout/Container";
import { TextLink } from "@/components/ui/TextLink";
import { siteConfig } from "@/config/site";

export const metadata = {
  title: "Page not found",
};

export default function NotFound() {
  return (
    <main
      id="main"
      className="relative flex min-h-dvh items-center bg-background pt-[var(--nav-height)]"
    >
      <Container>
        <p className="text-technical uppercase tracking-technical text-accent">
          404
        </p>
        <h1 className="heading-section mt-5">
          This page is not available.
        </h1>
        <p className="copy-lede mt-6">
          Return to {siteConfig.name}.
        </p>
        <div className="mt-8">
          <TextLink href="/">Back to Atum</TextLink>
        </div>
      </Container>
    </main>
  );
}
