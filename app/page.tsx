"use client";

import { ExpandableCard } from "@/components/ui/expandable-card";
import { SparklesCore } from "@/components/ui/sparkles";
import { WavyBackground } from "@/components/ui/wavy-background";
import Image from "next/image";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default function Home() {
  return (
    <main className="h-screen w-screen bg-black overflow-auto flex flex-col justify-center items-center">
      <WavyBackground
        blur={10}
        colors={["#0044cc", "#0066ff", "#33ccff", "#66d9ff", "#ffffff"]}
      ></WavyBackground>
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

      <div className="relative">
        <Image
          width={300}
          height={300}
          src="/human_body.png"
          alt="Human Body"
          className="z-10"
        />
        <ExpandableCard />
      </div>

      <Link
        href="https://github.com/samymsa/meuch"
        target="_blank"
        title="Meuch GitHub Repository"
        className="fixed bottom-4 right-4 flex items-center space-x-2 p-2"
      >
        <Image
          src="/github.svg"
          alt="GitHub Logo"
          width={24}
          height={24}
          priority
        />
      </Link>
    </main>
  );
}
