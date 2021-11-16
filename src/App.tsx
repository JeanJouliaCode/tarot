import "./App.scss";
import Home from "pages/Home";
import Lobby from "pages/Lobby";
import Text from "components/Text";
import { createContext, useState } from "react";
import "services/firebase";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

export const toaster = createContext((_message: string) => {});

function App() {
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);

  const showMessage = (_message: string) => {
    setMessage(_message);
    setError(true);
    setTimeout(() => {
      setError(false);
    }, 3000);
  };

  return (
    <Router>
      <div className={`toaster__container ${error && "toaster__up"}`}>
        <div className="toaster__content">
          <Text content={message} />
        </div>
      </div>
      <toaster.Provider value={showMessage}>
        <Routes>
          <Route path="/lobby/:id" element={<Lobby />} />
          <Route path="/invite/:id" element={<Home />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </toaster.Provider>
    </Router>
  );
}

export default App;
