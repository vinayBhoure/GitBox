import React from 'react'
import { IoLocationOutline } from "react-icons/io5";
import { RiGitRepositoryFill, RiUserFollowFill, RiUserFollowLine } from "react-icons/ri";
import { FaXTwitter } from "react-icons/fa6";
import { TfiThought } from "react-icons/tfi";
import { FaEye } from "react-icons/fa";

function Profile() {

    const ProfileInfo = () => {
	const userProfile = {
		avatar_url: "https://ps.w.org/user-avatar-reloaded/assets/icon-256x256.png?rev=2540745",
		bio: "👨🏻‍💻👨🏻‍💻👨🏻‍💻",
		email: "johndoe@gmail.com",
		followers: 100,
		following: 200,
		html_url: "https://github.com/burakorkmez",
		location: "Somewhere, Earth",
		name: "John Doe",
		public_gists: 100,
		public_repos: 100,
		twitter_username: "johndoe",
		login: "johndoe",
	}};
  return (
    <div>
      profile
    </div>
  )
}

export default Profile
