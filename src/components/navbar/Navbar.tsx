import "./Navbar.css";

function Navbar(props: { onTabChange: (tab: string) => void }) {
  return (
    <div>
      <div className="navbar">
        <button
          onClick={() => props.onTabChange("Feed")}
          className="navbar__button"
        >
          Feed
        </button>
        <button
          onClick={() => props.onTabChange("Explore")}
          className="navbar__button"
        >
          {" "}
          Explore
        </button>
        <button
          onClick={() => props.onTabChange("Recents")}
          className="navbar__button"
        >
          Recents
        </button>
        <button
          onClick={() => props.onTabChange("Notifications")}
          className="navbar__button"
        >
          {" "}
          Notifications
        </button>
      </div>
    </div>
  );
}

export default Navbar;
