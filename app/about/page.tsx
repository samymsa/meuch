import { CommitChart } from "./commit-chart";
import { Contributors } from "./contributors";
import { ContributorsList } from "./contributors-list";

export default function About() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center">
      <CommitChart />
      <Contributors />
      <ContributorsList />
    </main>
  );
}
