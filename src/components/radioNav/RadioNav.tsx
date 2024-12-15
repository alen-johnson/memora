import React, { useState } from "react";
import "./RadioNav.css";

const RadioNav: React.FC = () => {
  const [selected, setSelected] = useState<string>("Friends");

  return (
    <div className="radio-inputs">
      <label className="radio">
        <input
          type="radio"
          name="radio"
          value="Recents"
          checked={selected === "Recents"}
          onChange={() => setSelected("Recents")}
        />
        <span className="name">Recents</span>
      </label>

      <label className="radio">
        <input
          type="radio"
          name="radio"
          value="Friends"
          checked={selected === "Friends"}
          onChange={() => setSelected("Friends")}
        />
        <span className="name">Friends</span>
      </label>

      <label className="radio">
        <input
          type="radio"
          name="radio"
          value="Popular"
          checked={selected === "Popular"}
          onChange={() => setSelected("Popular")}
        />
        <span className="name">Popular</span>
      </label>
    </div>
  );
};

export default RadioNav;
