"use client";

import { BentoGridDemo } from "@/components/bento-grid";
import { ExpandableCard } from "@/components/ui/expandable-card";
import { SparklesCore } from "@/components/ui/sparkles";
import {
  IconArrowWaveRightUp,
  IconChartBar,
  IconCloudRain,
  IconDroplet,
  IconRecycle,
} from "@tabler/icons-react";
import Image from "next/image";

export const dynamic = "force-dynamic";

export default function Home() {
  const exampleItems = [
    {
      title: "Le Poumon",
      description:
        "Les poumons, tout comme les océans, jouent un rôle vital dans les échanges gazeux : ils captent l'oxygène essentiel à la vie et éliminent le CO₂, rappelant l'équilibre fragile entre respiration et photosynthèse.",
      icon: <IconDroplet className="h-4 w-4 text-neutral-500" />,
    },
    {
      title: "Cycle de l'eau",
      description:
        "Le cycle de l'eau est un système fermé, où chaque goutte est continuellement recyclée à travers l'évaporation, la condensation et les précipitations.",
      icon: <IconRecycle className="h-4 w-4 text-neutral-500" />,
    },
    {
      title: "Eau potable",
      description:
        "Seulement 2.5% de l'eau sur Terre est douce, et moins de 1% est directement accessible pour la consommation humaine.",
      icon: <IconCloudRain className="h-4 w-4 text-neutral-500" />,
    },
    {
      title: "Consommation globale",
      description:
        "L'utilisation quotidienne d'eau par habitant varie de 20 à 300 litres selon les pays. L'agriculture consomme 70% de l'eau douce mondiale.",
      icon: <IconChartBar className="h-4 w-4 text-neutral-500" />,
    },
    {
      title: "Océans et climat",
      description:
        "Les océans couvrent 71% de la surface de la Terre et absorbent environ 30% du CO₂ produit par les activités humaines.",
      icon: <IconArrowWaveRightUp className="h-4 w-4 text-neutral-500" />,
    },
    {
      title: "Biodiversité marine",
      description:
        "Les écosystèmes marins sont des réservoirs de biodiversité, abritant une grande variété d'espèces animales et végétales.",
      icon: <IconDroplet className="h-4 w-4 text-neutral-500" />,
    },
  ];

  const exampleLayout = [
    "col-span-2 row-span-1", // Bloc 0
    "col-span-1 row-span-1", // Bloc 1
    "col-span-1 row-span-1", // Bloc 2
    "col-span-2 row-span-2", // Bloc 3
    "col-span-1 row-span-1", // Bloc 4
    "col-span-1 row-span-1", // Bloc 5
  ];

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
        <Image
          width={500}
          height={500}
          src="/human_body.svg"
          alt="Centered Image"
          className="z-10"
        />
      </div>

      {/* Container even lower below the image */}
      <div
        className="absolute left-0 w-full flex justify-center items-center z-10 bg-black/70 p-4 bottom-96"
        style={{ bottom: "2rem" }}
      >
        <BentoGridDemo items={exampleItems} />
      </div>
    </main>
  );
}
