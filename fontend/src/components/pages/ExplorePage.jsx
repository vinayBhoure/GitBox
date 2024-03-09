import React from "react";
import Spinner from "../Spinner";
import Repos from "../Repos";
import { useState } from "react";

function ExplorePage() {
  const [repo, setRepo] = useState([]);
  const [loading, setLoading] = useState(false);
  const [language, setLanguage] = useState("javascript");
  const searchHandler = async (e, language) => {
    setLoading(true);
    setRepo([]);
    try {
      const res = await fetch(`/api/explore/${language}`);

      const repo = await res.json();
      setRepo(repo.data.items);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="px-4">
      <div className="bg-glass max-w-2xl mx-auto rounded-md p-4">
        <h1 className="text-xl font-bold text-center">
          Explore Popular Repositories
        </h1>
        <div className="flex flex-wrap gap-2 my-2 justify-center">
          <img
            src="/javascript.svg"
            alt="JavaScript"
            className="h-11 sm:h-20 cursor-pointer"
            onClick={(e) => searchHandler(e, "javascript")}
          />
          <img
            src="/typescript.svg"
            alt="TypeScript logo"
            className="h-11 sm:h-20 cursor-pointer"
            onClick={(e) => searchHandler(e, "typescript")}
          />
          <img
            src="/c++.svg"
            alt="C++ logo"
            className="h-11 sm:h-20 cursor-pointer"
            onClick={(e) => searchHandler(e, "c++")}
          />
          <img
            src="/python.svg"
            alt="Python logo"
            className="h-11 sm:h-20 cursor-pointer"
            onClick={(e) => searchHandler(e, "python")}
          />
          <img
            src="/java.svg"
            alt="Java logo"
            className="h-11 sm:h-20 cursor-pointer"
            onClick={(e) => searchHandler(e, "java")}
          />
        </div>
        {!loading && repo.length > 0 && <Repos userRepos={repo} fullScreen />}
        {loading && <Spinner />}
      </div>
    </div>
  );
}

export default ExplorePage;
