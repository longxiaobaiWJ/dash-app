import { useState } from "react";
import "./App.css";
import Material from "./views/material/index.jsx";
import DragAble from "./views/dragable/index.jsx";

function App() {
  const [target, setTarget] = useState({});

  const onDragStart = (el) => {
    setTarget({
      duration: el.target.duration,
      currentSrc: el.target.currentSrc,
    });
  };

  return (
    <div className="container" onDragStart={onDragStart}>
      <Material />
      <DragAble target={target} />
    </div>
  );
}

export default App;
