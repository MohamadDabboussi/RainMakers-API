const mongoose = require('mongoose')

const rainmakerSchema = new mongoose.Schema({
  id:Number,
  firstName:String,
  lastName: String,
  username: {type :String, unique:true,required:true},
  email: String,
  age:Number
},
{collection:'RAINMAKERS'}
)

module.exports = mongoose.model('Rainmakers', rainmakerSchema)