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
  const [sortType, setSortType] = useState("forks");

  const getUserProfile = useCallback(async (userName = "vinayBhoure") => {
    setLoading(true);
    try {
      const userResult = await fetch(
        `https://api.github.com/users/${userName}`
      );
      const res = await userResult.json();
      setUserProfile(res);

      const repoResult = await fetch(res.repos_url);
      const res2 = await repoResult.json();
      setUserRepos(res2);

      return { res, res2 };
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

    const { res, res2 } = await getUserProfile(userName);
    setUserProfile(res);
    setUserRepos(res2);
    setLoading(false);
  };

  return (
    <div className="m-4">
      <Search onSearch={onSearch} />
      <SortRepo />
      <div className="flex flex-col lg:flex-row gap-4 justify-center items-start">
        {userProfile && !loading && <Profile userProfile={userProfile} />}
        {!loading && <Repos userRepos={userRepos} />}
        {loading && <Spinner />}
      </div>
    </div>
  );
}

export default HomePage;
