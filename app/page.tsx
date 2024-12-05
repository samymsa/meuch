import Image from 'next/image'
import Link from 'next/link'
import { Suspense } from 'react'
import Table from '@/components/table'
import TablePlaceholder from '@/components/table-placeholder'
import ExpandingArrow from '@/components/expanding-arrow'
import {SparklesCore} from "@/components/ui/sparkles";

export const dynamic = 'force-dynamic'

export default function Home() {
  return (
    <main className="h-screen relative w-full bg-black overflow-hidden">
      <div className="w-full absolute inset-0 h-screen">
        <SparklesCore
          id="tsparticlesfullpage"
          background="transparent"
          minSize={0.5}
          maxSize={1}
          particleDensity={50}
          speed={0.05}
          className="w-full h-full"
          particleColor="#FFFFFF"
        />
      </div>
      <Hero>

      </Hero>
    </main>
  );
}
