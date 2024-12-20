import React, {
  //  useEffect,
    useState } from "react";
import "./AuthModal.css";
import useSignUpWithEmailAndPassword from "../../hooks/useSignUpWithEmailAndPassword";
import { Button } from "antd";
import useShowMessage from "../../hooks/useShowMessage";

function SignupModal() {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
    username: "",
    fullname: "",
  });
  //@ts-ignore
  const {loading, error, signup} = useSignUpWithEmailAndPassword()
  //@ts-ignore
  const {showError} = useShowMessage();

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="login">
      <div className="login__card">
        <h4 className="login__card-title">Sign Up</h4>
        <form onSubmit={handleSignup}>
          <div className="login__card-title-field">
            <svg
              className="input-icon"
              viewBox="0 0 500 500"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M207.8 20.73c-93.45 18.32-168.7 93.66-187 187.1c-27.64 140.9 68.65 266.2 199.1 285.1c19.01 2.888 36.17-12.26 36.17-31.49l.0001-.6631c0-15.74-11.44-28.88-26.84-31.24c-84.35-12.98-149.2-86.13-149.2-174.2c0-102.9 88.61-185.5 193.4-175.4c91.54 8.869 158.6 91.25 158.6 183.2l0 16.16c0 22.09-17.94 40.05-40 40.05s-40.01-17.96-40.01-40.05v-120.1c0-8.847-7.161-16.02-16.01-16.02l-31.98 .0036c-7.299 0-13.2 4.992-15.12 11.68c-24.85-12.15-54.24-16.38-86.06-5.106c-38.75 13.73-68.12 48.91-73.72 89.64c-9.483 69.01 43.81 128 110.9 128c26.44 0 50.43-9.544 69.59-24.88c24 31.3 65.23 48.69 109.4 37.49C465.2 369.3 496 324.1 495.1 277.2V256.3C495.1 107.1 361.2-9.332 207.8 20.73zM239.1 304.3c-26.47 0-48-21.56-48-48.05s21.53-48.05 48-48.05s48 21.56 48 48.05S266.5 304.3 239.1 304.3z"></path>
            </svg>
            <input
              autoComplete="off"
              id="email"
              placeholder="Email"
              className="input-field"
              name="email"
              type="email"
              value={inputs.email}
              onChange={(e) => {
                setInputs({ ...inputs, email: e.target.value });
              }}
            />
          </div>
          <div className="login__card-title-field">
            <svg
              className="input-icon"
              viewBox="0 0 500 500"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M80 192V144C80 64.47 144.5 0 224 0C303.5 0 368 64.47 368 144V192H384C419.3 192 448 220.7 448 256V448C448 483.3 419.3 512 384 512H64C28.65 512 0 483.3 0 448V256C0 220.7 28.65 192 64 192H80zM144 192H304V144C304 99.82 268.2 64 224 64C179.8 64 144 99.82 144 144V192z"></path>
            </svg>
            <input
              autoComplete="off"
              id="password"
              placeholder="Password"
              className="input-field"
              name="password"
              type="password"
              value={inputs.password}
              onChange={(e) => {
                setInputs({ ...inputs, password: e.target.value });
              }}
            />
          </div>
          <div className="login__card-title-field">
            <svg
              className="input-icon"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 500 500"
            >
              <path d="M441 58.9L453.1 71c9.4 9.4 9.4 24.6 0 33.9L424 134.1 377.9 88 407 58.9c9.4-9.4 24.6-9.4 33.9 0zM209.8 256.2L344 121.9 390.1 168 255.8 302.2c-2.9 2.9-6.5 5-10.4 6.1l-58.5 16.7 16.7-58.5c1.1-3.9 3.2-7.5 6.1-10.4zM373.1 25L175.8 222.2c-8.7 8.7-15 19.4-18.3 31.1l-28.6 100c-2.4 8.4-.1 17.4 6.1 23.6s15.2 8.5 23.6 6.1l100-28.6c11.8-3.4 22.5-9.7 31.1-18.3L487 138.9c28.1-28.1 28.1-73.7 0-101.8L474.9 25C446.8-3.1 401.2-3.1 373.1 25zM88 64C39.4 64 0 103.4 0 152L0 424c0 48.6 39.4 88 88 88l272 0c48.6 0 88-39.4 88-88l0-112c0-13.3-10.7-24-24-24s-24 10.7-24 24l0 112c0 22.1-17.9 40-40 40L88 464c-22.1 0-40-17.9-40-40l0-272c0-22.1 17.9-40 40-40l112 0c13.3 0 24-10.7 24-24s-10.7-24-24-24L88 64z" />
            </svg>
            <input
              autoComplete="off"
              id="username"
              placeholder="Username"
              className="input-field"
              name="username"
              type="username"
              value={inputs.username}
              onChange={(e) => {
                setInputs({ ...inputs, username: e.target.value });
              }}
            />
          </div>
          <div className="login__card-title-field">
            <svg
              className="input-icon"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 500 500"
            >
              <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512l388.6 0c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304l-91.4 0z" />
            </svg>
            <input
              autoComplete="off"
              id="fullname"
              placeholder="Full Name"
              className="input-field"
              name="fullname"
              type="fullname"
              value={inputs.fullname}
              onChange={(e) => {
                setInputs({ ...inputs, fullname: e.target.value });
              }}
            />
          </div>
          <Button loading={loading} onClick={()=> signup(inputs)}className="login__card-title-btn">Sign Up</Button>
        </form>
      </div>
    </div>
  );
}

export default SignupModal;
