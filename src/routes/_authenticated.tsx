import { createRootRouteWithContext, redirect } from "@tanstack/react-router";

export interface RouterContext {
  isAuthenticated: boolean;
  isLoading: boolean;
}

export const Route = createRootRouteWithContext<RouterContext>()({
  beforeLoad: async ({ context, location }) => {
    console.log("beforeLoad", context, location);
    if (!context.isAuthenticated && !context.isLoading) {
      throw redirect({
        to: "/login",
      });
    }
  },
});
