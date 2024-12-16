import { Button, Modal } from "antd";
import { LikeButton, RadioNav, ShareModal } from "../componetIndex";
import "./Feed.css";
import { ShareAltOutlined } from "@ant-design/icons";

// this is to be removed after dynamic imports (dummy data)
import { img1, img2, img3, img4, profile } from "../../assets/imageIndex";
import { useState } from "react";

const feedData = [
  {
    id: 1,
    name: "John Doe",
    profileImage: profile,
    time: "1 hour ago",
    caption: "Exploring the world, one step at a time 🌍",
    postImage: img1,
  },
  {
    id: 2,
    name: "Jane Smith",
    profileImage: profile,
    time: "2 hours ago",
    caption: "The calm before the storm ⛈️ #NatureLover",
    postImage: img2,
  },
  {
    id: 3,
    name: "Alice Johnson",
    profileImage: profile,
    time: "3 hours ago",
    caption: "Capturing life's little moments 📸✨",
    postImage: img3,
  },
  {
    id: 4,
    name: "Michael Brown",
    profileImage: profile,
    time: "4 hours ago",
    caption: "Chasing sunsets and good vibes 🌅",
    postImage: img4,
  },
];

// till here

function Feed() {
  const [isOpen, setIsOpen] = useState(false);

  const setModal = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className="feed-wrapper">
      <div className="feed__radionav">
      <h2>Feeds</h2>
      <RadioNav/>
      </div>
      {feedData.map((feed) => (
        <div key={feed.id} className="feed">
          <div className="feed__header">
            <div className="feed__header-profile">
              <img src={feed.profileImage} alt="user" />
              <div className="feed__header-profile_det">
                <h4>{feed.name}</h4>
                <p>{feed.time}</p>
              </div>
            </div>
            <div className="feed__header-content">
              <p>{feed.caption}</p>
            </div>
          </div>

          <div className="feed__content">
            <img src={feed.postImage} alt="post" />
          </div>

          <div className="feed__footer">
            <LikeButton />
            <Button onClick={setModal} icon={<ShareAltOutlined />}>
              Share
            </Button>
            <Modal title={<span style={{ fontSize: '24px', fontWeight: 'bold' }}>Share Post</span>} open={isOpen} onCancel={setModal} mask={true} footer={null} width={400}>
              <ShareModal/>
            </Modal>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Feed;
