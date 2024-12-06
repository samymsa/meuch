"use client";

import { ExpandableCard } from "@/components/ui/expandable-card";
import { SparklesCore } from "@/components/ui/sparkles";
import Image from "next/image";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default function Home() {
  return (
    <main className="h-screen w-screen bg-black overflow-auto flex flex-col justify-center items-center">
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
      {/* <div className="inset-0 flex justify-center items-center z-10 h-full">
        <OceanBackground className="max-w-4xl mx-auto pb-40"></OceanBackground>
      </div> */}

      <div className="relative border-red-400 border">
        <Image
          width={200}
          height={200}
          src="/human_body.png"
          alt="Human Body"
          className="z-10"
        />
        <ExpandableCard />
      </div>

      <Link
        href="https://github.com/samymsa/meuch"
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
