const ownerModel=require('../models/owner.model');

module.exports.createUser=async(data)=>{
    try{
        console.log(data.username);
        const newOwner=await ownerModel.insertOne({
            username:data.username,
            email:data.email,
            password:data.password,
            phone:data.phone
        });
        await newOwner.save();
        return newOwner;
    }
    catch(err){
        //res.status(344).json({message:"Error in creating the owner"});
        console.log(err);
    }
}