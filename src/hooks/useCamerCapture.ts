import { useState } from "react";

export const useCameraCapture = () => {
  const [capturedImage, setCapturedImage] = useState<string | null>(null);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
      });

      const mediaStream = stream as MediaStream;

      const videoElement = document.createElement("video");
      videoElement.srcObject = mediaStream;
      videoElement.play();

      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");

      videoElement.onplaying = () => {
        canvas.width = videoElement.videoWidth;
        canvas.height = videoElement.videoHeight;
        context?.drawImage(videoElement, 0, 0, canvas.width, canvas.height);

        setCapturedImage(canvas.toDataURL("image/png"));

        mediaStream.getTracks().forEach((track) => track.stop());
      };
    } catch (error) {
      console.error("Error accessing camera:", error);
    }
  };

  const clearCapturedImage = () => {
    setCapturedImage(null);
  };

  return {
    capturedImage,
    startCamera,
    clearCapturedImage, 
  };
};
