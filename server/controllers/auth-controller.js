const home = async (req, res) => {
  try {
    res.status(200).
    send({message:"Welcome to home page"});
  } catch (error) {
    console.log(error);
  }
};

const register=async(req,res)=>{
    try {
        res.status(200).send({message:"Welcome to register page"});
    } catch (error) {
        console.log(error)
        
    }
}

module.exports = { home ,register};
