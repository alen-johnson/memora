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
          Explore
        </button>
        <button
          onClick={() => props.onTabChange("Popular")}
          className="navbar__button"
        >
          Popular
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
