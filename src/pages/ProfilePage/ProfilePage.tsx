import './ProfilePage.css'
import { PlusOutlined } from "@ant-design/icons";
import { Button, FloatButton, Modal } from "antd";
import { useNavigate } from "react-router-dom";
import useLogout from "../../hooks/useLogout";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../services/firebase";
import useAuthStore from "../../store/authStore";
import {ProfileHeader} from "../../components/componetIndex";  

function ProfilePage() {
  const navigate = useNavigate();
  const { handleLogout, isLoggingOut } = useLogout();
  const [isOpen, setIsOpen] = useState(false);
  const [user] = useAuthState(auth);
  const authUser = useAuthStore((state) => state.user);

  const handleLogoutAndNavigate = async () => {
    await handleLogout();
    navigate("/auth");
  };

  const arrowClick = () => {
    navigate("/");
  };
  const handleEdit = () => {
    navigate(`/edit/${authUser?.username}`);
  }
    useEffect(() => {
      console.log(authUser)
    },[authUser])

  return (
    <div className="profile">
      <ProfileHeader
        text="Go Back"
        showButtons={user !== null} // Conditionally render buttons based on user state
        onArrowClick={arrowClick}
        onLogoutClick={() => setIsOpen(!isOpen)}
        isLoggingOut={isLoggingOut}
      />
      <div className='profile__head'>
      <Button  onClick={handleEdit} className='profile__head-edtbtn' >Edit Profile</Button>
      </div>
      <div className="profile__bio">
        <h2>{authUser?.fullname}</h2>
        <p>{authUser?.bio}</p>
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
