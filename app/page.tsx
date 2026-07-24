"use client";

import React, { useState, useRef } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  User,
  GitBranch,
  MessageSquare,
  TrendingUp,
  Cpu,
  Layers,
  Shield,
  Activity,
  Terminal
} from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { HeroVisual } from "@/components/HeroVisual";
import { ServicesDiagram } from "@/components/ServicesDiagram";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { TextArea } from "@/components/ui/TextArea";
import { Badge } from "@/components/ui/Badge";
import { fadeUpVariants, staggerContainerVariants } from "@/lib/animations";

type ProjectFormValues = {
  name: string;
  email: string;
  company: string;
  brief: string;
  stage: string;
  helpNeeded: string;
  network: string;
  timing: string;
  budget: string;
  links: string;
};

const stageOptions = ["Idea", "Defined concept", "Prototype", "Live product"];
const helpOptions = ["Strategy", "Design", "Smart contracts", "Full-stack build", "Infrastructure", "Ongoing team", "Not sure"];
const networkOptions = ["Anubis", "Another EVM network", "Multi-chain", "Not decided"];
const timingOptions = ["Immediate (< 1 month)", "1 - 3 months", "Not sure / flexible"];
const budgetOptions = ["<$15k/mo", "$15k - $30k/mo", "$30k - $60k/mo", "$60k+/mo"];

export default function Home() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [hoveredStage, setHoveredStage] = useState<string | null>(null);
  
  const timelineRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start end", "end start"]
  });
  
  // Transform timeline progress into width and active node scales
  const progressWidth = useTransform(scrollYProgress, [0.25, 0.75], ["0%", "100%"]);
  
  // Active stages scaling/coloring trigger threshold indicators
  const p1 = useTransform(scrollYProgress, [0.22, 0.3], [1, 1.25]);
  const p2 = useTransform(scrollYProgress, [0.32, 0.42], [1, 1.25]);
  const p3 = useTransform(scrollYProgress, [0.44, 0.54], [1, 1.25]);
  const p4 = useTransform(scrollYProgress, [0.56, 0.66], [1, 1.25]);
  const p5 = useTransform(scrollYProgress, [0.68, 0.78], [1, 1.25]);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors }
  } = useForm<ProjectFormValues>({
    mode: "onChange",
    defaultValues: {
      name: "",
      email: "",
      company: "",
      brief: "",
      stage: "",
      helpNeeded: "",
      network: "",
      timing: "",
      budget: "",
      links: ""
    }
  });

  const selectedStage = watch("stage");
  const selectedHelp = watch("helpNeeded");
  const selectedNetwork = watch("network");
  const selectedTiming = watch("timing");
  const selectedBudget = watch("budget");

  const onSubmit: SubmitHandler<ProjectFormValues> = async (data) => {
    setFormSubmitted(true);
  };

  const handleScrollTo = (id: string) => {
    const element = document.querySelector(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const services = [
    {
      title: "Product Strategy",
      description: "Turn an opportunity into a product people need. We shape the concept, user, market, mechanics, requirements, and roadmap before complexity compounds."
    },
    {
      title: "Protocol & Smart Contract Engineering",
      description: "Design and implement contracts, financial logic, integrations, and testing systems with security and upgrade paths considered from the start."
    },
    {
      title: "Privacy-Enabled Product Development",
      description: "Use selective disclosure, private state, view permissions, and privacy-aware interaction patterns to create products that protect users without losing utility."
    },
    {
      title: "Experience Design & Application Development",
      description: "Build clear, responsive interfaces for complex financial actions—from wallet connection and onboarding to portfolio, trading, and reporting experiences."
    },
    {
      title: "Infrastructure & Integrations",
      description: "Connect wallets, oracles, bridges, indexers, analytics, custody systems, APIs, and off-chain services into one reliable product."
    },
    {
      title: "Launch & Iteration",
      description: "Prepare for testnet and mainnet, support audits and launch operations, instrument the product, and improve it with real usage data."
    }
  ];

  const opportunities = [
    {
      title: "Private trading systems",
      description: "protect intent, positions, and strategy while keeping market activity verifiable."
    },
    {
      title: "Confidential lending and credit",
      description: "combine private borrower data with verifiable eligibility, collateral, and risk constraints."
    },
    {
      title: "Institutional treasury tools",
      description: "give organizations operational privacy, permissions, and selective reporting."
    },
    {
      title: "Private yield and asset management",
      description: "protect allocation strategies and individual positions while preserving auditable product logic."
    },
    {
      title: "RWA and compliant markets",
      description: "connect identity, eligibility, disclosure, and transfer restrictions without broadcasting sensitive information."
    },
    {
      title: "Stablecoin and payment products",
      description: "create fast, predictable financial flows with privacy appropriate to the user and transaction."
    }
  ];

  const whyPoints = [
    {
      icon: <User className="h-4.5 w-4.5 text-accent-emerald shrink-0" />,
      title: "We start with the user.",
      description: "A technically impressive protocol still needs a clear reason to exist and a usable path through it."
    },
    {
      icon: <GitBranch className="h-4.5 w-4.5 text-accent-emerald shrink-0" />,
      title: "We design the whole system.",
      description: "Product mechanics, smart contracts, interface, infrastructure, and operations are developed as connected parts."
    },
    {
      icon: <MessageSquare className="h-4.5 w-4.5 text-accent-emerald shrink-0" />,
      title: "We communicate clearly.",
      description: "Decisions, risks, scope, and progress stay visible throughout the engagement."
    },
    {
      icon: <TrendingUp className="h-4.5 w-4.5 text-accent-emerald shrink-0" />,
      title: "We build for what comes after launch.",
      description: "Maintainability, analytics, iteration, and ownership are part of delivery—not an afterthought."
    }
  ];

  const timelineStages = [
    {
      num: "01",
      name: "Define",
      description: "Align on the user, problem, opportunity, constraints, and measure of success.",
      scale: p1
    },
    {
      num: "02",
      name: "Design",
      description: "Shape the product, architecture, economics, experience, and delivery plan.",
      scale: p2
    },
    {
      num: "03",
      name: "Build",
      description: "Develop in focused milestones with testable outputs and visible progress.",
      scale: p3
    },
    {
      num: "04",
      name: "Prove",
      description: "Test the system, support security review, validate assumptions, and prepare launch.",
      scale: p4
    },
    {
      num: "05",
      name: "Evolve",
      description: "Operate, measure, and improve the product as its users and market develop.",
      scale: p5
    }
  ];

  return (
    <div className="flex-1 bg-background text-foreground min-h-screen flex flex-col justify-between relative">
      <Navbar />

      {/* Layered Architectural Background Elements */}
      {/* 1. Subtle sliding engineering grid */}
      <div className="absolute inset-x-0 top-0 h-full bg-grid-pattern moving-grid opacity-15 pointer-events-none" />
      
      {/* 2. Soft moving background radial gradients */}
      <div className="absolute top-[8%] left-[10%] w-[580px] h-[580px] bg-[radial-gradient(circle,rgba(43,174,102,0.035)_0%,transparent_75%)] pointer-events-none filter blur-3xl light-sweep" />
      <div className="absolute top-[45%] right-[5%] w-[480px] h-[480px] bg-[radial-gradient(circle,rgba(43,174,102,0.02)_0%,transparent_75%)] pointer-events-none filter blur-3xl light-sweep" style={{ animationDelay: "-5s" }} />

      {/* 1. HERO SECTION */}
      <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
        <div className="max-w-[1320px] w-full mx-auto px-6 md:px-8 py-12 md:py-24 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-10 gap-12 items-center">
            
            {/* Left Side (55%) with mask / blur reveal animations */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainerVariants}
              className="lg:col-span-6 space-y-8 text-left"
            >
              <motion.div variants={fadeUpVariants} className="space-y-4">
                <span className="font-mono text-[10px] font-bold text-accent-emerald uppercase tracking-widest block">
                  PRODUCT & ENGINEERING STUDIO
                </span>
                <h1 className="text-4xl md:text-6xl font-serif font-bold tracking-tight leading-[1.08] text-white">
                  Build what private finance needs next.
                </h1>
                <p className="text-base md:text-lg text-text-secondary leading-relaxed max-w-xl">
                  Atum Finance designs and develops DeFi products, financial infrastructure, and user experiences for Anubis Chain—and for teams building beyond it.
                </p>
              </motion.div>

              {/* CTAs with premium easing lift and magnet-like bounds */}
              <motion.div variants={fadeUpVariants} className="flex flex-wrap gap-4">
                <button
                  onClick={() => handleScrollTo("#contact")}
                  className="bg-accent-emerald hover:bg-accent-emerald/90 text-background px-7 py-3.5 text-xs font-mono uppercase tracking-wider font-semibold rounded-xs transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-accent-emerald/10 cursor-pointer"
                >
                  Build with Atum
                </button>
                <button
                  onClick={() => handleScrollTo("#services")}
                  className="bg-[#101418] border border-border-subtle hover:border-white/20 text-[#FFFFFF] px-7 py-3.5 text-xs font-mono uppercase tracking-wider transition-all duration-200 hover:-translate-y-0.5 cursor-pointer"
                >
                  Explore our capabilities
                </button>
              </motion.div>

              {/* Supporting Line */}
              <motion.p
                variants={fadeUpVariants}
                className="text-[10px] text-text-secondary font-mono tracking-wider pt-4 border-t border-border-subtle max-w-lg"
              >
                Product strategy · Smart contracts · Privacy integrations · Web applications · Infrastructure
              </motion.p>
            </motion.div>

            {/* Right Side (45%) with custom SVG verification sculpture */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-4 w-full flex justify-center"
            >
              <HeroVisual />
            </motion.div>

          </div>
        </div>
      </section>

      {/* 2. THE OPPORTUNITY SECTION */}
      <motion.section
        id="anubis-defi"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="py-32 bg-[#050505] border-t border-border-subtle relative z-10"
      >
        <div className="max-w-[1320px] mx-auto px-6 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 text-left">
            <div className="lg:col-span-5 space-y-3">
              <span className="font-mono text-[10px] font-bold text-accent-emerald uppercase tracking-widest block">
                THE OPPORTUNITY
              </span>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-white leading-tight max-w-sm">
                Powerful infrastructure is only the beginning.
              </h2>
            </div>
            <div className="lg:col-span-7 flex flex-col items-start gap-6">
              <p className="text-sm md:text-base text-text-secondary leading-relaxed max-w-2xl">
                Anubis brings selective privacy, EVM compatibility, and MEV-resistant execution to a growing financial ecosystem. The next step is a deeper application layer: trading, credit, treasury, payments, yield, and real-world assets designed around those capabilities from day one.
              </p>
              <p className="text-sm md:text-base text-text-secondary leading-relaxed max-w-2xl font-semibold">
                Atum exists to build that layer.
              </p>
              <div className="pt-4">
                <button
                  onClick={() => handleScrollTo("#opportunities")}
                  className="bg-[#101418] border border-border-subtle hover:border-white/20 text-[#FFFFFF] px-6 py-2.5 text-[10px] font-mono uppercase tracking-wider transition-all duration-200 hover:-translate-y-0.5 rounded-xs cursor-pointer animate-pulse-subtle"
                >
                  See what we can build on Anubis
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* 3. SERVICES SECTION */}
      <motion.section
        id="services"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="py-32 border-t border-border-subtle relative z-10"
      >
        <div className="max-w-[1320px] mx-auto px-6 md:px-8 space-y-16">
          <div className="text-left max-w-3xl space-y-3">
            <span className="font-mono text-[10px] font-bold text-accent-emerald uppercase tracking-widest block">
              FROM IDEA TO PRODUCTION
            </span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-white leading-tight">
              One studio. The full product journey.
            </h2>
          </div>

          {/* Animated Services Schematic Diagram */}
          <ServicesDiagram />

          {/* Cards Grid with Proximity Lighting / Subtle Lift */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((svc, idx) => (
              <Card
                key={idx}
                className="flex flex-col justify-between text-left h-full border border-border-subtle bg-[#101418] p-6 hover:-translate-y-1 hover:border-accent-emerald/40 hover:shadow-lg hover:shadow-accent-emerald/[0.02] transition-all duration-300 rounded-xs"
                spotlight={true}
              >
                <div className="space-y-4">
                  <span className="font-mono text-[10px] text-accent-emerald font-bold block">
                    0{idx + 1}
                  </span>
                  <h3 className="text-lg font-serif font-semibold text-white tracking-tight">
                    {svc.title}
                  </h3>
                  <p className="text-xs text-text-secondary leading-relaxed">
                    {svc.description}
                  </p>
                </div>
              </Card>
            ))}
          </div>

          <div className="text-left pt-4">
            <button
              onClick={() => handleScrollTo("#contact")}
              className="bg-[#101418] border border-border-subtle hover:border-white/20 text-[#FFFFFF] px-6 py-2.5 text-[10px] font-mono uppercase tracking-wider transition-all duration-200 hover:-translate-y-0.5 rounded-xs cursor-pointer"
            >
              View all services
            </button>
          </div>
        </div>
      </motion.section>

      {/* 4. PRODUCT OPPORTUNITIES */}
      <motion.section
        id="opportunities"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="py-32 bg-[#050505] border-t border-border-subtle relative z-10"
      >
        <div className="max-w-[1320px] mx-auto px-6 md:px-8">
          <div className="text-left max-w-3xl mb-20 space-y-3">
            <span className="font-mono text-[10px] font-bold text-accent-emerald uppercase tracking-widest block">
              BUILT FOR ANUBIS
            </span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-white leading-tight">
              Privacy should unlock new products—not hide old ones.
            </h2>
            <p className="text-sm text-text-secondary leading-relaxed max-w-xl">
              Atum helps teams use Anubis's selective-privacy architecture to create financial experiences that are difficult to deliver on fully transparent networks.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {opportunities.map((item, idx) => (
              <Card
                key={idx}
                className="p-6 border border-border-subtle bg-[#101418] text-left rounded-xs hover:border-accent-emerald/20 transition-all duration-300"
                spotlight={true}
              >
                <h4 className="text-xs font-mono font-bold text-white uppercase tracking-widest mb-3">
                  {item.title}
                </h4>
                <p className="text-xs text-text-secondary leading-relaxed">
                  {item.description}
                </p>
              </Card>
            ))}
          </div>

          <div className="mt-16 text-left">
            <button
              onClick={() => handleScrollTo("#contact")}
              className="bg-[#101418] border border-border-subtle hover:border-white/20 text-[#FFFFFF] px-6 py-2.5 text-[10px] font-mono uppercase tracking-wider transition-all duration-200 hover:-translate-y-0.5 rounded-xs cursor-pointer"
            >
              Explore Anubis DeFi
            </button>
          </div>
        </div>
      </motion.section>

      {/* 5. WHY ATUM */}
      <motion.section
        id="about"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="py-32 border-t border-border-subtle relative z-10"
      >
        <div className="max-w-[1320px] mx-auto px-6 md:px-8">
          <div className="text-left max-w-3xl mb-20 space-y-3">
            <span className="font-mono text-[10px] font-bold text-accent-emerald uppercase tracking-widest block">
              WHY ATUM
            </span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-white leading-tight">
              Built as a product partner, not a code vendor.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-left">
            {whyPoints.map((pt, idx) => (
              <div key={idx} className="space-y-4 border-l border-border-subtle pl-6 group">
                <div className="w-8 h-8 rounded-xs border border-border-subtle bg-[#101418] flex items-center justify-center group-hover:border-accent-emerald/40 transition-colors duration-300">
                  {pt.icon}
                </div>
                <h4 className="text-xs font-mono font-bold text-white uppercase tracking-widest pt-1">
                  {pt.title}
                </h4>
                <p className="text-xs text-text-secondary leading-relaxed">
                  {pt.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* 6. PROCESS */}
      <motion.section
        id="how-we-work"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="py-32 bg-[#050505] border-t border-border-subtle relative z-10"
        ref={timelineRef}
      >
        <div className="max-w-[1320px] mx-auto px-6 md:px-8">
          <div className="text-left max-w-3xl mb-20 space-y-3">
            <span className="font-mono text-[10px] font-bold text-accent-emerald uppercase tracking-widest block">
              HOW WE WORK
            </span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-white leading-tight">
              From first principles to a working product.
            </h2>
          </div>

          {/* Timeline container */}
          <div className="relative pt-6">
            {/* Scroll animated progress line */}
            <div className="absolute top-[34px] left-0 right-0 h-[1.5px] bg-border-subtle z-0">
              <motion.div
                className="h-full bg-accent-emerald"
                style={{ width: progressWidth, originX: 0 }}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 text-left relative z-10">
              {timelineStages.map((stage) => {
                const isHovered = hoveredStage === stage.num;
                return (
                  <div
                    key={stage.num}
                    className="space-y-6 pt-1 cursor-pointer group"
                    onMouseEnter={() => setHoveredStage(stage.num)}
                    onMouseLeave={() => setHoveredStage(null)}
                  >
                    {/* Stage Dot indicator with scroll-linked scales */}
                    <motion.div
                      style={{ scale: stage.scale }}
                      className="w-4 h-4 rounded-full border border-border-subtle bg-[#050505] flex items-center justify-center transition-all duration-300 group-hover:border-accent-emerald"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-accent-emerald" />
                    </motion.div>
                    
                    <div className="space-y-2">
                      <span className="font-mono text-[10px] text-accent-emerald font-bold uppercase tracking-wider block">
                        {stage.num} / {stage.name}
                      </span>
                      
                      {/* Smooth description expand/glow on hover */}
                      <p className={`text-xs leading-relaxed pr-2 transition-colors duration-300 ${
                        isHovered ? "text-white" : "text-text-secondary"
                      }`}>
                        {stage.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-20 text-left">
            <button
              onClick={() => handleScrollTo("#contact")}
              className="bg-[#101418] border border-border-subtle hover:border-white/20 text-[#FFFFFF] px-6 py-2.5 text-[10px] font-mono uppercase tracking-wider transition-all duration-200 hover:-translate-y-0.5 rounded-xs cursor-pointer"
            >
              See how engagements work
            </button>
          </div>
        </div>
      </motion.section>

      {/* 7. FINAL CTA & BRIEF INTAKE FORM */}
      <motion.section
        id="contact"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="py-32 border-t border-border-subtle relative z-10"
      >
        <div className="max-w-[1320px] mx-auto px-6 md:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Wording copy */}
          <div className="lg:col-span-5 space-y-6 text-left">
            <Badge variant="outline" className="border-accent-emerald/30 text-accent-emerald">
              INTAKE ACTIVE
            </Badge>
            <h2 className="text-4xl font-serif font-bold text-white tracking-tight leading-tight">
              Bring us the hard problem.
            </h2>
            <p className="text-sm text-text-secondary leading-relaxed max-w-md">
              Whether you have a protocol specification, a product hypothesis, or only the beginning of an idea, we can help define the next step and build it.
            </p>
          </div>

          {/* Right Column: Brief Form */}
          <div id="insights" className="lg:col-span-7">
            {!formSubmitted ? (
              <Card className="p-8 border border-border-subtle bg-[#101418]/60 text-left hover:border-accent-emerald/15 transition-all duration-300">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  
                  {/* Name */}
                  <Input
                    label="Name"
                    placeholder="Your name"
                    error={errors.name?.message}
                    className="focus:border-accent-emerald/40 transition-colors"
                    {...register("name", { required: "Name is required" })}
                  />

                  {/* Email */}
                  <Input
                    label="Work email"
                    placeholder="name@company.com"
                    type="email"
                    error={errors.email?.message}
                    className="focus:border-accent-emerald/40 transition-colors"
                    {...register("email", {
                      required: "Work email is required",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Invalid email address"
                      }
                    })}
                  />

                  {/* Company */}
                  <Input
                    label="Company or project"
                    placeholder="e.g. Protocol / Studio name"
                    error={errors.company?.message}
                    className="focus:border-accent-emerald/40 transition-colors"
                    {...register("company", { required: "Company or project is required" })}
                  />

                  {/* Description */}
                  <TextArea
                    label="What are you building?"
                    placeholder="Describe the opportunity, core logic, or project challenges..."
                    error={errors.brief?.message}
                    className="focus:border-accent-emerald/40 transition-colors"
                    {...register("brief", { required: "Description is required" })}
                  />

                  {/* Stage */}
                  <div className="space-y-2">
                    <label className="block text-[11px] font-semibold uppercase tracking-wider text-text-secondary font-mono">
                      Where are you now?
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {stageOptions.map((opt) => (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => setValue("stage", opt, { shouldValidate: true })}
                          className={`p-2.5 text-xs rounded-xs border text-center transition-all duration-200 cursor-pointer ${
                            selectedStage === opt
                              ? "bg-accent-emerald/5 border-accent-emerald text-white font-bold"
                              : "bg-[#050505] border-border-subtle text-text-secondary hover:border-white/10"
                          }`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Help needed */}
                  <div className="space-y-2">
                    <label className="block text-[11px] font-semibold uppercase tracking-wider text-text-secondary font-mono">
                      What kind of help do you need?
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {helpOptions.map((opt) => (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => setValue("helpNeeded", opt, { shouldValidate: true })}
                          className={`p-2.5 text-xs rounded-xs border text-center transition-all duration-200 cursor-pointer ${
                            selectedHelp === opt
                              ? "bg-accent-emerald/5 border-accent-emerald text-white font-bold"
                              : "bg-[#050505] border-border-subtle text-text-secondary hover:border-white/10"
                          }`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Intended network */}
                  <div className="space-y-2">
                    <label className="block text-[11px] font-semibold uppercase tracking-wider text-text-secondary font-mono">
                      Intended network
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {networkOptions.map((opt) => (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => setValue("network", opt, { shouldValidate: true })}
                          className={`p-2.5 text-xs rounded-xs border text-center transition-all duration-200 cursor-pointer ${
                            selectedNetwork === opt
                              ? "bg-accent-emerald/5 border-accent-emerald text-white font-bold"
                              : "bg-[#050505] border-border-subtle text-text-secondary hover:border-white/10"
                          }`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Timing */}
                  <div className="space-y-2">
                    <label className="block text-[11px] font-semibold uppercase tracking-wider text-text-secondary font-mono">
                      Target timing
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {timingOptions.map((opt) => (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => setValue("timing", opt, { shouldValidate: true })}
                          className={`p-2.5 text-xs rounded-xs border text-center transition-all duration-200 cursor-pointer ${
                            selectedTiming === opt
                              ? "bg-accent-emerald/5 border-accent-emerald text-white font-bold"
                              : "bg-[#050505] border-border-subtle text-text-secondary hover:border-white/10"
                          }`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Budget */}
                  <div className="space-y-2">
                    <label className="block text-[11px] font-semibold uppercase tracking-wider text-text-secondary font-mono">
                      Budget range (optional)
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {budgetOptions.map((opt) => (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => setValue("budget", opt, { shouldValidate: true })}
                          className={`p-2.5 text-xs rounded-xs border text-center transition-all duration-200 cursor-pointer ${
                            selectedBudget === opt
                              ? "bg-accent-emerald/5 border-accent-emerald text-white font-bold"
                              : "bg-[#050505] border-border-subtle text-text-secondary hover:border-white/10"
                          }`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Links */}
                  <Input
                    label="Relevant links or files"
                    placeholder="e.g. GitHub repos, Whitepaper URLs, Notion briefs"
                    className="focus:border-accent-emerald/40 transition-colors"
                    {...register("links")}
                  />

                  {/* Submit Button & Sub-text */}
                  <div className="pt-4 space-y-4">
                    <Button
                      type="submit"
                      variant="primary"
                      className="w-full font-mono text-xs uppercase tracking-wider py-3.5 flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-accent-emerald/10 transition-all duration-300"
                    >
                      <span>Send Project Brief</span>
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                    <p className="text-[10px] text-text-secondary font-mono uppercase tracking-widest text-center">
                      Tell us what you are building. We will reply with useful next steps—not a generic sales sequence.
                    </p>
                  </div>

                </form>
              </Card>
            ) : (
              /* Success confirmation exactly matching blueprint wording */
              <Card className="p-8 border border-accent-emerald bg-accent-emerald/[0.02] text-center space-y-6">
                <div className="w-12 h-12 rounded-full border border-accent-emerald bg-accent-emerald/5 flex items-center justify-center mx-auto animate-bounce">
                  <CheckCircle2 className="h-6 w-6 text-accent-emerald" />
                </div>
                <div className="space-y-3">
                  <h3 className="text-xl font-serif font-bold text-white">Intake Brief Received</h3>
                  <p className="text-sm text-text-secondary leading-relaxed max-w-md mx-auto">
                    Brief received. We’ll review it and respond with useful next steps. If there is a strong fit, we’ll suggest a short working session to define the path forward.
                  </p>
                </div>
                <div className="pt-4">
                  <Button variant="outline" onClick={() => setFormSubmitted(false)} className="py-2.5 px-6 font-mono text-[10px] uppercase tracking-wider">
                    Submit Another Brief
                  </Button>
                </div>
              </Card>
            )}

            {/* Low friction email CTA exactly matching blueprint copy */}
            <div className="mt-6 text-center">
              <span className="font-mono text-xs text-text-secondary">
                Prefer email?{" "}
                <a href="mailto:hello@atum.finance" className="text-accent-emerald hover:text-accent-emerald/90 font-semibold underline decoration-accent-emerald/30 underline-offset-4">
                  hello@atum.finance
                </a>
              </span>
            </div>
          </div>

        </div>
      </motion.section>

      <Footer />
    </div>
  );
}
