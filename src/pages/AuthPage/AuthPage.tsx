import { Button, Modal } from "antd";
import {
  img1,
  img2,
  img3,
  img4,
  img5,
  img6,
  img7,
  img8,
  img9,
  logo,
} from "../../assets/imageIndex";
import "./Authpage.css";
import { GoogleOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { AuthModal, GoogleModal } from "../../components/componetIndex";

function AuthPage() {
  const navigate = useNavigate();
  const [isGoogleOpen, setIsGoogleOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false)

  const handleGoogleModal = () => {
    setIsGoogleOpen(!isGoogleOpen);
  };
  const handleLoginModal = () => {
    setIsLoginOpen(!isLoginOpen)
  }
  // @ts-ignore
  const handleAuth = () => {
    navigate("/");
  };

  return (
    <div className="auth">
      <div className="auth__images">
        <img src={img1} alt="img1" />
        <img src={img8} alt="img" />
        <img src={img3} alt="img" />
        <img src={img4} alt="img" />
        <img src={img2} alt="img" />
        <img src={img5} alt="img" />
        <img src={img6} alt="img" />
        <img src={img7} alt="img" />
        <img src={img9} alt="img" />
      </div>
      <div className="auth__login">
        <div className="auth__login-header">
          <img src={logo} alt="logo" />
          <h2>Vibesnap</h2>
        </div>
        <p>Moments That Matter, Shared Forever</p>
        <Button
          onClick={handleGoogleModal}
          icon={<GoogleOutlined style={{ color: "red" }} />}
        >
          Continue with Google
        </Button>
        <Modal
          open={isGoogleOpen}
          onCancel={handleGoogleModal}
          footer={null}
          mask={true}
          maskStyle={{
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)",
          }}
        >
          <GoogleModal />
        </Modal>
        <p>OR</p>
        <Button onClick={handleLoginModal}>Log In</Button>
        <Modal 
        open={isLoginOpen}
        onCancel={handleLoginModal}
        footer={null}
        width={300}
        maskStyle={{
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
        }}>
          <AuthModal/>
        </Modal>
      </div>
    </div>
  );
}

export default AuthPage;
