import React, { useRef } from "react";
import Home from "./components/Home";
import Selection from "./components/Selection";
import "./css/import.scss";

function App() {
  let ref = useRef(null);

  const onButtonClick = () => {
    window.scrollTo({ behavior: "smooth", top: ref.current.offsetTop });
  };

  return (
    <React.Fragment>
      <Home function={onButtonClick} />

      <div ref={ref} className="reference">
        <Selection />
      </div>
    </React.Fragment>
  );
}

export default App;
