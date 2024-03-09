import React from 'react'
import { MdLogout } from "react-icons/md";
import { useAuthContext } from '../context/AuthContext';
import toast from 'react-hot-toast';

function Logout() {
	  const {authUser, setAuthUser} = useAuthContext();

	const handleLogout = async () => {
		try{
             const data = await fetch('/api/auth/logout', {credentials: 'include'});
			 const res = await data.json();
			 toast.success(res.message);
			 setAuthUser(null);
		}catch(err){
			toast.error(err.message);
		}
	}
  return (
    <>
			{authUser && <img
				src={authUser?.avatar_url}
				className='w-10 h-10 rounded-full border border-gray-800'
			/>}

			<div className='cursor-pointer flex items-center p-2 rounded-lg bg-glass mt-auto border border-gray-800'
			onClick={handleLogout}> 
			
				<MdLogout size={22} />
			</div>
		</>
  )
}

export default Logout
