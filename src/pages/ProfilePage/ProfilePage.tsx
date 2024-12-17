import { ArrowLeftOutlined, PlusOutlined } from "@ant-design/icons";
import "./ProfilePage.css";
import { Button, FloatButton, Modal } from "antd";
import { useNavigate } from "react-router-dom";
import useLogout from "../../hooks/useLogout";
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../services/firebase";
import useAuthStore from "../../store/authStore";
import { profile } from "../../assets/imageIndex";

function ProfilePage() {
  const navigate = useNavigate();
  const { handleLogout, isLoggingOut } = useLogout();
  const [isOpen, setIsOpen] = useState(false);
  const [user] = useAuthState(auth);

  const handleLogoutAndNavigate = async () => {
    await handleLogout();
    navigate("/auth");
  };

  const arrowClick = () => {
    navigate("/");
  };

  const profileimg = authUser?.profilePicURL && authUser.profilePicURL !== "" 
  ? authUser.profilePicURL 
  : profile;

  return (
    <div className="profile">
      <div className="profile__header">
        <ArrowLeftOutlined onClick={arrowClick} />
        
        {/* Conditional rendering for Login/Signup or Logout button */}
        {!user ? (
          <Button
            className="profile__header-btn1"
            type="primary"
            onClick={arrowClick}
          >
            Login/Signup
          </Button>
        ) : (
          <Button
            className="profile__header-logoutbtn"
            danger
            onClick={() => setIsOpen(!isOpen)}
            loading={isLoggingOut}
          >
            Logout
          </Button>
        )}

        <img src={authUser?.coverPicUrl} alt="cover" className="profile__header-cover" />
        <img src={profileimg} alt="Profile" className="profile__header-dp" />

        {user && (
          <Button className="profile__header-btn2">Edit Profile</Button>
        )}

        <div className="profile__friends">
          <h3>Friends List</h3>
          <ul>
            <li>John Doe</li>
            <li>Mary Smith</li>
            <li>Robert Brown</li>
            <li>Emily Johnson</li>
          </ul>
        </div>
      </div>
      <div className="profile__bio">
        <h2>Jane Doe</h2>
        <p>
          Lorem ipsum dolor sit amet explicabo rem quas, maxime ad esse dolori
        </p>
      </div>
      <div className="profile__posts">
        <h4>My Posts</h4>
        <Modal
          open={isOpen}
          onOk={handleLogoutAndNavigate}
          onCancel={() => setIsOpen(!isOpen)}
          title="Are you sure you want to log out?"
        />
      </div>
      <FloatButton icon={<PlusOutlined />} type="primary" />
    </div>
  );
}

export default ProfilePage;
