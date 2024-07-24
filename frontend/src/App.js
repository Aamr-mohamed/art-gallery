import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home/home";
import AdminPanel from "./Pages/AdminPanel/adminpanel";
import Login from "./Pages/Login/login";
import Register from "./Pages/Register/register";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/adminpanel" element={<AdminPanel />} />
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;
