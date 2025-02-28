import {
  createRootRoute,
  createRootRouteWithContext,
  Link,
  Outlet,
  redirect,
  useNavigate,
  useRouter,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

// interface RouterContext {
//   isAuthenticated: boolean;
//   isLoading: boolean;
// }

export const Route = createRootRoute({
  // beforeLoad: async ({ context, location }) => {
  //   // Workaround: isLoading seems to be the wrong way, maybe TanStack has some better way to handle this
  //   console.log("beforeLoad", context);
  //   if (!context.isAuthenticated) {
  //     console.log("redirecting to login");
  //     // throw redirect({
  //     //   to: "/login",
  //     // });
  //   }
  // },
  component: () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { auth, logout } = useAuth();

    const navigate = useRouter().navigate;

    const handleLogout = async () => {
      logout().then(() => {
        setIsMenuOpen(false);
      });
    };

    return (
      <>
        {!!auth.user ? (
          <div className="flex justify-between">
            {" "}
            <h1 className="p-4">Ikari-do</h1>
            <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
              <img
                src="../public/Ikari_Do_Rund_2000x2000_Color_PinkBlauGold2.png"
                width={74}
                height={74}
                className="relative top-4 right-2"
              />
            </button>
          </div>
        ) : (
          <div className="flex justify-center items-center pt-12">
            <button
              className="flex justify-center items-center"
              onClick={() => navigate({ to: "/" })}
            >
              <img
                src="../public/Ikari_Do_Rund_2000x2000_Color_PinkBlauGold2.png"
                width={100}
                height={100}
                className=""
              />
            </button>
          </div>
        )}

        {isMenuOpen && !!auth.user ? (
          <div className="flex flex-col justify-center items-center gap-2">
            <Link
              to="/"
              className="[&.active]:font-bold"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/sessions"
              className="[&.active]:font-bold"
              onClick={() => setIsMenuOpen(false)}
            >
              Sessions
            </Link>
            <Link
              to="/exercises"
              className="[&.active]:font-bold"
              onClick={() => setIsMenuOpen(false)}
            >
              Exercises
            </Link>
            <Link
              to="/about"
              className="[&.active]:font-bold"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <Link to="/login" onClick={handleLogout}>
              Logout
            </Link>
          </div>
        ) : (
          <App />
        )}
        <TanStackRouterDevtools />
      </>
    );
  },
});

const App = () => {
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth >= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="App">
      {isLargeScreen ? (
        <>
          <main className="bg-red-100">
            <h1>App</h1>
            <div className="mobile-header">
              <h1>Ikari Do</h1>
              <Outlet />
            </div>
          </main>
        </>
      ) : (
        <>
          <main className="p-4">
            <Outlet />
          </main>
        </>
      )}
    </div>
  );
};
