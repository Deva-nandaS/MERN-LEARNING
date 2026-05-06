const express = require("express");
const router = express.Router();

const {getAll,create,update,remove}=require("../controllers/platformController")
router.post("/", create)
 

router.get("/", getAll)
  
router.delete("/:id", remove)

router.put("/:id",update)
 

module.exports = router;