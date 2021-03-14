const express = require("express");
const router = require("express").Router();




let Usertest = require("../models/test.model");

//get the user bookings
router.get("/", async (req, res) => {
  try {
    const usertests = await Usertest.find();
    res.json(usertests);
  } catch (err) {
    res.json({ message: err });
  }
});

//register bookings

router.post("/add", async (req, res) => {
  const newUsertest = new Usertest({
    name: req.body.name,
    email: req.body.email,
    
  });

 

  try {
    const savedUsertest = newUsertest.save();
    res.json(savedUsertest);
  } catch (error) {
    if (error.code === 11000) {
      // duplicate key
      return res.json({ status: "error", error: "test is undone" });
    }
  }
});

// //delet bookings

// router.delete('/:id',async (req,res)=>{
//   try{
//     const deleteBooking = await Userbooking.remove({_id:req.params.id});
//     res.json(deleteBooking);
//   }catch(err){
//     res.json({message:err})
//   }
// })

module.exports = router;
