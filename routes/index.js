const express = require("express");
const router = express.Router();

router.get("/", async(req,res) => {
  res.json(documentation.html)
})

module.exports = router;
