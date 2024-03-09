const explorePage = async (req, res) => {
    const {language} = req.params;
    try{
        const result = await fetch(
            `https://api.github.com/search/repositories?q=language:${language}&sort=stars&order=desc&per_page=10`,
            {
              headers: {
                "authorization": `token ${process.env.GITHUB_TOKEN}`,
              },
            }
          );

          const data = await result.json();
          res.status(200).json({data});
    }catch(err){
        res.status(500).json({error: err.message});
    }
}

module.exports = explorePage;