function errorHandler(error , request , response , next){
	response.status(error.status || 500).json({
		error:{
			message:error.message || "OOps something went wrong"
		}
	})
	
}

module.exports = errorHandler