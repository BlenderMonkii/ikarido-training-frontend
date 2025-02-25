import { createFileRoute } from "@tanstack/react-router";
import { getSessions } from "../../lib/api/API";
import { Session } from "../../lib/types/Session";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "../../components/ui/card";

export const Route = createFileRoute("/sessions/")({
  loader: async () => await getSessions(),
  component: RouteComponent,
});

function RouteComponent() {
  const sessions: Session[] = Route.useLoaderData();
  return (
    <>
      <h2>Sessions</h2>
      <div className="p-4 flex flex-col flex-wrap gap-4">
        {sessions.map((session) => {
          return <SessionCard session={session} />;
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
    <Card>
      <CardHeader className="flex flex-row justify-between">
        <CardDescription>{session.name}</CardDescription>
        <CardDescription>{session.duration}</CardDescription>
      </CardHeader>

      <CardContent></CardContent>
    </Card>
  );
};
