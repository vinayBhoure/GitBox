import React from "react";
import Search from "../Search";
import SortRepo from "../SortRepo";
import Profile from "../Profile";
import Repos from "../Repos";

function HomePage() {
  return (
    <div className="m-4">
      <Search />
      <SortRepo />
      <div className="flex flex-col lg:flex-row gap-4 justify-center items-start">
        <Profile />
        <Repos />
      </div>
    </div>
  );
}

export default HomePage;
