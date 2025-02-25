import { createFileRoute } from "@tanstack/react-router";
import { getTrainingplansByUser } from "../lib/api/API";
import { useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../components/ui/carousel";
import { Card, CardContent } from "../components/ui/card";

export const Route = createFileRoute("/calendar")({
  loader: async () => await getTrainingplansByUser(1),
  component: RouteComponent,
});

function RouteComponent() {
  const trainingplans = Route.useLoaderData();
  const [date, setDate] = useState<Date>(new Date());
  const startOfWeek = new Date(date.setDate(date.getDate() - date.getDay()));
  const daysOfWeek = Array.from({ length: 7 }).map((_, index) => {
    const day = new Date(startOfWeek);
    day.setDate(startOfWeek.getDate() + index);
    return day;
  });

  return (
    <>
      <h2>Current Week</h2>
      <Carousel className="p-2">
        <CarouselContent className="-ml-4 md:-ml-4">
          {daysOfWeek.map((day, index) => (
            <CarouselItem key={index} className="pl-4 md:pl-4">
              <div className="p-1">
                <Card>
                  <CardContent className="flex aspect-square items-center justify-center p-6">
                    <span className="text-2xl font-semibold">
                      {day.toLocaleDateString().slice(0, 2)}
                    </span>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      {trainingplans.map((trainingplan: any) => (
        <div key={trainingplan.id}>{trainingplan.name}</div>
      ))}
    </>
  );
}
