import { createContext, useEffect, useState } from "react";
import axios from "axios";
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
  resetPassword: (password: string, token: string) => void;
  userLoading: boolean;
}

const URL = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth`;

export const AuthContext = createContext<AuthContextInterface>({
  user: { username: "", email: "", id: 0 },
  logout: () => {},
  login: () => {},
  forgotPassword: () => {},
  resetPassword: () => {},
  userLoading: false,
});

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState<User>(null);
  const [userLoading, setUserLoading] = useState(false);
  const { api } = useApi();

  const router = useRouter();

  const getUser = async () => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/me`,
        { withCredentials: true }
      );

      if (res.data.user) {
        setUser(res.data.user);
      }
    } catch (err) {}
  };

  const login = async (email: string, password: string) => {
    setUserLoading(true);

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
        "Authentication successfull",
        "User is successfully logged in",
        "success"
      );
      router.push("/");
    }

    setUserLoading(false);
  };

  const logout = async () => {
    try {
      await api(`${URL}/logout`, "post", true);

      setUser(null);
      createToast("Logged out", "User is successfully logged out", "success");

      router.push("/");
    } catch (err) {
      console.log("logout err", err);
      createToast(
        "Authentication Failed",
        "Could not log you out, please try again",
        "error"
      );
    }
  };

  const forgotPassword = async (email: string) => {
    try {
      const res = await api(`${URL}/forgot-password`, "post", false, { email });

      if (res.success) {
        createToast(
          "Email Sent",
          "Email has been sent, please also check your spam folder",
          "success"
        );
      }
    } catch (err) {
      if (err.response?.data.msg) {
        createToast("Could not send email", err.response.data.msg, "error");
        return;
      }
    }
  };

  const resetPassword = async (password: string, token: string) => {
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
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        logout,
        login,
        userLoading,
        forgotPassword,
        resetPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
