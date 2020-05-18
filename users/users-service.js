module.exports = {
    isValid,
    restricted,
  };
  
  function isValid(user) {
    return Boolean(user.username && user.password && typeof user.password === "string");
  }

  function restricted(req, res, next){
    if(req.sessoin && req.session.loggedIn){
      next();
    }else{
      res.status(401).json({message: 'Restricted'})
    }
  }
