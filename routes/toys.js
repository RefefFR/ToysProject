const express = require("express");
const { auth } = require("../middlewares/auth");
const { validateToy, ToyModel } = require("../models/toyModel");
const router = express.Router();

//a
router.get("/", async (req, res) => {
  try {
    const pageQ = req.query.page - 1 || 0;
    const limit = 10;
    const data = await ToyModel.find({})
      .limit(limit)
      .skip(pageQ * limit).sort({name:-1});
    res.json(data);
  } catch (err) {
    console.log(err);
    res.status(502).json({ err });
  }
});
//b
router.get("/specify/", async (req, res) => {
  try {
    const nameQ = req.query.name;
    const infoQ = req.query.info;
    const data = await ToyModel.find({$or:[{name:nameQ},{info:infoQ}]}).sort({name:1})
    res.json(data);
  } catch (err) {
    console.log(err);
    res.status(502).json({ err });
  }
});
//c
router.get("/category/", async (req, res) => {
  try {
    const catQ = req.query.catname;
    const data = await ToyModel.find({ category: catQ }).sort({name:1});
    res.json(data);
  } catch (err) {
    console.log(err);
    res.status(502).json({ err });
  }
});
//d 
router.post("/", auth, async (req, res) => {
  const validBody = validateToy(req.body);
  if (validBody.error) {
    return res.status(400).json(validBody.error.details);
  }
  try {
    const Toy = new ToyModel(req.body);
    // להוסיף מאפיין של יוזר איי די לרשומה
    Toy.user_id = req.tokenData._id;
    await Toy.save();
    res.status(201).json(Toy);
  } catch (err) {
    console.log(err);
    res.status(502).json({ err });
  }
});
//e
router.put("/:id", auth, async (req, res) => {
  
  try {
    const id = req.params.id;
    console.log(id);
    const data=await ToyModel.updateOne({_id:id,user_id:req.tokenData._id},req.body);
    res.json(data);
  } catch (err) {
    console.log(err);
    res.status(502).json({ err });
  }
});
//f
router.delete("/:id",auth,async (req,res)=>{
  try{
    const id=req.params.id;
    const data=await ToyModel.deleteOne({_id:id,user_id:req.tokenData._id});
    res.json(data)
  }
  catch(err){
    console.log(err);
    res.status(502).json({err})
  }
})
//g
router.get("/prices",async(req,res)=>{
  try{
    const min=req.query.min;
    const max=req.query.max;
    const data=await ToyModel.find({"price":{$gt:min},"price":{$lt:max}}).sort({name:1})
    res.json(data)
  }
  catch(err){
    console.log(err);
    res.status(502).json({err})
  }
})
//h
router.get("/:id",async(req,res)=>{
  try{
    const id=req.params.id;
    const data=await ToyModel.find({_id:id})
    res.json(data)
  }
  catch(err){
    console.log(err);
    res.status(502).json({err})
  }
})
module.exports = router;
