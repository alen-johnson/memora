import React, { useState } from "react";
import "./RadioNav.css";

interface RadioNavProps {
  onSelect: (selected: string) => void; 
}

const RadioNav: React.FC<RadioNavProps> = ({ onSelect }) => {
  const [selected, setSelected] = useState<string>("Friends");

  const handleSelection = (value: string) => {
    setSelected(value);
    onSelect(value); 
  };

  return (
    <div className="radio-inputs">
      <label className="radio">
        <input
          type="radio"
          name="radio"
          value="Recents"
          checked={selected === "Recents"}
          onChange={() => handleSelection("Recents")}
        />
        <span className="name">Recents</span>
      </label>

      <label className="radio">
        <input
          type="radio"
          name="radio"
          value="Friends"
          checked={selected === "Friends"}
          onChange={() => handleSelection("Friends")}
        />
        <span className="name">Friends</span>
      </label>

      <label className="radio">
        <input
          type="radio"
          name="radio"
          value="Popular"
          checked={selected === "Popular"}
          onChange={() => handleSelection("Popular")}
        />
        <span className="name">Popular</span>
      </label>
    </div>
  );
};

export default RadioNav;
