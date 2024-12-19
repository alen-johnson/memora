import "./PostPage.css";
import { Button, Input } from "antd";
import { useCallback, useState, useRef } from "react";
import { FileWithPath, useDropzone } from "react-dropzone";
import { post } from "../../assets/imageIndex";
import useShowMessage from "../../hooks/useShowMessage";
import useCreatePost from "../../hooks/useCreatePost";
import { useNavigate } from "react-router-dom";
import { ArrowLeftOutlined } from "@ant-design/icons";

function PostPage() {
  const [fileUrls, setFileUrls] = useState<string[]>([]);
  const [files, setFiles] = useState<FileWithPath[]>([]);
  const [caption, setCaption] = useState<string>("");
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const navigate = useNavigate();

  const { isLoading, handleCreatePost } = useCreatePost();
  const { showError } = useShowMessage();

  const onDrop = useCallback(
    (acceptedFiles: FileWithPath[]) => {
      if (fileUrls.length >= 4) return;

      const isVideo = acceptedFiles.some((file) =>
        file.type.startsWith("video")
      );
      const hasImage = files.some((file) => file.type.startsWith("image"));

      if (isVideo && hasImage) {
        showError("You cannot upload a video with an image.");
        return;
      }

      const newFiles = acceptedFiles.slice(0, 4 - fileUrls.length);

      setFiles((prevFiles) => [...prevFiles, ...newFiles]);
      setFileUrls((prevUrls) => [
        ...prevUrls,
        ...newFiles.map((file) => URL.createObjectURL(file)),
      ]);
    },
    [fileUrls, files]
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
    if (files.length === 0) {
      showError("Please select an image to upload.");
      return;
    }

    const selectedFile = files[0];
    const reader = new FileReader();

    reader.onload = async () => {
      if (reader.result) {
        await handleCreatePost(reader.result, caption);
        navigate("/");
      }
    };

    reader.onerror = () => {
      showError("Failed to read the selected file.");
    };

    reader.readAsDataURL(selectedFile);
  };

  return (
    <div className="post">
      <ArrowLeftOutlined
        className="rofile__header-arrow"
        onClick={arrowClick}
        color="black"
      />

      <h4>Create Post</h4>

      <div
        className={`post__img-container ${fileUrls.length > 0 ? "hidden" : ""}`}
        {...getRootProps()}
      >
        <input id="file-input" {...getInputProps()} />
        {fileUrls.length === 0 && (
          <div className="post__img-box">
            <img src={post} className="post-img" alt="Default" />
            <h3 className="post-drag">Drag photo or Video here</h3>
            <h5 className="post-types">SVG, JPEG, JPG, Video</h5>
          </div>
        )}
      </div>

      <div
        className={`post__preview-container ${
          fileUrls.length > 0 ? "expanded" : "hidden"
        }`}
      >
        {fileUrls.map((url, index) => (
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
        ))}
      </div>

      {fileUrls.length > 0 && fileUrls.length < 4 && (
  <Button
    className="add-more-btn"
    icon={<span className="anticon">+</span>}
    onClick={addMoreFiles}
  >
    Select More
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
