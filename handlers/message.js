const db = require("../models/index.js")

exports.createMessage = async function(req,res,next){
	try{
		let message = await db.Message.create({
			text:req.body,
			ref:req.params.id
		})
		let foundUser = await db.User.findById(req.params.id)
		foundUser.message.push(message)
		await foundUser.save()
		
		let foundMessage = await db.Message.findById(message._id).populate("user" , {
			userName:true,
			profileImg:true
		})
		
		return res.status(200).json(foundMessage)
	}catch(err){
		next(err)
	}
}

exports.getMessage = async function(req , res ,next){
	try{
		let foundMessage = await db.Message.findById(req.params.message_id)
	    return res.status(200).json(foundMessage)
	}catch(err){
		return next(err)
	}
	
}

exports.deleteMessage = async function(req , res ,next){
	try{
		let foundMessage = await db.Message.findById(req.params.message_id)
		await foundMessage.remove()
		return res.status(200).json(foundMessage)
	}catch(err){
		return next(err)
	}
}















