import "./PostPage.css";
import { Button, Input } from "antd";
import { useCallback, useState, useRef } from "react";
import { FileWithPath, useDropzone } from "react-dropzone";
import { post } from "../../assets/imageIndex";
import useShowMessage from "../../hooks/useShowMessage";
import useCreatePost from "../../hooks/useCreatePost";
import { useNavigate } from "react-router-dom";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useCameraCapture } from "../../hooks/useCamerCapture";
import { dataURLtoBlob } from "../../helpers/dataURLtoBlob";

function PostPage() {
  const [fileUrls, setFileUrls] = useState<string[]>([]);
  const [files, setFiles] = useState<FileWithPath[]>([]);
  const [caption, setCaption] = useState<string>("");
  const [isCameraActive, setIsCameraActive] = useState<boolean>(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const navigate = useNavigate();

  const { capturedImage, startCamera, clearCapturedImage } = useCameraCapture();
  const { isLoading, handleCreatePost } = useCreatePost();
  const { showError } = useShowMessage();

  const onDrop = useCallback(
    (acceptedFiles: FileWithPath[]) => {
      if (fileUrls.length >= 4) return;

      const newFiles = acceptedFiles.slice(0, 4 - fileUrls.length);

      setFiles((prevFiles) => [...prevFiles, ...newFiles]);
      setFileUrls((prevUrls) => [
        ...prevUrls,
        ...newFiles.map((file) => URL.createObjectURL(file)),
      ]);
    },
    [fileUrls]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".png", ".jpeg", ".jpg", ".svg"],
      "video/*": [".mp4", ".webm", ".ogg"],
    },
    disabled: fileUrls.length >= 4,
  });

  const addMoreFiles = () => {
    const fileInput = document.getElementById("file-input") as HTMLInputElement;
    fileInput?.click();
  };

  const removeFile = (index: number) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
    setFileUrls((prevUrls) => prevUrls.filter((_, i) => i !== index));
  };

  const arrowClick = () => {
    navigate("/");
  };

  const handlePost = async () => {
    if ((files.length === 0 && !capturedImage) ) {
      showError("Please select an image ");
      return;
    }

    const selectedFiles = [...files];
    if (capturedImage) {
      const capturedBlob = dataURLtoBlob(capturedImage); 
      const capturedFile = new File([capturedBlob], "captured_image.jpg", { type: "image/jpeg" });
      selectedFiles.push(capturedFile);
    }
    
    await handleCreatePost(selectedFiles, caption); 
    navigate("/");  
  };

  const handleCameraClick = async () => {
    await startCamera(); 
    setIsCameraActive(true);

    if (capturedImage) {
      const imgContainer = document.querySelector(".post__img-container");
      const previewContainer = document.querySelector(".post__preview-container");

      if (imgContainer && previewContainer) {
        imgContainer.classList.add("hidden");
        previewContainer.classList.remove("hidden"); 
      }
    }
  };
  

  const handleClearImage = () => {
    clearCapturedImage();
    setIsCameraActive(false); 
  };

  return (
    <div className="post">
      <ArrowLeftOutlined
        className="rofile__header-arrow"
        onClick={arrowClick}
        color="black"
      />

      <h4>Create Post</h4>

      <div>
        {capturedImage ? (
          <div>
            <button className="remove-file-btn" onClick={handleClearImage}>
              &times;
            </button>
          </div>
        ) : (
          <></>
        )}
      </div>

      <div
        className={`post__img-container ${fileUrls.length > 0 || capturedImage || isCameraActive ? "hidden" : ""}`}
        {...getRootProps()}
      >
        <input id="file-input" {...getInputProps()} />
        {fileUrls.length === 0 && !capturedImage && !isCameraActive && (
          <div className="post__img-box">
            <img src={post} className="post-img" alt="Default" />
            <h3 className="post-drag">Drag photo or Video here</h3>
            <h5 className="post-types">SVG, JPEG, JPG, Video</h5>
          </div>
        )}
      </div>

      <div
        className={`post__preview-container ${
          fileUrls.length > 0 || capturedImage ? "expanded" : "hidden"
        }`}
      >
        {capturedImage ? (
          <img
            src={capturedImage}
            className="post-preview"
            alt="Captured Preview"
          />
        ) : (
          fileUrls.map((url, index) => (
            <div key={index} className="post__preview-item">
              <button
                className="remove-file-btn"
                onClick={() => removeFile(index)}
              >
                &times;
              </button>
              {files[index]?.type.startsWith("image") ? (
                <img src={url} className="post-preview" alt="Preview" />
              ) : files[index]?.type.startsWith("video") ? (
                <div className="post__video-container">
                  <video
                    ref={videoRef}
                    src={url}
                    className="post-preview"
                    autoPlay
                    muted
                    onEnded={() => {
                      if (videoRef.current) {
                        videoRef.current.pause();
                        videoRef.current.currentTime = 0;
                      }
                    }}
                  />
                </div>
              ) : null}
            </div>
          ))
        )}
      </div>

      {fileUrls.length > 0 && fileUrls.length < 2 && (
        <Button
          className="add-more-btn"
          icon={<span className="anticon">+</span>}
          onClick={addMoreFiles}
        >
          Select More
        </Button>
      )}

      {fileUrls.length < 1 && (
        <Button
          onClick={handleCameraClick}
          className="post-btn"
          style={{ width: 200 }}
        >
          Capture
        </Button>
      )}

      <div className="post__caption-container">
        <p className="post-caption">Caption</p>
        <Input.TextArea
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
        />
      </div>

      <Button
        onClick={handlePost}
        className="post-btn"
        type="primary"
        loading={isLoading}
      >
        Post
      </Button>
    </div>
  );
}

export default PostPage;
