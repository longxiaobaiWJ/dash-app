import { useRef, useState, useEffect } from "react";
import "./App.css";
import Material from "./views/material/index.jsx";
import DragAble from "./views/dragable/index.jsx";

function App() {
  const [target, setTarget] = useState({});
  const container = useRef(null);

  useEffect(() => {
    container.current.addEventListener("dragstart", (el) => {
      setTarget({
        duration: el.target.duration,
        currentSrc: el.target.currentSrc,
      });
    });
  }, []);

  return (
    <div className="container" ref={container}>
      <Material />
      <DragAble target={target} />
    </div>
  );
}

export default App;
