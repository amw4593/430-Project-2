const controllers = require('./controllers');
const mid = require('./middleware');

const router = (app) => {

  app.get('/login', mid.requiresSecure, mid.requiresLogout, controllers.Account.loginPage);
  app.post('/login', mid.requiresSecure, mid.requiresLogout, controllers.Account.login);

  app.post('/signup', mid.requiresSecure, mid.requiresLogout, controllers.Account.signup);

  app.get('/logout', mid.requiresLogin, controllers.Account.logout);

  // Route for fetching posts from the server
  app.get('/getPosts', mid.requiresLogin, controllers.Post.getPosts);

  // Route for creating a new post
  app.post('/post', mid.requiresLogin, controllers.Post.createPost);

  app.get('/', mid.requiresSecure, mid.requiresLogout, controllers.Account.loginPage);
};

module.exports = router;
