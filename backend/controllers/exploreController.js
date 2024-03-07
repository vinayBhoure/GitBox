require('dotenv').config();

const exploreController = async(req, res) => {
    
    const { language} = req.params;
    try{
         const repos = await fetch(`https://api.github.com/search/repositories?q=stars:>1+language:${language}&sort=stars&order=desc&type=Repositories&per_page=10`,
         {
         headers: {
            authorization: `token ${process.env.GITHUB_TOKEN}`,
        },
    });
    
         const reposJson = await repos.json();

         res.status(200).json({repos: reposJson.items});
    }
    catch(error){
        res.status(500).json({error: error.message});
    }
}

module.exports = exploreController;   