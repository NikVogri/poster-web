import { createContext, useState } from "react";
import createToast from "../../helpers/toast";

interface NotificationContext {
  addNotification: (
    title: string,
    description: string,
    status: "error" | "success" | "info" | "warning"
  ) => void;
}

export const NotificationContext = createContext<NotificationContext>({
  addNotification: () => {},
});

const NotificationProvider = ({ children }) => {
  // const [notification, setNotification] = useState<Notification | null>(null);

  const addNotification = (
    title: string,
    description: string,
    status: "error" | "success" | "info" | "warning"
  ) => {
    createToast(title, description, status);
  };

  return (
    <NotificationContext.Provider value={{ addNotification }}>
      {children}
    </NotificationContext.Provider>
  );
};

export default NotificationProvider;
