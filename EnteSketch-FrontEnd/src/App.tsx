import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

import Canvas from "./components/canvas/Canvas";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="w-screen">
      <Canvas></Canvas>
     
    </div>
  );
}

export default App;
