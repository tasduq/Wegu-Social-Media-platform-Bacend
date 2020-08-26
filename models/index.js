const mongoose = require("mongoose")

mongoose.connect('mongodb+srv://tasduqali:Aneesakapapa99@yelpcamp-mbesx.mongodb.net/warbler?retryWrites=true&w=majority' , {
	useNewUrlParser: true
	
}).then(()=>{
	console.log("db connected")
}).catch(err =>{
	console.log("error",err.message)
});

module.exports.User = require("./user.js")
module.exports.Message = require("./message.js")