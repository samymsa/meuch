import { BentoGridDemo } from "@/components/bento-grid";
import { ExpandableCard } from "@/components/ui/expandable-card";
import { SparklesCore } from "@/components/ui/sparkles";
import Image from "next/image";

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
    <main className="h-screen w-full bg-black overflow-hidden relative">
      {/* BentoGridDemo */}
      <div className="relative z-30 p-4">
        <BentoGridDemo items={exampleItems} />
      </div>

      {/* Sparkles Background Effect */}
      <div className="absolute inset-0 w-full h-full">
        <SparklesCore
          id="tsparticlesfullpage"
          background="transparent"
          minSize={0.5}
          maxSize={1}
          particleDensity={100}
          speed={0.08}
          className="w-full h-full"
          particleColor="#FFFFFF"
        />
      </div>

      {/* Expandable Card on top of the image */}
      <div className="absolute top-0 left-0 w-full h-full z-20 flex justify-center items-center">
        <ExpandableCard />
      </div>

      {/* Centered Image */}
      <div className="inset-0 flex justify-center items-center z-10 h-full">
        <Image
          width={500}
          height={500}
          src="/human_body.svg"
          alt="Centered Image"
          className="z-10"
        />
      </div>
    </main>
  );
}
