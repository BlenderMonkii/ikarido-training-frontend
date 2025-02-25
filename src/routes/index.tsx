import { createFileRoute } from "@tanstack/react-router";
import { getExercises, postExercises } from "../lib/api/API";
import { useEffect } from "react";
import { Exercise, FingerboardExercise } from "../lib/types/Exercise";
import { useMutation } from "@tanstack/react-query";

export const Route = createFileRoute("/")({
  loader: async () => await getExercises(),
  component: Index,
});

function Index() {
  // Pass the route object directly here
  const exercises = Route.useLoaderData();

  useEffect(() => {
    console.log(exercises);
  }, [exercises]);

  const mutation = useMutation({
    mutationFn: (newExercise: FingerboardExercise) => {
      return postExercises(newExercise);
    },
  });

  return (
    <div className="p-6 bg-red-100">
      <h3>Welcome Home!</h3>
      <div>
        <button
          onClick={() => {
            mutation.mutate({
              ownerId: 1,
              name: "New Exercise",
              isPublic: true,
              exerciseType: "Strength",
              timer: {
                name: "New Timer",
                duration: 60,
                activeTime: 30,
                restTime: 15,
                pauseTime: 5,
              },
              location: "Home",
              description: "New Exercise Description",
              boardName: "Default Board",
              edgeSize: 20.5,
              gripType: "Half Crimp",
              fingers: "Four Fingers",
            });
          }}
        >
          Create New Exercise
        </button>
      </div>
      <ul>
        {exercises.map((exercise: Exercise) => (
          <li key={exercise.id}>{exercise.name}</li>
        ))}
      </ul>
    </div>
  );
}
