import { Contributor } from "./contributor";
import { ContributorsCard } from "./contributors-card";

export async function ContributorsList({
  contributors,
}: {
  contributors: Contributor[];
}) {
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
