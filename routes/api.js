const express = require('express')
const router = express.Router()
const Rainmaker = require('../models/rainmaker')

// Getting all
 router.get('/', async (req, res) => {
   try {
     const rainmakers = await Rainmaker.find()
     res.json(rainmakers)
   } catch (err) {
     res.status(500).json({ message: err.message })
   }
 })

 //Getting One
// router.get('/:id', (req, res) => {
//   try {
//     const id=req.params.id
//       Rainmaker.findOne({id: id},
//     (err,result) =>{
//       if(err) {res.status(400).send(err)}
//       res.status(202).send(result) })
//   }
//    catch (err) {
//     res.status(500).json({ message: err.message })
//   }
// })

// Getting One
router.get('/:id',getRainmaker, async(req, res) => {
  await res.json(res.rainmaker)
})

// Creating one
router.post('/', async (req, res) => { 
 //let rainmakerData = req.body
 //let rainmaker = new Rainmaker(rainmakerData)
 //or
 const rainmaker = new Rainmaker({
   id: req.body.id,
   firstName:req.body.firstName,
   lastName: req.body.lastName,
   username:req.body.username ,
   email:req.body.email ,
   age:req.body.age
 })
 try {
   const newRainmaker = await rainmaker.save()
   res.status(201).json(newRainmaker)
 } catch (err) {
   res.status(400).json({ message: err.message })
 }
})

// Updating One
router.patch('/:id', getRainmaker, async (req, res) => {
 if (req.body.firstName != null) {
   res.rainmaker.firstName = req.body.firstName
 }
 if (req.body.lastName != null) {
   res.rainmaker.lastName = req.body.lastName
 }
 if (req.body.username != null) {
   res.rainmaker.username = req.body.username
 }
 if (req.body.email != null) {
   res.rainmaker.email = req.body.email
 }
 if (req.body.age != null) {
   res.rainmaker.age = req.body.age
 }
 try {
   const updatedRainmaker = await res.rainmaker.save()
   res.json(updatedRainmaker)
 } catch (err) {
   res.status(400).json({ message: err.message })
 }
})

router.put('/:id', getRainmaker, async (req, res) => {
   res.rainmaker.firstName = req.body.firstName
   res.rainmaker.lastName = req.body.lastName
   res.rainmaker.username = req.body.username
   res.rainmaker.email = req.body.email
   res.rainmaker.age = req.body.age
   try {
   const updatedRainmaker = await res.rainmaker.save()
   res.json(updatedRainmaker)
 } catch (err) {
   res.status(400).json({ message: err.message })
 }
})

// Deleting One
router.delete('/:id', getRainmaker, async (req, res) => {
 try {
   await res.rainmaker.remove()
   res.json({ message: 'Deleted Rainmaker' })
 } catch (err) {
   res.status(500).json({ message: err.message })
 }
})

// Get Rainmaker
async function getRainmaker(req, res, next) {
 try {
   await Rainmaker.findOne({id:req.params.id}, (err,result) =>{
   if(err) {res.status(400).send(err)}
   if (result == null) {
     return res.status(404).json({ message: 'Cannot find rainmaker' })
   }
   res.rainmaker = result
   next()
  } 
 )}
catch (err) {
   return res.status(500).json({ message: err.message })
 }
}

module.exports = router