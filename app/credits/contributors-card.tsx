"use client";

import Image from "next/image";
import Link from "next/link";
import { Label, Pie, PieChart } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Contributor } from "./contributor";

export function ContributorsCard({
  contributor,
  rank,
}: {
  contributor: Contributor;
  rank: number;
}) {
  // Calcul des données pour le PieChart
  const commits = contributor.weeks.reduce((acc, week) => acc + week.c, 0);
  const additions = contributor.weeks.reduce((acc, week) => acc + week.a, 0);
  const deletions = contributor.weeks.reduce((acc, week) => acc + week.d, 0);

  const pieData = [
    { name: "Additions", value: additions, fill: "hsl(var(--chart-2))" },
    { name: "Deletions", value: deletions, fill: "hsl(var(--chart-1))" },
  ];

  const chartConfig = {
    commits: {
      label: "Commits",
      color: "hsl(var(--chart-1))",
    },
    additions: {
      label: "Additions",
      color: "hsl(var(--chart-2))",
    },
    deletions: {
      label: "Deletions",
      color: "hsl(var(--chart-3))",
    },
  } satisfies ChartConfig;

  return (
    <Card>
      <CardHeader className="pb-2">
        <Image
          height={100}
          width={100}
          src={contributor.author.avatar_url}
          alt={contributor.author.login}
          className="object-cover object-top rounded-full h-14 w-14 border-2 group-hover:scale-105 group-hover:z-30 border-white relative transition duration-500"
        />
        <CardTitle>
          <Link
            href={`https://github.com/${contributor.author.login}`}
            className="hover:underline"
          >
            @{contributor.author.login}
          </Link>
        </CardTitle>
        <CardDescription>#{rank} contributor</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart width={200} height={200}>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={pieData}
              dataKey="value"
              nameKey="name"
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {commits}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Commits
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
