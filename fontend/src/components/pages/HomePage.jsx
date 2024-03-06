import React, { useCallback, useEffect, useState } from "react";
import Search from "../Search";
import SortRepo from "../SortRepo";
import Profile from "../Profile";
import Repos from "../Repos";
import Spinner from "../Spinner";
import { toast } from "react-hot-toast";

function HomePage() {
  const [userProfile, setUserProfile] = useState(null);
  const [userRepos, setUserRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sortType, setSortType] = useState("recent");

  const getUserProfile = useCallback(async (userName = "vinayBhoure") => {
    setLoading(true);
    try {
      const userResult = await fetch(
        `https://api.github.com/users/${userName}`,
        {
          headers:{
            authorization: `token ${import.meta.env.VITE_GITHUB_TOKEN}`
          }
        }
      );
      const res = await userResult.json();
      setUserProfile(res);

      const repoResult = await fetch(res.repos_url,
        {
          headers:{
            authorization: `token ${import.meta.env.VITE_GITHUB_TOKEN}`
          }
        });
      const res2 = await repoResult.json();
      setUserRepos(res2);

      return { userProfile: res, userRepos: res2 };
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getUserProfile();
  }, [getUserProfile]);

  const onSearch = async (e, userName) => {
    e.preventDefault();

    setLoading(true);
    setUserProfile(null);
    setUserRepos([]);

    const { userProfile, userRepos } = await getUserProfile(userName);
    setUserProfile(userProfile);
    setUserRepos(userRepos);
    setLoading(false);
    setSortType("recent")
  };

  const onSort = (sortType) => {
    if(sortType == recent){
      setUserRepos(userRepos.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)));
    }
    else if(sortType == forks){
      setUserRepos(userRepos.sort((a, b) => b.forks - a.forks));
    }
    else if(sortType == stars){
      setUserRepos(userRepos.sort((a, b) => b.stargazers_count - a.stargazers_count));
    }
    setSortType(sortType);
    setUserRepos([...userRepos]);
  }

  return (
    <div className="m-4">
      <Search onSearch={onSearch} />
      <SortRepo onSort={onSort} sortType={sortType}/>
      <div className="flex flex-col lg:flex-row gap-4 justify-center items-start">
        {userProfile && !loading && <Profile userProfile={userProfile} />}
        {!loading && <Repos userRepos={userRepos} />}
        {loading && <Spinner />}
      </div>
    </div>
  );
}

export default HomePage;
