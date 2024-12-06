"use client";

import { ExpandableCard } from "@/components/ui/expandable-card";
import { SparklesCore } from "@/components/ui/sparkles";
import { OceanBackground } from "@/components/ui/wavy-background";
import Image from "next/image";

export const dynamic = "force-dynamic";

export default function Home() {
  return (
    <main className="h-screen w-full bg-black overflow-hidden relative">
      <SparklesCore
        id="tsparticlesfullpage"
        background="transparent"
        minSize={0.5}
        maxSize={1}
        particleDensity={100}
        speed={0.08}
        className="absolute w-full h-full"
        particleColor="#FFFFFF"
      />
      <div className="absolute inset-0 w-full h-full"></div>
      {/* Expandable Card on top of the image */}
      <div className="absolute top-0 left-0 w-full h-full z-20 flex justify-center items-center">
        <ExpandableCard />
      </div>
      {/* Centered Image */}
      <div className="inset-0 flex justify-center items-center z-10 h-full">
        <OceanBackground className="max-w-4xl mx-auto pb-40">
          <Image
            width={300}
            height={300}
            src="/human_body.png"
            alt="Human Body"
            className="z-10"
          />
        </OceanBackground>{" "}
      </div>
    </main>
  );
}
