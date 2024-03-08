import "./App.css";
import { Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import HomePage from "./components/pages/HomePage";
import LoginPage from "./components/pages/LoginPage";
import SignUpPage from "./components/pages/SignUpPage";
import ExplorePage from "./components/pages/ExplorePage";
import LikesPage from "./components/pages/LikesPage";
import Sidebar from "./components/Sidebar";
import { userAuth } from "./context/AuthContext";

function App() {
  const {authUser} = userAuth();
  return (
    <div className="flex ">
    <Toaster />
       <Sidebar />
      <div className="max-w-5xl my-5 text-white mx-auto transition-all duration-300 flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to={'/'}/> }  />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/explore" element={<ExplorePage />} />
          <Route path="/likes" element={<LikesPage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
