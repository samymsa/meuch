import { ExpandableCard } from "@/components/ui/expandable-card";
import { SparklesCore } from "@/components/ui/sparkles";
import { WavyBackground } from "@/components/ui/wavy-background";
import Image from "next/image";
import Link from "next/link";

import { BentoGridDemo } from "@/components/bento-grid";
import organesData from "../public/organes.json";

export const dynamic = "force-dynamic";

export default function Home() {
  // Transformation des données JSON pour l'adapter au format attendu par BentoGridDemo
  const exampleItems = organesData.organes.map((organe) => ({
    title: organe.nom,
    description: organe.courteDescription,
    image: organe.image,
    qrcode: organe.qrCodeLien,
    bentoGrid: organe.bentoGrid.map((item) => ({
      content: item.contenu,
      percentage: item.pourcentage || 0,
    })),
  }));

  return (
    <main className="min-h-screen w-screen bg-black overflow-auto overflow-x-hidden flex flex-col justify-center items-center">
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
        className="fixed top-0 right-0 bottom-0 left-0"
        particleColor="#FFFFFF"
      />

      <div className="flex flex-col items-center justify-center min-h-screen ">
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
      </div>

      <div id="bento">
        <BentoGridDemo items={exampleItems} />
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
