const express = require('express');
const bodyParser = require('body-parser');
const { errorMiddleware } = require('./middlewares/errorMiddleware');
const { userValidate, invalidToken } = require('./middlewares/userValidate');
const { loginValidate } = require('./middlewares/loginValidate');
const controllerUser = require('./controllers/controllerUser');
const controllerLogin = require('./controllers/controllerLogin');

const app = express();
app.use(bodyParser.json());

app.get('/user', invalidToken, controllerUser.getAll);
app.post('/user', userValidate, controllerUser.create);
app.post('/login', loginValidate, controllerLogin.login);

app.use(errorMiddleware);

app.listen(3000, () => console.log('ouvindo porta 3000!'));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});
