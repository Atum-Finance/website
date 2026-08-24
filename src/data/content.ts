import type { SiteContent } from "@/types/content";

/**
 * Canonical website copy. Sourced from the Atum Finance product document.
 * Landing-page claims stay within that document. Do not invent beyond it.
 */
export const content: SiteContent = {
  hero: {
    eyebrow: "Atum Finance",
    headline: "The Protection Layer for Digital Assets.",
    subheadlines: [
      "Protect your crypto without becoming a derivatives trader.",
      "Atum transforms sophisticated downside hedging into a simple on-chain experience.",
    ],
    primaryCta: { label: "Protect My Assets", hrefKey: "app" },
    secondaryCta: {
      label: "Explore How It Works",
      hrefKey: "hash",
      hash: "/#how-it-works",
    },
  },
  problem: {
    label: "The Problem",
    headline: "Crypto ownership comes with unlimited downside.",
    body: [
      "Holding digital assets means accepting their full volatility.",
      "Sophisticated traders can hedge with derivatives.",
      "Doing so requires a stack of financial machinery most holders neither understand nor want to manage.",
    ],
    terms: [
      "Puts",
      "Strikes",
      "Expiries",
      "Implied volatility",
      "Premiums",
      "Liquidity",
      "Settlement",
      "Rolling positions",
    ],
    close: ["Protection exists.", "It is just too complicated."],
  },
  protectedAssets: {
    label: "Protected Assets",
    headline: "Introducing Protected Assets.",
    lineage: [
      "Lending made idle assets productive.",
      "Liquid staking made staked assets liquid.",
      "Atum makes holding digital assets protected.",
    ],
    body: "Atum abstracts derivatives complexity into a simple protection product. Everything underneath is infrastructure.",
    philosophy: ["Options are infrastructure.", "Protection is the product."],
  },
  ownership: {
    label: "Ownership",
    headlines: ["Protect it.", "Don't sell it."],
    body: "You do not need to sell your underlying asset to activate protection. The asset remains yours throughout the protection period.",
  },
  howItWorks: {
    label: "How It Works",
    headline: "Protection, reduced to four decisions.",
    steps: [
      {
        id: "deposit",
        index: "01",
        title: "Deposit",
        description: "Deposit a supported asset. You keep ownership.",
      },
      {
        id: "duration",
        index: "02",
        title: "Choose Duration",
        description: "Select how long you want protection.",
        detail: "7D · 14D · 30D · 60D · 90D",
      },
      {
        id: "protection",
        index: "03",
        title: "Choose Protection",
        description:
          "Select a predefined protection level. Not a strike — a simpler bucket.",
      },
      {
        id: "activate",
        index: "04",
        title: "Activate",
        description: "Pay the premium. Protection becomes active.",
      },
    ],
    closeHeadline: "That's it.",
    closeBody: "Atum handles the complexity for you.",
  },
  features: {
    label: "Why Atum",
    headline: "Users purchase protection. Not options.",
    body: "Traditional hedging asks you to manage the market. Atum asks you to choose a protection level.",
    comparison: {
      traditional: {
        label: "Traditional derivatives",
        statement: "User manages options.",
      },
      atum: {
        label: "Atum",
        statement: "Atum manages the complexity.",
      },
    },
    items: [
      {
        id: "ownership",
        title: "Retain Asset Ownership",
        description:
          "You do not need to sell your underlying asset to activate protection.",
      },
      {
        id: "choose",
        title: "Choose Your Protection",
        description: "Select duration and protection level. Atum handles the rest.",
      },
      {
        id: "hedging",
        title: "Automated Hedging",
        description:
          "Corresponding hedges are opened and monitored behind the interface.",
      },
      {
        id: "exit",
        title: "Flexible Exit",
        description:
          "Positions may be terminated before expiry according to protocol mechanics.",
      },
    ],
  },
  settlement: {
    label: "Settlement",
    headline: "Two outcomes. One simple experience.",
    above: {
      title: "If price stays above the protection level",
      body: [
        "Protection expires unused.",
        "The underlying asset is returned according to protocol mechanics.",
      ],
    },
    below: {
      title: "If price falls below the protection level",
      body: [
        "The underlying asset remains yours.",
        "Applicable USDC settlement may be provided according to the protocol's Coverage Ratio and settlement mechanics.",
      ],
    },
    coverage: {
      label: "Coverage Ratio",
      exampleLabel: "Example / illustrative",
      value: "90%",
      body: "Atum uses a configurable Coverage Ratio when calculating applicable USDC settlement.",
    },
  },
  architecture: {
    label: "Infrastructure",
    headline: "Simple on the surface. Sophisticated underneath.",
    intro:
      "The experience is simple because the infrastructure underneath is not. The user never interacts with options markets or manages derivative positions.",
    stack: [
      "User",
      "Atum Protocol",
      "Smart Contracts",
      "Premium Engine",
      "Hedging Engine",
      "Supported Derivatives Venues",
      "Settlement",
    ],
    diagramLabel: "Protocol Architecture",
    diagramNodes: [
      "User",
      "Smart Contracts",
      "Premium Engine",
      "Market Data",
      "Hedging Engine",
      "Position Database",
      "Collateral Strategies",
      "Reserve Fund",
      "Settlement",
    ],
    nodes: [
      {
        id: "contracts",
        title: "Smart Contracts",
        description: "Custody, positions, settlement, and withdrawals.",
      },
      {
        id: "premium",
        title: "Premium Engine",
        description: "Prices protection from market conditions.",
      },
      {
        id: "hedging",
        title: "Hedging Engine",
        description: "Opens and monitors corresponding hedges.",
      },
      {
        id: "settlement",
        title: "Settlement",
        description: "Resolves positions automatically at expiry or exit.",
      },
    ],
  },
  risk: {
    label: "Risk",
    headline: "Protection is engineered, not promised.",
    systems: [
      "Market Data",
      "Premium",
      "Hedge Status",
      "Position Health",
      "Settlement",
      "Reserve",
    ],
    designedTo: [
      "Price protection.",
      "Manage corresponding hedges.",
      "Monitor positions.",
      "Manage settlement.",
      "Maintain reserves.",
    ],
    statements: [
      "Atum abstracts risk management.",
      "It does not eliminate risk.",
    ],
  },
  future: {
    label: "The Future",
    headline: "Protection shouldn't stop at downside.",
    note: "These are future product opportunities.",
    products: [
      {
        id: "micro",
        title: "Micro Protection",
        description:
          "Ultra-short-duration protection intended for discrete events.",
      },
      {
        id: "target-selling",
        title: "Automated Target Selling",
        description:
          "Define a protection level, a target selling price, and a duration.",
      },
    ],
  },
  vision: {
    label: "Vision",
    headline: "Make every digital asset a Protected Asset.",
    body: [
      "Atum isn't another options interface.",
      "It isn't another derivatives exchange.",
      "It is the consumer layer for sophisticated financial infrastructure.",
    ],
    close: "It should be simple.",
  },
  finalCta: {
    headlines: ["Don't predict the downside.", "Protect against it."],
    body: "Turn sophisticated hedging infrastructure into a simple protection experience.",
    primaryCta: { label: "Protect My Assets", hrefKey: "app" },
  },
};

export const navigation = {
  primary: [
    { id: "product", label: "Product", href: "/#product" },
    { id: "how-it-works", label: "How It Works", href: "/#how-it-works" },
    { id: "settlement", label: "Settlement", href: "/#settlement" },
    { id: "protocol", label: "Protocol", href: "/#protocol" },
  ],
} as const;

export const footerNavigation = {
  brand: {
    name: "Atum Finance",
    tagline: "The protection layer for digital assets.",
  },
  columns: [
    {
      id: "product",
      title: "Product",
      links: [
        { label: "Protection", href: "/#product" },
        { label: "How It Works", href: "/#how-it-works" },
        { label: "Settlement", href: "/#settlement" },
      ],
    },
    {
      id: "protocol",
      title: "Protocol",
      links: [
        { label: "Infrastructure", href: "/#protocol" },
        { label: "Risk Disclosure", href: "/#risk" },
      ],
    },
    {
      id: "developers",
      title: "Developers",
      links: [
        { label: "Documentation", hrefKey: "docs" as const },
        { label: "GitHub", hrefKey: "github" as const },
      ],
    },
    {
      id: "community",
      title: "Community",
      links: [
        { label: "X", hrefKey: "x" as const },
        { label: "Discord", hrefKey: "discord" as const },
        { label: "Telegram", hrefKey: "telegram" as const },
      ],
    },
  ],
} as const;

export const illustrativeExample = {
  label: "Illustrative Example",
  asset: "ETH" as const,
  position: "1.00 ETH",
  protectionLevelUsd: 1400,
  durationDays: 30 as const,
  coverageRatio: 0.9,
  premium: "Illustrative",
} as const;

export const illustrativeProtectionLevels = [
  { valueUsd: 1400, label: "$1,400" },
  { valueUsd: 1300, label: "$1,300" },
  { valueUsd: 1200, label: "$1,200" },
] as const;
