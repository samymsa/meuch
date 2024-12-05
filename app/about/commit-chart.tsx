"use client";

import * as React from "react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

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
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Octokit } from "octokit";

const chartConfig = {
  commits: {
    label: "commits",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export function CommitChart() {
  const [timeRange, setTimeRange] = React.useState("90d");
  const [chartData, setChartData] = React.useState([]);

  React.useEffect(() => {
    async function fetchData() {
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
        }
      );
      const githubData = response.data;
      console.log("githubData", githubData);
      // parse to chart data
      const chartData = githubData.map((item) => {
        const date = new Date("2024-12-05");
        date.setDate(date.getDate() + item[0]);
        date.setHours(item[1]);
        return {
          date: date.toLocaleString("fr"),
          commits: item[2],
        };
      });
      console.log("chartData", chartData);
      setChartData(chartData);
    }

    fetchData();
  }, []);

  const filteredData = chartData.filter((item) => {
    const date = new Date(item.date);
    const referenceDate = new Date("2024-06-30");
    let daysToSubtract = 90;
    if (timeRange === "30d") {
      daysToSubtract = 30;
    } else if (timeRange === "7d") {
      daysToSubtract = 7;
    }
    const startDate = new Date(referenceDate);
    startDate.setDate(startDate.getDate() - daysToSubtract);
    return date >= startDate;
  });

  return (
    <Card className="w-full">
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1 text-center sm:text-left">
          <CardTitle>Commits</CardTitle>
          <CardDescription>Total commits in the NDI</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <AreaChart data={filteredData}>
            <defs>
              <linearGradient id="fillcommits" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-commits)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-commits)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const [day, month, yearTime] = value.split("/");
                const [year, time] = yearTime.split(" ");
                const fixedDate = `${year}-${month}-${day}T${time}`;
                const formattedDate = new Date(fixedDate).toLocaleDateString(
                  "fr",
                  {
                    month: "short",
                    day: "numeric",
                    hour: "numeric",
                  }
                );
                return formattedDate;
              }}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    const [day, month, yearTime] = value.split("/");
                    const [year, time] = yearTime.split(" ");
                    const fixedDate = `${year}-${month}-${day}T${time}`;
                    const formattedDate = new Date(fixedDate).toLocaleString(
                      "fr",
                      {
                        month: "short",
                        day: "numeric",
                        hour: "numeric",
                      }
                    );
                    return formattedDate;
                  }}
                  indicator="dot"
                />
              }
            />
            <Area
              dataKey="commits"
              type="natural"
              fill="url(#fillcommits)"
              stroke="var(--color-commits)"
              stackId="a"
            />
            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
