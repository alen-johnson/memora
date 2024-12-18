import React from "react";
import { Button } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import "./ProfileHeader.css";  // Include the CS

interface ProfileHeaderProps {
  text: string;
  showButtons: boolean;
  onArrowClick: () => void;
  onLogoutClick: () => void;
  isLoggingOut: boolean;
  profileImage: string | undefined
  coverImage: string | undefined
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  text,
  showButtons,
  onArrowClick,
  onLogoutClick,
  isLoggingOut,
  profileImage,
  coverImage
}) => {


  return (
    <div className="profile__header">
      <ArrowLeftOutlined className="rofile__header-arrow" onClick={onArrowClick} color="black" />
      {text && <span className="profile__header-text">{text}</span>}
      

      {showButtons && (
        <>
          <Button
            className="profile__header-btn1"
            type="primary"
            onClick={onArrowClick}
          >
            Login/Signup
          </Button>
          <Button
            className="profile__header-logoutbtn"
            danger
            onClick={onLogoutClick}
            loading={isLoggingOut}
          >
            Logout
          </Button>
        </>
      )}

      <img
        src={coverImage}  
        alt="cover"
        className="profile__header-cover"
      />
      <img
        src={profileImage } 
        alt="Profile"
        className="profile__header-dp"
      />
    </div>
  );
};

export default ProfileHeader;
