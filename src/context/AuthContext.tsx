import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import {
  getMe,
  loginUser,
  logoutUser,
  refreshToken,
  registerUser,
} from "../lib/api/API";

interface AuthUser {
  name: string;
  email: string;
}
interface AuthState {
  user: AuthUser | null;
  isLoading: boolean;
}

const AuthContext = createContext<{
  auth: AuthState;
  login: (email: string, pw: string) => Promise<void>;
  register: (name: string, email: string, pw: string) => Promise<void>;
  logout: () => Promise<void>;
}>({
  auth: { user: null, isLoading: true },
  login: async () => {},
  register: async () => {},
  logout: async () => {},
});

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [auth, setAuth] = useState<AuthState>({ user: null, isLoading: true });

  const refreshSession = async (): Promise<boolean> => {
    console.log("refreshSession");
    try {
      const success = await refreshToken();
      if (success) {
        // If token refresh was successful, update the user data
        const user = await getMe();
        setAuth({ user, isLoading: false });
        return true;
      } else {
        // If refresh failed, clear the auth state
        setAuth({ user: null, isLoading: false });
        return false;
      }
    } catch (error) {
      console.error("Session refresh failed:", error);
      setAuth({ user: null, isLoading: false });
      return false;
    }
  };

  useLayoutEffect(() => {
    console.log("main.tsx: AuthProvider: useEffect");
    getMe()
      .then((user) => {
        setAuth({ user, isLoading: false });
      })
      .catch(async (error) => {
        // If initial getMe fails, try to refresh the token
        if (error.message === "Failed to get user data") {
          await refreshSession();
        } else {
          setAuth({ user: null, isLoading: false });
        }
      });
  }, []);

  const login = async (email: string, pw: string) => {
    // call login API
    console.log("login", email, pw);
    const user = await loginUser(email, pw);
    setAuth({ user: { name: user.userName, email }, isLoading: false });
  };

  const register = async (name: string, email: string, pw: string) => {
    // call register API
    await registerUser(name, email, pw);
    setAuth({ user: { name: "John Doe", email }, isLoading: false });
  };

  const logout = async () => {
    await logoutUser();
    setAuth({ user: null, isLoading: false });
  };

  return (
    <AuthContext.Provider value={{ auth, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
export function useAuth() {
  return useContext(AuthContext);
}
