import { Metadata } from "next";
import { Octokit } from "octokit";
import { CommitChart } from "./commit-chart";
import { Contributors } from "./contributors";
import { ContributorsList } from "./contributors-list";

async function getCommitsData() {
  const octokit = new Octokit({
    auth: process.env.GITHUB_ACCESS_TOKEN,
  });

  const response = await octokit.request(
    "GET /repos/{owner}/{repo}/stats/punch_card",
    {
      owner: "samymsa",
      repo: "meuch",
      headers: {
        "X-GitHub-Api-Version": "2022-11-28",
      },
    },
  );

  const githubData = response.data || [];

  const filteredData = githubData.filter((item) => item[0] > 2);

  const chartData = filteredData.map((item) => {
    const date = new Date("2024-12-01");
    date.setDate(date.getDate() + item[0]);
    date.setHours(item[1]);
    return {
      date: date.toLocaleString("fr"),
      commits: item[2],
    };
  });

  return chartData;
}

async function getContributorsData() {
  const octokit = new Octokit({
    auth: process.env.GITHUB_ACCESS_TOKEN,
  });

  const response = await octokit.request(
    "GET /repos/{owner}/{repo}/stats/contributors",
    {
      owner: "samymsa",
      repo: "meuch",
      headers: {
        "X-GitHub-Api-Version": "2022-11-28",
      },
    },
  );

  return response.data.sort((a, b) => b.total - a.total);
}

export const metadata: Metadata = {
  title: "Meuch - Crédits",
  description: "Découvrez les contributeurs de Meuch Project.",
};

export default async function About() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <main className="container mx-auto mt-8 p-4 space-y-8">
        <h1 className="text-4xl font-bold text-center">Crédits</h1>

        {/* Graphique principal */}
        <section className="space-y-2">
            <CommitChart contributors={await getCommitsData()} />
        </section>

        {/* Bloc séparateur "Top Contributors" */}
        <section className="space-y-2">
          <h2 className="text-xl font-semibold text-center">
            Classement des contributeurs
          </h2>
          <Contributors contributors={await getContributorsData()} />
        </section>

        {/* Blocs Contributor Details */}
        <section className="space-y-2">
          <ContributorsList />
        </section>
      </main>
    </div>
  );
}
