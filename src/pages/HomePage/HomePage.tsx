import { FloatButton } from "antd";
import { profile } from "../../assets/imageIndex";
import "./HomePage.css";
import { PlusOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import {
  Explore,
  Feed,
  Friends,
  Navbar,
  Notifications,
} from "../../components/componetIndex";
import { useNavigate } from "react-router-dom";
import { RiMenu3Line, RiCloseLine } from "react-icons/ri";
import useAuthStore from "../../store/authStore";

function HomePage() {
  const [showText, setShowText] = useState(true);
  const [tab, setTab] = useState("Feed");
  const [toggleMenu, setToggleMenu] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 770);
  const navigate = useNavigate();

  const authUser = useAuthStore((state) => state.user);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 770);
    };
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setShowText(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  const handleTabChange = (tab: string) => {
    setTab(tab);
    setToggleMenu(false);
  };

  const handleProfileClick = () => {
    navigate(`/${authUser?.username}`);
  };

  const profileimg = authUser?.profilePicURL
    ? authUser?.profilePicURL
    : profile;

  return (
    <div className="home">
      <div className="home__header">
        {isMobile && (
          <div className="home__header-menu-icon">
            {toggleMenu ? (
              <RiCloseLine size={25} onClick={() => setToggleMenu(false)} />
            ) : (
              <RiMenu3Line size={25} onClick={() => setToggleMenu(true)} />
            )}
          </div>
        )}
        <div className="home__header-profile-container">
          {showText && (
            <div className="header-welcome">
              <p className="header-text">Welcome Back</p>
              <p className="header-text">{authUser?.fullname}</p>
            </div>
          )}
          <img
            src={profileimg}
            alt="profile"
            className="home__header-profile"
            onClick={handleProfileClick}
          />
        </div>
      </div>

      <div className="home__body">
        <div className="home__body-nav">
          {isMobile && toggleMenu && (
            <div className="navbar-menu-container">
              <Navbar onTabChange={handleTabChange} />
            </div>
          )}
          {!isMobile && <Navbar onTabChange={handleTabChange} />}
        </div>

        <div className="home__body-content">
          {tab === "Feed" && <Feed />}
          {tab === "Explore" && <Explore />}
          {tab === "Friends" && <Friends />}
          {tab === "Notifications" && <Notifications />}
        </div>

        <FloatButton icon={<PlusOutlined />} type="primary" />
        <div className="home__body-new">
          <h4>People You May Know</h4>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
