var express = require('express');
var router = express.Router();
var quizController = require ('../controllers/quiz_controller');
var sessionController = require('../controllers/session_controller');

/* GET home page. */
router.get('/', quizController.contador);
router.get('/', function(req, res, next) {
  res.render('index', {title:'Quiz', errors:[]});
});

//Autoload de comandos con quiz:Id
router.param('quizId', quizController.load);	//Autoload si el parámetro quizId existe sino no.

//Definicion de rutas de sesion
router.get('/login', sessionController.new);	//Formulario de login.
router.post('/login', sessionController.create);	//Crear sesion.
router.get('/logout', sessionController.destroy);	//Destruir sesion.

//Visualización de los recursos.
router.get('/quizes.:format?', quizController.contador);
router.get('/quizes.:format?', quizController.index);
router.get('/quizes/:quizId(\\d+).:format?', quizController.contador);
router.get('/quizes/:quizId(\\d+).:format?', quizController.show);			//Identificador con 1 o más digitos decimales (\\d+).
router.get('/quizes/:quizId(\\d+)/answer', quizController.contador);
router.get('/quizes/:quizId(\\d+)/answer', quizController.answer);
router.get('/quizes/new', quizController.new);
router.post('/quizes/create', quizController.create);
router.get('/author', quizController.contador);
router.get('/author', quizController.author);

module.exports = router;
