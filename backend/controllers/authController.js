const auth = async(req, res) => {

    try{

    }catch(err){
        res.status(500).json({error: err.message});
    }
}

module.exports = auth;