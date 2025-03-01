import { createFileRoute } from "@tanstack/react-router";
import { getExerciseById } from "../../../lib/api/API";
import { Button } from "../../../components/ui/button";
import { useEffect } from "react";
import { FingerboardExercise } from "../../../lib/types/Exercise";

export const Route = createFileRoute("/_authenticated/exercises/$exerciseId")({
  loader: async ({ params }) => await getExerciseById(+params.exerciseId),
  component: RouteComponent,
});

function RouteComponent() {
  const exercise = Route.useLoaderData() as FingerboardExercise;

  useEffect(() => {
    console.log(exercise);
  }, []);

  return (
    <div>
      <div className="flex flex-row justify-between p-4">
        <div>
          <h1>{exercise.name}</h1>
          <h3>{exercise.exerciseType}</h3>
        </div>
        <div className="flex flex-col items-end">
          <h3>{exercise.duration ?? "0"} min</h3>
          <span>{exercise.boardName}</span>
        </div>
      </div>
      <div className="flex flex-row justify-between p-4">
        <span className="grow-6">{exercise.description}</span>

        <div className="flex flex-col gap-2 grow">
          <div className="flex justify-between">
            <strong>Finger:</strong>
            <span>{exercise.fingers}</span>
          </div>
          <div className="flex justify-between">
            <strong>GripType:</strong>
            <span>{exercise.gripType}</span>
          </div>
          <div className="flex justify-between">
            <strong>EdgeSize:</strong>
            <span>{exercise.edgeSize}</span>
          </div>
        </div>
      </div>
      <div className="flex flex-col w-full gap-2 mt-4">
        <Button>Start</Button>
        <Button>Edit</Button>
      </div>
    </div>
  );
}
