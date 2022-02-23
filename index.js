const express = require('express');
const bodyParser = require('body-parser');
const { errorMiddleware } = require('./middlewares/errorMiddleware');
const { userValidate, invalidToken } = require('./middlewares/userValidate');
const { loginValidate } = require('./middlewares/loginValidate');
const { categorieValidate } = require('./middlewares/categorieValidate');
const controllerUser = require('./controllers/controllerUser');
const controllerLogin = require('./controllers/controllerLogin');
const controllerCategory = require('./controllers/controllerCategory');
const controllerBlogPost = require('./controllers/controllerBlogPost');
const { blogPostValidate } = require('./middlewares/blogPostValidate');

const app = express();
app.use(bodyParser.json());

app.get('/user', invalidToken, controllerUser.getAll);
app.get('/user/:id', invalidToken, controllerUser.getById);
app.get('/categories', invalidToken, controllerCategory.getAll);
app.get('/post', invalidToken, controllerBlogPost.getAll);

app.post('/user', userValidate, controllerUser.create);
app.post('/login', loginValidate, controllerLogin.login);
app.post('/categories', invalidToken, categorieValidate, controllerCategory.create);
app.post('/post', invalidToken, blogPostValidate, controllerBlogPost.create);

app.use(errorMiddleware);

app.listen(3000, () => console.log('ouvindo porta 3000!'));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});
