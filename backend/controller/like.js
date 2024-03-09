const userSchema = require('../models/userSchema');
const like = async (req, res) => {
     try{
      const {username} = req.params;
      const user = await userSchema.findById(req.user._id.toString()); 
      
      const userToLike = await userSchema.findOne({username});

      if(!userToLike){
          return res.status(404).json({error: "User not found"});
      }

      if(user.liked_by.includes(userToLike._id)){
          return res.status(400).json({error: "User already liked"});
      }
      userToLike.liked_by.push({username: userToLike.username, avatar_url:user.avatar_url, liked_date: Date.now()});
      user.liked_profile.push(userToLike.username);

      await userToLike.save();
        await user.save();

        res.status(200).json({message: "User liked successfully"});

    }catch(err){
         res.status(500).json({error: err.message});
     }
}


module.exports = like;