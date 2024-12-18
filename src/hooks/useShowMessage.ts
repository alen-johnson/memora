import { message } from "antd";

const useShowMessage = () => {
  const showMessage = (type: "success" | "error" | "info" | "warning", content: string ) => {
    message[type](content); 
  };

  const showSuccess = (content: string) => showMessage("success", content);
  const showError = (content: string) => showMessage("error", content);
  const showInfo = (content: string) => showMessage("info", content);
  const showWarning = (content: string) => showMessage("warning", content);

  return { showSuccess, showError, showInfo, showWarning };
};

export default useShowMessage;
