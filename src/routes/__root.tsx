import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { Footer } from "../components/Footer";
import { MenuIconButton } from "../components/MenuIconButton";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Header } from "../components/Header";
import { Menu } from "../components/Menu";
import { getUser } from "../api/API";

export const Route = createRootRoute({
  component: () => (
    <>
      <div className="p-2 flex gap-2">
        <Link to="/" className="[&.active]:font-bold">
          Home
        </Link>{" "}
        <Link to="/about" className="[&.active]:font-bold">
          About
        </Link>
      </div>
      <hr />
      <App />
      <TanStackRouterDevtools />
    </>
  ),
});

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 768);
  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth >= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const { data, isPending } = useQuery({
    queryKey: ["user", 1],
    queryFn: async () => {
      return await getUser(1);
    },
  });
  return (
    <div className="App">
      {isLargeScreen ? (
        <>
          <Header />
          <main>
            <h1>App</h1>
            <div className="mobile-header">
              <h1>Ikari Do</h1>
              <MenuIconButton onClick={() => setIsMenuOpen(!isMenuOpen)} />
              <Outlet />
            </div>
          </main>
          <Footer />
        </>
      ) : (
        <>
          {isMenuOpen && <Menu />}
          <main>
            <h1>App</h1>
            <Outlet />
            <div>
              {isPending ? "loading..." : <div>{JSON.stringify(data)}</div>}
            </div>
          </main>
          <Footer />
        </>
      )}
    </div>
  );
};
