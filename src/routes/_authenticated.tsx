import {
  createFileRoute,
  createRootRouteWithContext,
  redirect,
} from "@tanstack/react-router";
interface RouterContext {
  isAuthenticated: boolean;
  isLoading: boolean;
}
export const Route = createRootRouteWithContext<RouterContext>()({
  beforeLoad: async ({ context, location }) => {
    // Workaround: isLoading seems to be the wrong way, maybe TanStack has some better way to handle this
    console.log("beforeLoad", context);
    if (!context.isAuthenticated) {
      console.log("redirecting to login");
      throw redirect({
        to: "/login",
      });
    }
  },
});
