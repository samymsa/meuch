import { AnimatedTooltip } from "@/components/ui/animated-tooltip";
import { Octokit } from "octokit";

type Contributor = {
  author: {
    id: number;
    login: string;
    type: string;
    avatar_url: string;
  };
  total: number;
};

export async function Contributors() {
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

  const contributors = response.data
    .sort((a: Contributor, b: Contributor) => b.total - a.total)
    .map((contributor: Contributor, index: number) => {
      return {
        id: contributor.author.id,
        name: contributor.author.login,
        designation: `#${index + 1}`,
        image: contributor.author.avatar_url,
      };
    });

  return (
    <div className="flex flex-row items-center justify-center mb-10 w-full">
      <AnimatedTooltip items={contributors} />
    </div>
  );
}
