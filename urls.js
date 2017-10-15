var mongoose = require('mongoose');

var urlSchema = mongoose.Schema({
   shortUrl:{type:String, required:true},
   longUrl:{type:String,required:true}
})

module.exports = mongoose.model("URLS", urlSchema);