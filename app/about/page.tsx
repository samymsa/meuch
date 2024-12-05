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

export default async function About() {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-800">
      <main className="container mx-auto mt-8 p-4">
        {/* Graphique principal */}
        <section className="mb-6">
          <h2 className="text-xl font-semibold text-center mb-4">
            Historique des commits à la Nuit De l&apos;Info 2024
          </h2>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <CommitChart contributors={await getCommitsData()} />
          </div>
        </section>

        {/* Bloc séparateur "Top Contributors" */}
        <section className="mb-4">
          <h2 className="text-xl font-semibold text-center mb-2">
            Classement des contributeurs
          </h2>
          <Contributors contributors={await getContributorsData()} />
        </section>

        {/* Blocs Contributor Details */}
        <section className="grid gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <ContributorsList />
          </div>
        </section>
      </main>

      <footer className="bg-gray-800 text-gray-400 p-4 text-center mt-8">
        <p>© 2024 Meuch Project. Built with 💙 by SamyMSA.</p>
      </footer>
    </div>
  );
}
