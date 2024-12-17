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
import { useState } from "react";
import { AuthModal } from "../../components/componetIndex";
import useShowMessage from "../../hooks/useShowMessage";
import { auth, db } from "../../services/firebase";
import useAuthStore, { User } from "../../store/authStore";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import { setDoc, doc, getDoc } from "firebase/firestore";

function AuthPage() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [signInWithGoogle] = useSignInWithGoogle(auth);
  const { showError } = useShowMessage();
  const loginUser = useAuthStore((state) => state.login);

  const handleLoginModal = () => {
    setIsLoginOpen(!isLoginOpen);
  };

  const handleGoogleAuth = async () => {
    try {
      const newUser = await signInWithGoogle();

      if (newUser?.user?.uid) {
        const userRef = doc(db, "users", newUser.user.uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          // login
          const userDoc = userSnap.data() as User;
          localStorage.setItem("user-info", JSON.stringify(userDoc));
          loginUser(userDoc);
        } else {
          const userDoc: User = {
            uid: newUser.user.uid,
            email: newUser.user.email ?? "",
            username: newUser.user.email ? newUser.user.email.split("@")[0] : "",
            fullname: newUser.user.displayName ?? "",
            bio: "",
            profilePicURL: newUser.user.photoURL ?? "",
            coverPicUrl: "",
            followers: [],
            following: [],
            createdAt: Date.now(),
          };

          console.log(userDoc);
          await setDoc(userRef, userDoc);
          localStorage.setItem("user-info", JSON.stringify(userDoc));
          loginUser(userDoc);
        }
      } else {
        showError("Google authentication failed: User data is undefined.");
      }
    } catch (error) {
      if (error instanceof Error) {
        showError("Error" + error.message);
      } else {
        showError("Error" + "An unknown error occurred");
      }
    }
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
          onClick={handleGoogleAuth}
          icon={<GoogleOutlined style={{ color: "red" }} />}
        >
          Continue with Google
        </Button>
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
          }}
        >
          <AuthModal />
        </Modal>
      </div>
    </div>
  );
}

export default AuthPage;
