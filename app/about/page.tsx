import { CommitChart } from "./commit-chart";
import { Contributors } from "./contributors";

export default function About() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center">
      <CommitChart />
      <Contributors />
    </main>
  );
}
