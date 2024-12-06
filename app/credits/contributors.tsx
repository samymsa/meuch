import { AnimatedTooltip } from "@/components/ui/animated-tooltip";
import { Contributor } from "./contributor";

export async function Contributors({
  contributors,
}: {
  contributors: Contributor[];
}) {
  const data = contributors.map((contributor: Contributor, index: number) => {
    return {
      id: contributor.author.id,
      name: contributor.author.login,
      designation: `#${index + 1}`,
      image: contributor.author.avatar_url,
    };
  });

  return (
    <span className="flex flex-row items-center justify-center mr-2">
      <AnimatedTooltip items={data} />
    </span>
  );
}
