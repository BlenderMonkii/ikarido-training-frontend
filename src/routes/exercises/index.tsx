import { createFileRoute, Link } from "@tanstack/react-router";
import { getExercises } from "../../lib/api/API";
import {
  Card,
  CardHeader,
  CardDescription,
  CardContent,
} from "../../components/ui/card";
import { Exercise } from "../../lib/types/Exercise";
import { Button } from "../../components/ui/button";

export const Route = createFileRoute("/exercises/")({
  loader: async () => await getExercises(),
  component: RouteComponent,
});

function RouteComponent() {
  const exercises = Route.useLoaderData();

  return (
    <>
      <div className="flex flex-row justify-between items-center p-2">
        <h2>Exercises</h2>
        <Link to="/exercises/create">
          <Button variant={"outline"}>Create New</Button>
        </Link>
      </div>

      <div className="flex flex-col flex-wrap gap-4">
        {exercises.map((exercise: Exercise) => {
          return <ExerciseCard exercise={exercise} />;
        })}
      </div>
    </>
  );
}

type ExerciseCardProps = {
  exercise: Exercise;
};

const ExerciseCard = ({ exercise }: ExerciseCardProps) => {
  return (
    <Card>
      <CardHeader className="flex flex-row justify-between">
        <div>
          <CardDescription>{exercise.name}</CardDescription>
          <CardDescription>{exercise.exerciseType}</CardDescription>
        </div>
        <CardDescription>{exercise.duration} min</CardDescription>
      </CardHeader>
      <CardContent>{exercise.description}</CardContent>
    </Card>
  );
};
