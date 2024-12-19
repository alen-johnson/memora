import { useNavigate } from "react-router-dom";
import "./EditPage.css";
import useAuthStore from "../../store/authStore";
import { ProfileHeader } from "../../components/componetIndex";
import { EditFilled } from "@ant-design/icons";
import { Button, Input } from "antd";
import { useRef, useState, useEffect } from "react";
import usePreviewImg from "../../hooks/usePreviewImg";
import { profile, cover } from "../../assets/imageIndex";
import useEditProfile from "../../hooks/useEditProfile";
import useShowMessage from "../../hooks/useShowMessage";

function EditPage() {
  const authUser = useAuthStore((state) => state.user);
  const { profileFile, coverFile, handleImageChange } = usePreviewImg();
  const [inputs, setInputs] = useState({
    fullname: authUser?.fullname || "",
    username: authUser?.username || "",
    bio: authUser?.bio || "",
  });

  const [profileImg, setProfileImg] = useState(
    authUser?.profilePicURL || profile
  );
  const [coverImg, setCoverImg] = useState(authUser?.coverPicURL || cover);
  const { isUpdating, editProfile } = useEditProfile();
  const navigate = useNavigate();
  const { showError } = useShowMessage();
  const fileRefProfile = useRef<HTMLInputElement | null>(null);
  const fileRefCover = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (profileFile && typeof profileFile === "string") {
      setProfileImg(profileFile);
    }
  }, [profileFile]);

  useEffect(() => {
    if (coverFile && typeof coverFile === "string") {
      setCoverImg(coverFile);
    }
  }, [coverFile]);

  const arrowClick = () => {
    navigate(`/${authUser?.username}`);
  };

  const handleSave = async () => {
    try {
      await editProfile(inputs, profileFile, coverFile);

      setTimeout(() => {
        navigate(`/${authUser?.username}`);
      }, 2000);
    } catch (error) {
      if (error instanceof Error) {
        showError("Error" + error.message);
      } else {
        showError("Error" + "An unknown error occurred");
      }
    }
  };

  return (
    <div className="edit">
      <div className="edit__header">
        <ProfileHeader
          text="Go Back"
          showButtons={false}
          onArrowClick={arrowClick}
          onLogoutClick={() => {}}
          isLoggingOut={false}
          profileImage={profileImg}
          coverImage={coverImg}
        />

        <EditFilled
          className="edit__header-btn1"
          onClick={() => {
            if (fileRefProfile.current) {
              fileRefProfile.current.click();
            }
          }}
        />
        <input
          type="file"
          hidden
          ref={fileRefProfile}
          onChange={(e) => handleImageChange(e, "profile")}
        />
        <EditFilled
          className="edit__header-btn2"
          onClick={() => {
            if (fileRefCover.current) {
              fileRefCover.current.click();
            }
          }}
        />
        <input
          type="file"
          hidden
          ref={fileRefCover}
          onChange={(e) => handleImageChange(e, "cover")}
        />
      </div>

      <div className="edit__bio">
        <div className="edit__bio-field">
          <p>Name</p>
          <Input
            value={inputs.fullname}
            onChange={(e) => setInputs({ ...inputs, fullname: e.target.value })}
            variant="borderless"
          />
          <div className="edit__bio-underline" />
        </div>

        <div className="edit__bio-field">
          <p>Username</p>
          <Input
            value={inputs.username}
            onChange={(e) => setInputs({ ...inputs, username: e.target.value })}
            variant="borderless"
          />
          <div className="edit__bio-underline" />
        </div>

        <div className="edit__bio-field">
          <p>Bio</p>
          <Input.TextArea
            value={inputs.bio}
            onChange={(e) => setInputs({ ...inputs, bio: e.target.value })}
            variant="borderless"
            autoSize={{ minRows: 3, maxRows: 6 }}
          />
          <div className="edit__bio-underline" />
        </div>
      </div>

      <div className="edit__btn-container">
        <Button
          type="primary"
          style={{
            backgroundColor: "black",
            borderColor: "black",
            width: "98%",
          }}
          onClick={handleSave}
          loading={isUpdating}
        >
          Save
        </Button>
      </div>
    </div>
  );
}

export default EditPage;
