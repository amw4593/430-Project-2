const controllers = require('./controllers');
const mid = require('./middleware');

const router = (app) => {
  app.get('/getPosts', mid.requiresLogin, controllers.Post.getPosts);

  app.get('/login', mid.requiresSecure, mid.requiresLogout, controllers.Account.loginPage);
  app.post('/login', mid.requiresSecure, mid.requiresLogout, controllers.Account.login);

  app.post('/signup', mid.requiresSecure, mid.requiresLogout, controllers.Account.signup);

  app.get('/logout', mid.requiresLogin, controllers.Account.logout);

  // Router for fetching posts from the server

  // Router for creating a new post
  app.get('/post', mid.requiresLogin, controllers.Post.postPage);
  app.post('/createPost', mid.requiresLogin, controllers.Post.createPost);

  app.get('/', mid.requiresSecure, mid.requiresLogout, controllers.Account.loginPage);
};

module.exports = router;
