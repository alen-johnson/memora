import { useState } from "react";
import useShowMessage from "./useShowMessage";

const usePreviewImg = () => {
  const { showError } = useShowMessage();
  const maxSize = 4 * 1024 * 1024; 

  const [profileFile, setProfileFile] = useState<string | ArrayBuffer | null>(null);
  const [coverFile, setCoverFile] = useState<string | ArrayBuffer | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>, type: "profile" | "cover") => {
    const file = e.target.files?.[0];
    
    if (file && (file.type.startsWith("image/") || file.type === "image/jpeg" || file.type === "image/jpg")) {
      if (file.size > maxSize) {
        showError("File must be less than 4MB");
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        if (type === "profile") {
          setProfileFile(reader.result);
        } else if (type === "cover") {
          setCoverFile(reader.result); 
        }
      };
      reader.readAsDataURL(file);
    } else {
      showError("Please select a valid image file");
    }
  };

  return { profileFile, coverFile, handleImageChange };
};

export default usePreviewImg;
