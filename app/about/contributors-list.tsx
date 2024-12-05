import { OctokitResponse } from "@octokit/types";
import { Octokit } from "octokit";
import { Contributor } from "./contributor";
import { ContributorsCard } from "./contributors-card";

export async function ContributorsList() {
  const octokit = new Octokit({
    auth: process.env.GITHUB_ACCESS_TOKEN,
  });

  const response: OctokitResponse<Contributor[]> = await octokit.request(
    "GET /repos/{owner}/{repo}/stats/contributors",
    {
      owner: "samymsa",
      repo: "meuch",
      headers: {
        "X-GitHub-Api-Version": "2022-11-28",
      },
    },
  );

  const contributors = response.data.sort(
    (a: Contributor, b: Contributor) => b.total - a.total,
  );

  return (
    <div className="grid grid-cols-2 gap-8">
      {contributors.map((contributor, index) => (
        <ContributorsCard
          key={contributor.author.id}
          contributor={contributor}
          rank={index + 1}
        />
      ))}
    </div>
  );
}
