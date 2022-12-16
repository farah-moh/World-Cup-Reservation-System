const jwt = require('jsonwebtoken');

const auths = {};

auths.userAuth = (req, res, next) => {
 
    var token
    try {  
          console.log("🚀 ~ file: check-auth.js ~ line 14 ~ req.session.token", req.session)
        if(req.headers.authorization ||req.session.token){
          if (req.headers.authorization) {
            token = req.headers.authorization.split(" ")[1];
           }
          else if(req.session.token){
        
            token=req.session.token
           }
          
            if (token) {
                const decodedToken = jwt.verify(token, process.env.JWT_KEY);
                req.userData = decodedToken;
                next();
            } else {
                handleError(null, next);
            }
        } else {
            handleError(null, next);
        }
    } catch (error) {
        handleError(error, next);
    }
};

auths.adminAuth = (req, res, next) => {
    try {
        console.log("🚀 ~ file: check-auth.js ~ line 14 ~ req.session.token", req.session)
        if(req.headers.authorization ||req.session.token){
          if (req.headers.authorization) {
            token = req.headers.authorization.split(" ")[1];
           }
          else if(req.session.token){
        
            token=req.session.token
           }
            if (token) {
                const decodedToken = jwt.verify(token, process.env.JWT_KEY);
                req.userData = decodedToken;
                if (decodedToken.userType != "admin") {
                    throw new Error();
                }
                next();
            } else {
                handleError(null, next);
            }
        } else {
            handleError(null, next);
        }
    } catch (error) {
        handleError(error, next);
    }
};

module.exports = auths

function handleError(error, next) {
    if (error) {
        error.message = 'Auth Failed!!!';
        error.status = 401
        next(error);
    } else {
        const error = new Error();
        error.message = 'Auth Failed!!';
        error.status = 401
        next(error);
    }
}