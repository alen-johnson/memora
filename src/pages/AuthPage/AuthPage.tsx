import { Button } from "antd";
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

function AuthPage() {
  const navigate = useNavigate();
  const handleAuth = () => {
    navigate('/');
  }
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
        <Button onClick={handleAuth} icon={<GoogleOutlined style={{color: "red"}}/>  }>Continue with Google</Button>
        <p>OR</p>
        <Button >Sign In</Button>
      </div>
    </div>
  );
}

export default AuthPage;
