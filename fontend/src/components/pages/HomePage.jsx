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
      const result = await fetch(`/api/users/profile/${userName}`);
      const res = await result.json();
      const user = res.userData;
      const repos = res.reposData;

      setUserProfile(user);
      setUserRepos(repos);

      return { userProfile: user, userRepos: repos };
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
		if (sortType === "recent") {
			userRepos.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
		} else if (sortType === "stars") {
			userRepos.sort((a, b) => b.stargazers_count - a.stargazers_count); 
		} else if (sortType === "forks") {
			userRepos.sort((a, b) => b.forks_count - a.forks_count); 
		}
		setSortType(sortType);
		setUserRepos([...userRepos]);
	};

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
