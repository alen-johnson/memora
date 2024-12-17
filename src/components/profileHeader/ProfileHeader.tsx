import React from "react";
import { Button } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import "./ProfileHeader.css";  // Include the CSS
import useAuthStore from "../../store/authStore";
import {profile, cover} from '../../assets/imageIndex'

interface ProfileHeaderProps {
  text: string;
  showButtons: boolean;
  onArrowClick: () => void;
  onLogoutClick: () => void;
  isLoggingOut: boolean;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  text,
  showButtons,
  onArrowClick,
  onLogoutClick,
  isLoggingOut
}) => {

    const authUser = useAuthStore((state) => state.user)
    const profileImg = authUser?.profilePicURL && authUser.profilePicURL !== "" 
  ? authUser.profilePicURL 
  : profile;
  const coverImg = authUser?.coverPicUrl && authUser.coverPicUrl !== "" ? authUser.coverPicUrl : cover
  return (
    <div className="profile__header">
      <ArrowLeftOutlined className="rofile__header-arrow" onClick={onArrowClick} color="black" />
      {text && <span className="profile__header-text">{text}</span>}
      
      {/* Conditional rendering for Login/Signup or Logout button */}
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
        src={coverImg}  // Cover image
        alt="cover"
        className="profile__header-cover"
      />
      <img
        src={profileImg}  // Profile image
        alt="Profile"
        className="profile__header-dp"
      />
    </div>
  );
};

export default ProfileHeader;
