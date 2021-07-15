const withAuth = (req, res, next) => {
    if (!req.session.logged_in) {
      res.redirect('/login');
    } else {
      if (req.session.lastViewed && (Date.now() - req.session.lastViewed > 300000)) {
        console.log(Date.now() - req.session.lastViewed)
        req.session.lastViewed = Date.now()
        console.log('redirect now')
        res.redirect('/api/users/logout');
        return;
      
      
      } else {
        req.session.lastViewed = Date.now()
      next();
      }
      
    }
  };
  
  module.exports = withAuth;