import React, { useState } from "react";
import LoginModal from "./LoginModal"; 
import SignupModal from "./SignupModal";
import './AuthModal.css'

function AuthModal() {
  const [isLogin, setIsLogin] = useState(true);

  // Toggle between Login and SignUp modals
  const toggleForm = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    setIsLogin((prevState) => !prevState);
  };

  return (
    <div className="auth">
      <div className="auth__card">
        {isLogin ? (
          <LoginModal /> 
        ) : (
          <SignupModal /> 
        )}
        <a 
          className="auth__toggle-link"
          onClick={toggleForm}
        >
          {isLogin ? "Don't have an account?" : "Already have an account?"}
        </a>
      </div>
    </div>
  );
}

export default AuthModal;
