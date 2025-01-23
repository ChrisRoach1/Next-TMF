"use client";

import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import { TracingBeam } from "@/components/ui/tracing-beam";
import { MagicCard } from "@/components/ui/magic-card";

export default function Page() {
  const testimonials = [
    {
      quote: "Simplified our TMF processes completely",
      name: "BioPharm CRO", 
      title: "Clinical Operations Manager",
    },
    {
      quote: "Perfect for small research teams",
      name: "Clinical Trials Ltd",
      title: "Quality Manager",
    },
    {
      quote: "Regulatory compliance made easy",
      name: "MedResearch",
      title: "Head of Operations",
    },
    {
      quote: "The audit trail features are outstanding",
      name: "PharmaTech Solutions",
      title: "Quality Assurance Director",
    },
    {
      quote: "Streamlined our document management workflow",
      name: "ClinicalOps Inc",
      title: "Project Manager",
    },
    {
      quote: "Excellent support and easy implementation",
      name: "ResearchPro Labs",
      title: "IT Director",
    },
    {
      quote: "Cost-effective solution for TMF management",
      name: "SmallCRO Solutions",
      title: "CEO",
    }
  ];

  const tagline = "Purpose-built for small CROs. Simplified compliance with enterprise-grade security.";
  
  const features = [
    {
      title: "Simplified TMF Management",
      description: "Intuitive document organization and filing system designed specifically for clinical trials."
    },
    {
      title: "Regulatory Compliance",
      description: "Built-in compliance checks and audit trails to meet GCP requirements."
    },
    {
      title: "Secure Access",
      description: "Enterprise-grade security with role-based access control and data encryption."
    },
    {
      title: "Easy Implementation",
      description: "Quick setup process with minimal IT requirements and comprehensive support."
    }
  ];

  return (
    <TracingBeam>
      <main className="relative min-h-screen w-full">
        {/* Hero Section */}
        <section className="relative flex h-[80vh] w-full items-center justify-center overflow-hidden">
          <MagicCard className="flex h-[60vh] w-full max-w-4xl flex-col items-center justify-center p-6 text-center">
            <h1 className="relative z-50 bg-gradient-to-b from-neutral-200 to-neutral-500 bg-clip-text text-5xl font-bold text-transparent md:text-7xl">
              TMF Management Simplified
            </h1>
            <TextGenerateEffect 
              words={tagline}
              className="mt-6 text-xl md:text-2xl"
            />
          </MagicCard>
        </section>

        {/* Features Grid */}
        <section className="mx-auto max-w-7xl px-4 py-16">
          <h2 className="mb-16 text-center text-4xl font-bold">Key Features</h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, idx) => (
              <CardContainer key={idx} className="inter-var">
                <CardBody className="group/card relative h-auto w-full rounded-xl border border-white/[0.2] bg-black p-6 hover:shadow-2xl hover:shadow-emerald-500/[0.1]">
                  <CardItem
                    translateZ={50}
                    className="text-xl font-bold text-neutral-200"
                  >
                    {feature.title}
                  </CardItem>
                  <CardItem
                    as="p"
                    translateZ={60}
                    className="mt-2 max-w-sm text-sm text-neutral-400"
                  >
                    {feature.description}
                  </CardItem>
                </CardBody>
              </CardContainer>
            ))}
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="relative py-20">
          <div className="mx-auto max-w-7xl px-4">
            <h2 className="mb-16 text-center text-4xl font-bold">What Our Clients Say</h2>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {testimonials.map((testimonial, idx) => (
                <MagicCard
                  key={idx}
                  className="relative flex h-64 flex-col justify-between p-6"
                >
                  <p className="text-lg italic text-neutral-300">"{testimonial.quote}"</p>
                  <div className="mt-4 border-t border-neutral-700 pt-4">
                    <h3 className="text-xl font-semibold text-neutral-200">{testimonial.name}</h3>
                    <p className="text-neutral-400">{testimonial.title}</p>
                  </div>
                </MagicCard>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20">
          <div className="mx-auto max-w-4xl px-4 text-center">
            <CardContainer className="inter-var">
              <CardBody className="bg-gray-50/5 relative flex flex-col items-center justify-center gap-6 rounded-2xl px-4 py-16 backdrop-blur-2xl">
                <h2 className="text-3xl font-bold md:text-4xl">
                  Ready to Transform Your TMF Management?
                </h2>
                <p className="text-xl text-neutral-400">
                  Start your free trial today and experience the difference
                </p>
                <button className="relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none">
                  <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
                  <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-8 text-lg font-medium text-white backdrop-blur-3xl">
                    Get Started Free
                  </span>
                </button>
              </CardBody>
            </CardContainer>
          </div>
        </section>
      </main>
    </TracingBeam>
  );
}
