const Contact = require('../models/contact-model')

//Contact

const contactForm=async(req,res,next)=>{
    try {
      const response =req.body;
      await Contact.create(response);
      res.status(200).json({message:"message sent successfully"})
    } catch (error) {
        // next(error)
        res.status(500).json({message:"message not sent"})
    }
  
  }

module.exports={contactForm};

