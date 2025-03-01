import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "../components/ui/button";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { auth } = useAuth();

  useEffect(() => {
    console.log("/");
  }, [auth]);

  return (
    <div className="flex flex-col items-center p-6 gap-4">
      {auth.user ? (
        <div className="">
          <h4>Hello {auth.user.name}!</h4>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-4 ">
          <h4>Welcome To Ikarido Trainings App</h4>
          <div>
            <p>Register or Login to start your training</p>
          </div>
          <div className="flex gap-4">
            <Link to="/login">
              <Button>Login</Button>
            </Link>
            <Link to="/register">
              <Button>Register</Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
