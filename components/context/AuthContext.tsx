import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

interface User {
  username: string;
  email: string;
  id: number;
}

interface AuthContextInterface {
  user: User;
  logout: () => void;
  login: (email: string, password: string) => void;
  userLoading: boolean;
}

export const AuthContext = createContext<AuthContextInterface>({
  user: { username: "", email: "", id: 0 },
  logout: () => {},
  login: () => {},
  userLoading: false,
});

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState<User>(null);
  const [userLoading, setUserLoading] = useState(false);

  const router = useRouter();

  const getUser = async () => {
    try {
      const user = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/me`,
        {
          withCredentials: true,
        }
      );

      if (user) {
        setUser(user.data.user);
      }
    } catch (err) {
      console.log("isAuth err", err);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      setUserLoading(true);
      const user = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/login`,
        {
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );
      setUser(user.data.user);
      router.push("/");
    } catch (err) {
      console.log("logout err", err);
    } finally {
      setUserLoading(false);
    }
  };

  const logout = async () => {
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/logout`,
        {},
        {
          withCredentials: true,
        }
      );
      setUser(null);
      router.push("/");
    } catch (err) {
      console.log("logout err", err);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, logout, login, userLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
