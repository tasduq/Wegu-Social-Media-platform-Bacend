require("dotenv").config()
const jwt = require("jsonwebtoken")

exports.loginRequired = function(req,res,next){
	try{
		let token = req.headers.authentication.split(" ")[1]
		jwt.verify(token , process.env.SECRET_KEY , function(err, decoded){
			if(decoded){
				return next()
			}else{
				return next({
					status:401,
					message:"Please login First"
				})
			}
		})
		
	}catch(err){
		return next({
			status:401,
			message:"Please login First"
		})
		
	}
	
}

exports.userHavePermission = function(req,res,next){
	try{
		let token = req.headers.authentication.split(" ")[1]
		jwt.verify(token , process.env.SECRET_KEY , function(err , decoded){
			if(decoded && decoded.id === req.params.id){
				return next()
			}
			else{
				return next({
					status:401,
					message:"User Unauthorized"
				})
			}
		})
	}catch(err){
		return next({
			status:401,
			message:"USer Unauthorized"
		})
	}
	
}








