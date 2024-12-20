import { Button, Modal } from "antd";
import { LikeButton, ShareModal } from "../componetIndex";
import "./FeedPost.css";
import { useState } from "react";
import { ShareAltOutlined } from "@ant-design/icons";
import { Post } from "../../store/postStore";
import useGetProfileById from "../../hooks/useGetProfileById";

interface FeedPostProps {
  post: Post;
  index: number;
  lightColors: string[];
}

function FeedPost({ post, index, lightColors }: FeedPostProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { userProfile } = useGetProfileById(post.createdBy);

  const formatTime = (timetamp: number) => {
    const now = Date.now();
    const diffInSec = Math.floor((now - timetamp) / 1000);
    const diffInMin = Math.floor(diffInSec / 60);
    const diffInHour = Math.floor(diffInMin / 60);
    const diffInDay = Math.floor(diffInHour / 24);

    if (diffInSec < 60) {
      return `${diffInSec} seconds ago`;
    } else if (diffInMin < 60) {
      return `${diffInMin} minutes ago`;
    } else if (diffInHour < 24) {
      return `${diffInHour} hours ago`;
    } else {
      if (diffInDay === 1) return `${diffInDay} day ago`;
      else return `${diffInDay} days ago`;
    }
  };

  const setModal = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      className="feed"
      style={{ backgroundColor: lightColors[index % lightColors.length] }}
    >
      <div className="feed__header">
        <div className="feed__header-profile">
          <img src={userProfile?.profilePicURL || ""} alt="user" />
          <div className="feed__header-profile_det">
            <h4>{userProfile?.username || "Unknown User"}</h4>
            <p>{formatTime(post.createdAt)}</p>
          </div>
        </div>
        <div className="feed__header-content">
          <p>{post.caption}</p>
        </div>
      </div>

      <div className="feed__content">
        <img src={post.imgUrl} alt="post" />
      </div>

      <div className="feed__footer">
        <LikeButton likes={post.likes ? post.likes.length : 0} />
        <Button onClick={setModal} icon={<ShareAltOutlined />}>
          Share
        </Button>
        <Modal
          title={
            <span style={{ fontSize: "24px", fontWeight: "bold" }}>
              Share Post
            </span>
          }
          open={isOpen}
          onCancel={setModal}
          mask={true}
          footer={null}
          width={400}
        >
          <ShareModal />
        </Modal>
      </div>
    </div>
  );
}

export default FeedPost;
