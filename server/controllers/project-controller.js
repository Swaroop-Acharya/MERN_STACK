const Project =require('../models/project-model')

const projects=async(req,res,next)=>{
    try {
        const response= await Project.find();
        if(!response){
            res.status(404).json({msg:"No projects found!!"})
            return;
        }
        res.status(200).json(response)
    } catch (error) {
        next(error)
    }
}

module.exports=projects;