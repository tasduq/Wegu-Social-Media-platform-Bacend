const db = require("../models/index.js")
const jwt = require("jsonwebtoken")

exports.signup = async function(req, res, next){
	try{
		let user = await db.User.create(req.body)
		let {id , userName , profileImg} = user
		let token = jwt.sign({
			id,
			userName,
			profileImg
		},process.env.SECRET_KEY)
		return res.status(200).json({
			id,
			userName,
			profileImg,
			token
		})
		
		
	}catch(err){
		if(err.code === 11000){
			err.message = "USername or email is already taken"
		}
		return next({
			status: err.code === 11000 ? 11000 : 400,
			message:err.message
		})
	}
}

exports.signin = async function(req,res,next){
	try{
		let user = await db.User.findOne({
			email:req.body.email
		})
		let {id , userName , profileImg } = user
		let isMatch = user.comparePassword(req.body.password)
		if(isMatch){
			let token = jwt.sign({
				id,
				userName,
				profileImg
			} , process.env.SECRET_KEY)
			return res.status(200).json({
				id,
				userName,
				profileImg,
				token
			})
		}else{
			return next({
				status: 400,
				message:"Invalid Email or password"
			})
		}
		
	}catch(err){
		return next({
			status:400,
			message:"Invalid Email or password"
		})
	}
}








