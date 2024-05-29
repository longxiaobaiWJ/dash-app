/* eslint-disable no-unused-vars */
import { useRef, useState, useEffect, useMemo } from "react";
// import { useStore, useSelector } from "react-redux";
// import * as dbUtils from "./datebase/index";
// import { helper, random } from "./utils/index";
import "./App.css";
// import { Pagination, Empty } from "antd";
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
