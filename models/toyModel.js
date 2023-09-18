const mongoose = require("mongoose");
const Joi = require("joi");

let schema = new mongoose.Schema({
name:String,
info:String,
category:String,
img_url:String,
price:Number,
user_id:String,

},{timestamps:true})
exports.ToyModel = mongoose.model("Toys",schema)

exports.validateToy = (_reqBody) => {
let joiSchema = Joi.object({
name:Joi.string().min(2).max(400).required(),
info:Joi.string().min(2).max(400).required(),
category:Joi.string().min(2).max(400).required(),
img_url:Joi.string().min(2).max(400).allow(""),
price:Joi.number().min(1).max(10000).required(),
})
return joiSchema.validate(_reqBody)
}