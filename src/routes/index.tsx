import { createFileRoute, Link, redirect } from "@tanstack/react-router";
import { getExercises } from "../lib/api/API";
import { Exercise } from "../lib/types/Exercise";
import { Button } from "../components/ui/button";
import { useAuth } from "../context/AuthContext";

export const Route = createFileRoute("/")({
  loader: async () => await getExercises(),
  component: RouteComponent,
});

function RouteComponent() {
  const { auth } = useAuth();

  return (
    <div className="flex flex-col items-center p-6 gap-4">
      <h3>Welcome Home!</h3>
      {auth.user ? (
        <div className="">
          <Button>Logout</Button>
        </div>
      ) : (
        <Link to="/login">
          {" "}
          <Button>Login</Button>
        </Link>
      )}
    </div>
  );
}
