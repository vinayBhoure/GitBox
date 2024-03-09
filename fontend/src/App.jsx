import "./App.css";
import { Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import HomePage from "./components/pages/HomePage";
import LoginPage from "./components/pages/LoginPage";
import SignUpPage from "./components/pages/SignUpPage";
import ExplorePage from "./components/pages/ExplorePage";
import LikesPage from "./components/pages/LikesPage";
import Sidebar from "./components/Sidebar";
import { useAuthContext } from "./context/AuthContext";
import { Navigate } from "react-router-dom";

function App() {
     const {authUser, loading} = useAuthContext();
     console.log("authUser -> ", authUser);

     if(loading) return <h1>Loading...</h1>
  return (
    <div className="flex ">
    <Toaster />
       <Sidebar />
      <div className="max-w-5xl my-5 text-white mx-auto transition-all duration-300 flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to={'/'}/> }  />
          <Route path="/signup" element={!authUser ? <SignUpPage /> : <Navigate to={'/'}/> } />
          <Route path="/explore" element={authUser ? <ExplorePage /> : <Navigate to={'/login'}/> } />
          <Route path="/likes" element={authUser ? <LikesPage /> : <Navigate to={'/login'}/> } />
        </Routes>
      </div>
    </div>
  );
}

export default App;
