import React, { useCallback, useEffect, useState } from "react";
import Search from "../Search";
import SortRepo from "../SortRepo";
import Profile from "../Profile";
import Repos from "../Repos";
import Spinner from "../Spinner";

function HomePage() {

  const [userProfile, setUserProfile] = useState(null);
  const [userRepos, setUserRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sortType, setSortType] = useState("forks");

  const getUserProfile = useCallback(async () => {
      setLoading(true);
      try{
        const userResult = await fetch("https://api.github.com/users/vinayBhoure");
        const res = await userResult.json();
        setUserProfile(res);

        const repoResult = await fetch(res.repos_url);
        const res2 = await repoResult.json();
        setUserRepos(res2);

        console.log(userProfile);
        console.log(userRepos);
      }catch(err){
          toast.error(err);
      }finally{
        setLoading(false);
      }
  },[]);

  useEffect(() => {
     getUserProfile();
  }, [getUserProfile]);

  return (
    <div className="m-4">
      <Search />
      <SortRepo />
      <div className="flex flex-col lg:flex-row gap-4 justify-center items-start">
        {userProfile && !loading && <Profile userProfile={userProfile} />}
        {userRepos && !loading && <Repos userRepos={userRepos} />}
        {loading && <Spinner />}
      </div>
    </div>
  );
}

export default HomePage;
