const userSchema = require('../models/userSchema');
const getLikes = async (req, res) => {
    try{
     const user = await userSchema.findById(req.user._id);
     res.status(200).json({liked_by: user.liked_by});
    }catch(err){
        res.status(500).json({error: err.message});
    }
}

module.exports = getLikes;