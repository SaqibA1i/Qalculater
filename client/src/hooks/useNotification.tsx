import { useCallback } from "react";
import { store } from "react-notifications-component";

export enum NOTICATION {
  SUCCESS = "success",
  DANGER = "danger",
  INFO = "info",
  DEFAULT = "default",
  WARNING = "warning",
}

type NotificationReturn = {
  notify: ({
    title,
    message,
    type,
  }: {
    title: string;
    message: string;
    type: NOTICATION;
  }) => void;
};

const useNotification = (): NotificationReturn => {
  const notify = useCallback(({ title, message, type }) => {
    store.addNotification({
      title,
      message,
      type,
      insert: "top",
      container: "top-center",
      animationIn: ["animate__animated", "animate__fadeIn"],
      animationOut: ["animate__animated", "animate__fadeOut"],
      dismiss: {
        duration: 3000,
        onScreen: true,
      },
    });
  }, []);

  return { notify };
};

export default useNotification;
