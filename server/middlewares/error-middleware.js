const errorMiddleware = (err, req, res, next) => {
    console.log(err);
    
    const status = err.status || 500;
    const message = err.message || "Backend Error";
    const extraDetails = err.extraDetails || "Error from backend";
    res.status(status).json({ message, extraDetails });
  };
  
  module.exports = errorMiddleware;