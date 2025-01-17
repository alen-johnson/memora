import { Button, Modal } from "antd";
import { LikeButton, ShareModal } from "../componetIndex";
import "./Posts.css";
import {  useState } from "react";
import { ShareAltOutlined } from "@ant-design/icons";
import { Post } from "../../store/postStore";
import useGetProfileById from "../../hooks/useGetProfileById";
import { useNavigate } from "react-router-dom";
import { formatTime } from "../../helpers/formatTime";
import { isVideo } from "../../helpers/isVideo";
import { setProfileImg } from "../../helpers/setProfileImg";

interface PostProps {
  post: Post;
  index: number;
  lightColors: string[];
}

function Posts({ post, index, lightColors }: PostProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { userProfile } = useGetProfileById(post.createdBy);
  const navigate = useNavigate();

  const setModal = () => {
    setIsOpen(!isOpen);
  };

  const handleProfileClick = (user: string | undefined) => {
    navigate(`/${user}`);
  };

  const handleVideoClose = (event: React.SyntheticEvent<HTMLVideoElement>) => {
    const videoElement = event.currentTarget;
    videoElement.controls = true; 
  };

  const profile = setProfileImg(userProfile?.profilePicURL);

  return (
    <div
      className="posts"
      style={{ backgroundColor: lightColors[index % lightColors.length] }}
    >
      <div className="posts__header">
        <div className="posts__header-profile">
          <img
            src={profile}
            alt="user"
            onClick={() => handleProfileClick(userProfile?.username)}
          />
          <div className="posts__header-profile_det">
            <h4 onClick={() => handleProfileClick(userProfile?.username)}>
              {userProfile?.username || "Unknown User"}
            </h4>
            <p>{formatTime(post.createdAt)}</p>
          </div>
        </div>
        <div className="posts__header-content">
          <p>{post.caption}</p>
        </div>
      </div>

      <div className="posts__content">
        {post.imgUrls?.map((url, idx) =>
          isVideo(url) ? (
            <video
              key={idx}
              className={`posts__content-media ${
                post.imgUrls.length > 1 ? "multi-image" : ""
              }`}
              autoPlay
              muted
              playsInline
              onEnded={()=>handleVideoClose}
            >
              <source src={url} type="video/mp4" />
              <source src={url} type="video/webm" />
              <source src={url} type="video/ogg" />
              Your browser does not support the video tag.
            </video>
          ) : (
            <img
              key={idx}
              src={url}
              alt={`post-image-${idx}`}
              className={`posts__content-img ${
                post.imgUrls.length > 1 ? "multi-image" : ""
              }`}
            />
          )
        )}
      </div>

      <div className="posts__footer">
        <LikeButton post={post} />
        <Button
          className="posts__footer-sharebtn"
          onClick={setModal}
          icon={<ShareAltOutlined />}
        >
          Share
        </Button>
        <Modal
          title={
            <span
              style={{
                fontSize: "26px",
                fontWeight: "bold",
                fontFamily: "var(--font-primary)",
              }}
            >
              Share Post
            </span>
          }
          open={isOpen}
          onCancel={setModal}
          mask={true}
          footer={null}
          width={400}
        >
          <ShareModal post={post} />
        </Modal>
      </div>
    </div>
  );
}

export default Posts;
