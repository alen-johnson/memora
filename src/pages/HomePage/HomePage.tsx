import { FloatButton } from "antd";
import "./HomePage.css";
import { PlusOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import {
  Explore,
  Feed,
  Navbar,
  Notifications,
  Popular,
  SuggestedUsers,
} from "../../components/componetIndex";
import { useNavigate } from "react-router-dom";
import { RiMenu3Line, RiCloseLine } from "react-icons/ri";
import useAuthStore from "../../store/authStore";
import { setProfileImg } from "../../helpers/setProfileImg";

function HomePage() {
  const [tab, setTab] = useState("Feed");
  const [toggleMenu, setToggleMenu] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 800);
  const navigate = useNavigate();

  const authUser = useAuthStore((state) => state.user);
  const isWelcomeShown = useAuthStore((state) => state.isWelcomeShown);
  const setWelcomeShown = useAuthStore((state) => state.setWelcomeShown);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 800);
    };
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (authUser && !isWelcomeShown) {
      setWelcomeShown(true); 
    }
  }, [authUser, isWelcomeShown, setWelcomeShown]);

  const handleTabChange = (tab: string) => {
    setTab(tab);
    setToggleMenu(false);
  };

  const handleProfileClick = () => {
    if (authUser) {
      navigate(`/${authUser.username}`);
    }
  };

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
          {authUser && !isWelcomeShown && (
            <div className="header-welcome">
              <p className="header-text">Welcome Back</p>
              <p className="header-text">{authUser.fullname}</p>
            </div>
          )}
          <img
            src={setProfileImg(authUser?.profilePicURL)}
            alt="profile"
            className="home__header-profile"
            onClick={handleProfileClick}
          />
        </div>
      </div>

      <div className="home__body">
        <div className="home__body-left">
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
          {tab === "Popular" && <Popular />}
          {tab === "Notifications" && <Notifications />}
        </div>

        <FloatButton icon={<PlusOutlined />} type="primary" onClick={() => navigate('/post')} />
        <div className="home__body-right">
          <SuggestedUsers />   
        </div>
      </div>
    </div>
  );
}

export default HomePage;