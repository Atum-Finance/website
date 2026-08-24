export interface Cta {
  label: string;
  hrefKey: "app" | "docs" | "hash";
  hash?: string;
}

export interface HeroContent {
  eyebrow: string;
  headline: string;
  subheadlines: readonly string[];
  primaryCta: Cta;
  secondaryCta: Cta;
}

export interface ProblemContent {
  label: string;
  headline: string;
  body: readonly string[];
  terms: readonly string[];
  close: readonly string[];
}

export interface ProtectedAssetsContent {
  label: string;
  headline: string;
  lineage: readonly string[];
  body: string;
  philosophy: readonly string[];
}

export interface OwnershipContent {
  label: string;
  headlines: readonly string[];
  body: string;
}

export interface HowItWorksContent {
  label: string;
  headline: string;
  steps: readonly {
    id: string;
    index: string;
    title: string;
    description: string;
    detail?: string;
  }[];
  closeHeadline: string;
  closeBody: string;
}

export interface FeaturesContent {
  label: string;
  headline: string;
  body: string;
  comparison: {
    traditional: { label: string; statement: string };
    atum: { label: string; statement: string };
  };
  items: readonly {
    id: string;
    title: string;
    description: string;
  }[];
}

export interface SettlementContent {
  label: string;
  headline: string;
  above: {
    title: string;
    body: readonly string[];
  };
  below: {
    title: string;
    body: readonly string[];
  };
  coverage: {
    label: string;
    exampleLabel: string;
    value: string;
    body: string;
  };
}

export interface ArchitectureContent {
  label: string;
  headline: string;
  intro: string;
  stack: readonly string[];
  diagramLabel: string;
  diagramNodes: readonly string[];
  nodes: readonly {
    id: string;
    title: string;
    description: string;
  }[];
}

export interface RiskContent {
  label: string;
  headline: string;
  systems: readonly string[];
  designedTo: readonly string[];
  statements: readonly string[];
}

export interface FutureContent {
  label: string;
  headline: string;
  note: string;
  products: readonly {
    id: string;
    title: string;
    description: string;
  }[];
}

export interface VisionContent {
  label: string;
  headline: string;
  body: readonly string[];
  close: string;
}

export interface FinalCtaContent {
  headlines: readonly string[];
  body: string;
  primaryCta: Cta;
}

export interface SiteContent {
  hero: HeroContent;
  problem: ProblemContent;
  protectedAssets: ProtectedAssetsContent;
  ownership: OwnershipContent;
  howItWorks: HowItWorksContent;
  features: FeaturesContent;
  settlement: SettlementContent;
  architecture: ArchitectureContent;
  risk: RiskContent;
  future: FutureContent;
  vision: VisionContent;
  finalCta: FinalCtaContent;
}
