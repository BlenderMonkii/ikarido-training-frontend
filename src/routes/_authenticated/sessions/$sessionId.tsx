import { createFileRoute, Link } from "@tanstack/react-router";
import {
  addExerciseToSession,
  getExercises,
  getSessionById,
} from "../../../lib/api/API";
import { Button } from "../../../components/ui/button";
import { ExerciseCard } from "../exercises";
import { SessionExercise } from "../../../lib/types/SessionExercise";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "../../../components/ui/carousel";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../components/ui/dialog";
import { useEffect, useState } from "react";
import { Exercise } from "../../../lib/types/Exercise";
import { useMutation } from "@tanstack/react-query";
import { Session } from "../../../lib/types/Session";

export const Route = createFileRoute("/_authenticated/sessions/$sessionId")({
  loader: async ({ params }) => await getSessionById(+params.sessionId),
  component: RouteComponent,
});

function RouteComponent() {
  const session: Session = Route.useLoaderData();

  const mutation = useMutation({
    mutationFn: ({
      sessionId,
      exerciseId,
      sets,
    }: {
      sessionId: number;
      exerciseId: number;
      sets: number;
    }) => {
      return addExerciseToSession(sessionId, exerciseId, sets);
    },
  });

  const handleAddExercise = (
    sessionId: number,
    exerciseId: number,
    sets: number
  ) => {
    mutation.mutate({ sessionId, exerciseId, sets });
  };

  return (
    <div>
      <div className="flex flex-row justify-between p-4">
        <div>
          <h1>{session.name}</h1>
          <h3>{session.type}</h3>
        </div>
        <div className="flex flex-col items-end">
          <h3>{session.duration} min</h3>
        </div>
      </div>
      <div>
        <div className="flex flex-row justify-between p-2 items-center">
          <h3>Exercises</h3>
          <AddExerciseDialog
            onAdd={handleAddExercise}
            sessionId={session.id}
            alreadyAdded={session.sessionExercises.map((se) => se.exercise.id)}
          />
        </div>
        <Carousel orientation="vertical">
          <CarouselContent>
            {session.sessionExercises.map((se: SessionExercise) => (
              <CarouselItem>
                <ExerciseCard key={se.exercise.id} exercise={se.exercise} />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
      <div className="flex flex-col w-full gap-2 mt-4">
        <Button>Start</Button>
        <Button>Edit</Button>
      </div>
    </div>
  );
}

type AddExerciseDialogProps = {
  sessionId: number;
  alreadyAdded: number[];
  onAdd: (sessionId: number, exerciseId: number, sets: number) => void;
};

const AddExerciseDialog = ({
  sessionId,
  onAdd,
  alreadyAdded,
}: AddExerciseDialogProps) => {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [selectedExercises, setSelectedExercises] = useState<Exercise[]>([]);

  useEffect(() => {
    setExercises([]);
    setSelectedExercises([]);
    getExercises().then((data: Exercise[]) =>
      setExercises(data.filter((e) => !alreadyAdded.includes(e.id)))
    );
  }, []);

  const toggleSelection = (exercise: Exercise) => {
    setSelectedExercises(
      (prev) =>
        prev.includes(exercise)
          ? prev.filter((e) => e.id !== exercise.id) // Remove if already selected
          : [...prev, exercise] // Add if not selected
    );
  };

  return (
    <Dialog>
      <DialogTrigger>
        <Button>Add</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            <div>
              <span>Add Exercises</span>
              <Link to="/exercises/create">
                <Button>Create new</Button>
              </Link>
            </div>
          </DialogTitle>
        </DialogHeader>

        {exercises.length > 0 && (
          <Carousel orientation="vertical">
            <CarouselContent>
              {exercises.map((exercise) => {
                const isSelected = selectedExercises.includes(exercise);
                return (
                  <CarouselItem
                    key={exercise.id}
                    onClick={() => toggleSelection(exercise)}
                  >
                    <ExerciseCard
                      exercise={exercise}
                      className={`p-2 cursor-pointer rounded-lg ${
                        isSelected ? "bg-secondary text-white" : ""
                      }`}
                    />
                  </CarouselItem>
                );
              })}
            </CarouselContent>
          </Carousel>
        )}

        <div className="flex justify-end mt-4">
          <Button
            onClick={() => {
              selectedExercises.forEach((exercise) => {
                onAdd(sessionId, exercise.id, 3); // Default sets to 3, change as needed
              });
            }}
            disabled={selectedExercises.length === 0}
          >
            Add Selected
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
