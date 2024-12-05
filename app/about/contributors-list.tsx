import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Octokit } from "octokit";
import { Contributor } from "./contributor";
import { ContributorsCard } from "./contributors-card";

export async function ContributorsList() {
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
    }
  );

  const contributors = response.data.sort(
    (a: Contributor, b: Contributor) => b.total - a.total
  );

  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold text-center mb-4">
        Stats par contributeurs
      </h2>

      {/* Carrousel pour afficher 3 cartes */}
      <Carousel
        opts={{
          align: "center", // Centrer les cartes défilantes
        }}
        className="max-w-3xl mx-auto"
      >
        <CarouselContent className="-ml-1">
          {contributors.map((contributor, index) => (
            <CarouselItem
              key={contributor.author.id}
              className="pl-1 md:basis-1/3"
            >
              <div className="p-2">
                <ContributorsCard contributor={contributor} rank={index + 1} />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}
