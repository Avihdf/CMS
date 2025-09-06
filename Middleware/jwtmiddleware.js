const jwt=require('jsonwebtoken');
const JWT_SECRET = 'your_secret_key'; 
const jwtMiddleware=(req,res,next)=>{


     const token=req.cookies.token;
     if (!token) {
        return res.redirect('/login');
    }

      try{

        const decoded=jwt.verify(token,JWT_SECRET);
        req.user = decoded;
        next();
      }
      catch{
        return res.clearCookie('token').redirect('/login');
      }


};
module.exports=jwtMiddleware;