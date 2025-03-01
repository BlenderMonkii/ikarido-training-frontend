import { StrictMode, useEffect } from "react";
import ReactDOM from "react-dom/client";
import {
  RouterProvider,
  createRouter,
  useLayoutEffect,
} from "@tanstack/react-router";
import { AuthProvider, useAuth } from "./context/AuthContext";
import "./index.css";

// Import the generated route tree
import { routeTree } from "./routeTree.gen";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

// Create a new router instance
const router = createRouter({
  routeTree,
  context: { isAuthenticated: false }, // Standardwert
});

// Register the router instance for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

function RouterWithAuth() {
  const { auth } = useAuth();

  useEffect(() => {
    router.update({
      context: {
        isAuthenticated: !!auth.user,
        isLoading: auth.isLoading,
      },
    });
    console.log("router updated", auth);
  }, [auth]);

  if (auth.isLoading) {
    // <-- Während Auth noch lädt, zeige einen Spinner / Skeleton
    return (
      <div className="flex justify-center items-center pt-12">
        <img
          src="./public/Ikari_Do_Rund_2000x2000_Color_PinkBlauGold2.png"
          width={100}
          height={100}
          className="flex justify-center items-center"
        />
      </div>
    );
  }

  return <RouterProvider router={router} />;
}

// Render the app
const rootElement = document.getElementById("root")!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <RouterWithAuth />
        </AuthProvider>
      </QueryClientProvider>
    </StrictMode>
  );
}
