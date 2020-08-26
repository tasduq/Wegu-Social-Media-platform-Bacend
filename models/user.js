const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const Message = require("./message.js")

const userSchema = mongoose.Schema({
	email:{
		type:String,
		required:true,
		unique:true
	},
	userName:{
		type:String,
		required:true,
		unique:true
	},
	password:{
		type:String,
		required:true,
	},
	profileImg:{
		imgUrl:String
	},
	message:[{
		type:mongoose.Schema.Types.ObjectId,
		ref:"Message"
	}]
	
})

userSchema.pre("save" , async function(next){
	try{
		if(!isModified("password")){
			next()
		}
		let hashedPassword = await bcrypt.hash(this.password , 10)
		this.password = hashedPassword;
		return next()
		
	}catch(err){
		return next(err)
		
	}
	
})

userSchema.methods.comparePassword = async function(candidatePassword , next){
	 try{
		 let isMatch = await bcrypt.compare(candidatePassword , this.password)
		 return isMatch;
		 
	 }catch(err){
		 return next(err)
	 }
}

 const User = mongoose.model("User" , userSchema)
 
 module.exports = User


