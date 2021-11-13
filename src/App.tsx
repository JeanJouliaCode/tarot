
import './App.scss';
import Home from 'pages/Home'
import Lobby from 'pages/Lobby'
import 'services/firebase'

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

function App() {
  return (
    <Router>
    <div>
      <Routes>
        <Route path="/lobby/:id" element={<Lobby />} />
        <Route path="/invite/:id" element={<Home invited={true}/>} />
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  </Router>
  );
}

export default App;
