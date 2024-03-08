import React from 'react'
import { MdLogout } from "react-icons/md";
import {userAuth} from '../context/AuthContext';

function Logout() {
	const {authUser, setAuthUser} = userAuth();

	const handleLogout = async () => {
		try{
             const data = await fetch('/api/auth/logout', {credentials: 'include'});
			 setAuthUser(null);
		}catch(err){
			toast.error(err.message);
		}
	}
  return (
    <>
			<img
				src={authUser?.avatar_url}
				className='w-10 h-10 rounded-full border border-gray-800'
			/>

			<div className='cursor-pointer flex items-center p-2 rounded-lg bg-glass mt-auto border border-gray-800'
			onClick={handleLogout}>
				<MdLogout size={22} />
			</div>
		</>
  )
}

export default Logout
