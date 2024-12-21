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
  const [loading, setLoading] = useState(false);
  const [coverImg, setCoverImg] = useState(authUser?.coverPicURL || cover);
  const { editProfile, checkUsernameAvailability } = useEditProfile();
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

  const resetForm = () => {
    setInputs({
      fullname: authUser?.fullname || "",
      username: authUser?.username || "",
      bio: authUser?.bio || "",
    });
    setProfileImg(authUser?.profilePicURL || profile);
    setCoverImg(authUser?.coverPicURL || cover);
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      if (inputs.username && inputs.username !== authUser?.username) {
        const isUsernameAvailable = await checkUsernameAvailability(
          inputs.username
        );
        if (!isUsernameAvailable) {
          showError("Username is already taken. Please choose another.");
          setLoading(false);
          resetForm();

          return;
        }
      }

      await editProfile(inputs, profileFile, coverFile);
      setTimeout(() => {
        setLoading(false);
        navigate(`/${inputs.username}`); 
      }, 2000);
    } catch (error) {
      if (error instanceof Error) {
        showError("Error: " + error.message);
      } else {
        showError("Error: An unknown error occurred.");
      }
    }
  };

  return (
    <div className="edit">
      <div className="edit__header">
        <ProfileHeader
          text="Go Back"
          showButtons={false}
          onArrowClick={() => navigate(`/${authUser?.username}`)}
          onLogoutClick={() => {}}
          isLoggingOut={false}
          profileImage={profileImg}
          coverImage={coverImg}
        />

        <EditFilled
          className="edit__header-btn1"
          onClick={() => fileRefProfile.current?.click()}
        />
        <input
          type="file"
          hidden
          ref={fileRefProfile}
          onChange={(e) => handleImageChange(e, "profile")}
        />
        <EditFilled
          className="edit__header-btn2"
          onClick={() => fileRefCover.current?.click()}
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
          />
          <div className="edit__bio-underline" />
        </div>

        <div className="edit__bio-field">
          <p>Username</p>
          <Input
            value={inputs.username}
            onChange={(e) => setInputs({ ...inputs, username: e.target.value })}
          />
          <div className="edit__bio-underline" />
        </div>

        <div className="edit__bio-field">
          <p>Bio</p>
          <Input.TextArea
            value={inputs.bio}
            onChange={(e) => setInputs({ ...inputs, bio: e.target.value })}
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
          loading={loading}
        >
          Save
        </Button>
      </div>
    </div>
  );
}

export default EditPage;
