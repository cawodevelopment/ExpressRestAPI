import HttpError from "../errors/http.error.js";

const errorHandling = async (err, req, res, next) => {
  if (err instanceof HttpError) {
    return res.status(err.status).json({ 
      success: false,
      error: {
          code: err.status,
          message: err.message
      } 
    });
  }

  res.status(500).json({ 
    success: false,
    error: {
        code: 500,
        message: err.message
    }
   });
} 

export default errorHandling;