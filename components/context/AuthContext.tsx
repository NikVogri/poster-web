import { createContext, useState } from "react";
import { useRouter } from "next/router";
import createToast from "../../helpers/toast";
import useApi from "../hooks/useApi";

interface User {
  username: string;
  email: string;
  id: number;
}

interface AuthContextInterface {
  user: User;
  logout: () => void;
  login: (email: string, password: string) => void;
  forgotPassword: (email: string) => void;
  resetPassword: (
    password: string,
    token: string
  ) => Promise<Response | boolean>;
  setAuthenticatedUser: (user: User) => void;
  userLoading: boolean;
}

const URL = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth`;

export const AuthContext = createContext<AuthContextInterface>({
  user: { username: "", email: "", id: 0 },
  logout: () => {},
  login: () => {},
  forgotPassword: () => {},
  resetPassword: async (password: string, token: string) => false,
  setAuthenticatedUser: (user: User) => {},
  userLoading: false,
});

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState<User>(null);
  const { api, loading: apiRequestLoading } = useApi();

  const router = useRouter();

  const setAuthenticatedUser = (user: User) => {
    setUser(user);
  };

  const login = async (email: string, password: string) => {
    const data = {
      email,
      password,
    };

    const user = await api(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/login`,
      "post",
      true,
      data
    );

    if (user) {
      setUser(user.user);
      createToast(
        "Authentication successful",
        "User is successfully logged in",
        "success"
      );
      router.push("/");
    }
  };

  const logout = async () => {
    await api(`${URL}/logout`, "post", true);

    setUser(null);
    createToast("Logged out", "User is successfully logged out", "success");

    router.push("/");
  };

  const forgotPassword = async (email: string) => {
    const res = await api(`${URL}/forgot-password`, "post", false, {
      email,
    });

    if (res?.success) {
      createToast(
        "Email Sent",
        "Email has been sent, please also check your spam folder",
        "success"
      );
    }

    router.push("/");
  };

  const resetPassword = async (
    password: string,
    token: string
  ): Promise<Response | boolean> => {
    const res = await api(`${URL}/reset-password`, "post", false, {
      password,
      token,
    });

    if (res?.success) {
      createToast(
        "Password successfully changed!",
        "Password changed successfully",
        "success"
      );
      return res;
    }

    return false;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        logout,
        login,
        userLoading: apiRequestLoading,
        forgotPassword,
        resetPassword,
        setAuthenticatedUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
