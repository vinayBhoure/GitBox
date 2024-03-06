import React from 'react'
import Repo from './Repo'

function Repos({userRepos, fullScreen = false}) {

  const screenSize = fullScreen ? "w-full" : 'lg:w-2/3 w-full'
  return (
    <div className= {`${screenSize} bg-glass rounded-lg px-8 py-6`}>
      <ol className='relative border-s border-gray-200' >
       {userRepos.map((repo)=>{
        return <Repo key={repo.id} repo={repo}/>
       })}
       {
        userRepos.length === 0 && <p>No Repositories Found</p>
       }
      </ol>
    </div>
  )
}

export default Repos
