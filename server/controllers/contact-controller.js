const Contact = require("../models/contact-model");

//Contact

const contactForm = async (req, res) => {
  try {
    const response = req.body;
    console.log(response);
    await Contact.create(response);
    res.status(200).json({ message: "message sent successfully" });
  } catch (error) {
    res.status(500).json({ message: "message not sent" });
  }
};

module.exports = { contactForm };
