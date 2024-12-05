import { AnimatedTooltip } from "@/components/ui/animated-tooltip";
import { Octokit } from "octokit";

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

  const contributors = response.data.map((contributor) => {
    console.log(contributor.author);
    return {
      id: contributor.author.id,
      name: contributor.author.login,
      designation: contributor.author.type,
      image: contributor.author.avatar_url,
    };
  });

  return <AnimatedTooltip items={contributors} />;
}
