const profile = async (req, res) => {

    const {username} = req.params;
    try{
        const user = await fetch(`https://api.github.com/users/${username}`, {
            headers: {
                "authorization": `token ${process.env.GITHUB_TOKEN}`
            }
        })
        const userData = await user.json();
        
        const repos = await fetch(userData.repos_url, {
            headers: {
                "authorization": `token ${process.env.GITHUB_TOKEN}`
            }
        })
        const reposData = await repos.json();

        res.status(200).json({userData, reposData});
    }catch(err){
        res.status(500).json({error: err.message});
    }
}

module.exports = profile;