"use client";

import { createContext, useContext, useState } from "react";
import NotificationStack from "@/components/Notification/NotificationStack";

const NotificationContext = createContext();

export function NotificationProvider({ children }) {
  const [notifications, setNotifications] = useState([]);

  const addNotification = (type, message) => {
    setNotifications((prev) => [
      ...prev,
      { id: Date.now(), type, message },
    ]);
  };

  const removeNotification = (id) => {
    setNotifications((prev) => prev.filter((notification) => notification.id !== id));
  };

  return (
    <NotificationContext.Provider value={{ addNotification }}>
      {children}
      <NotificationStack
        notifications={notifications}
        removeNotification={removeNotification}
      />
    </NotificationContext.Provider>
  );
}

export function useNotification() {
  return useContext(NotificationContext);
}