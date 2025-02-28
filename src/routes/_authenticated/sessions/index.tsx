import { createFileRoute, Link } from "@tanstack/react-router";
import { getSessions } from "../../../lib/api/API";
import { Session } from "../../../lib/types/Session";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";

export const Route = createFileRoute("/_authenticated/sessions/")({
  loader: async () => await getSessions(),
  component: RouteComponent,
});

function RouteComponent() {
  const sessions: Session[] = Route.useLoaderData();
  return (
    <>
      <div className="flex flex-row justify-between items-center p-4">
        <h2>Sessions</h2>
        <Link to="/sessions/create">
          <Button>Create Session</Button>
        </Link>
      </div>
      <div className="p-4 flex flex-col flex-wrap gap-4">
        {sessions.map((session) => {
          return <SessionCard session={session} key={session.id} />;
        })}
      </div>
    </>
  );
}

type SessionCardProps = {
  session: Session;
};

const SessionCard = ({ session }: SessionCardProps) => {
  return (
    <Link to={"/sessions/" + session.id}>
      <Card>
        <CardHeader className="flex flex-row justify-between">
          <CardDescription>{session.name}</CardDescription>
          <CardDescription>{session.type}</CardDescription>
          <CardDescription>{session.duration}sec</CardDescription>
        </CardHeader>

        <CardContent></CardContent>
      </Card>
    </Link>
  );
};
