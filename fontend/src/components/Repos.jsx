import React from 'react'
import Repo from './Repo'

function Repos({userRepos}) {
  return (
    <div className=' lg:w-2/3 w-full bg-glass rounded-lg px-8 py-6'>
      <ol className='relative border-s border-gray-200' >
       {userRepos.map((repo)=>{
        return <Repo key={repo.id} repoInfo={repo}/>
       })}
       {
        userRepos.length === 0 && <p>No Repositories Found</p>
       }
      </ol>
    </div>
  )
}

export default Repos
