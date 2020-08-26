const mongoose = require("mongoose")
const User = require("./user.js")

const messageSchema = mongoose.Schema({
	message:{
		type:String,
		required:true,
		maxLength:160
	},
	user:{
		type:mongoose.Schema.Types.ObjectId,
		ref:"User"
	}
},
	{
	timeStamp:true
	
})

messageSchema.pre("remove" , async function(next){
	try{
		let user = await User.findById(this.user)
		user.message.remove(this.id)
		await user.save()
		return next()
	}catch(err){
		return next(err)
		
	}
	
})