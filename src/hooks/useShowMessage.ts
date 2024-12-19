import { message } from "antd";
import { useCallback } from "react";

const useShowMessage = () => {
  const showMessage = useCallback((type: "success" | "error" | "info" | "warning", content: string) => {
    message[type](content);
  }, []);

  const showSuccess = useCallback((content: string) => showMessage("success", content), [showMessage]);
  const showError = useCallback((content: string) => showMessage("error", content), [showMessage]);
  const showInfo = useCallback((content: string) => showMessage("info", content), [showMessage]);
  const showWarning = useCallback((content: string) => showMessage("warning", content), [showMessage]);

  return { showSuccess, showError, showInfo, showWarning };
};

export default useShowMessage;
