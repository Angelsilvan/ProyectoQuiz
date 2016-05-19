var express = require('express');
var router = express.Router();
var quizController = require ('../controllers/quiz_controller');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {title:'Quiz'});
});

//Autoload de comandos con quiz:Id
router.param('quizId', quizController.load);	//Autoload si el parámetro quizId existe sino no.SSS

//Visualización de los recursos.
router.get('/quizes.:format?', quizController.index);
router.get('/quizes/:quizId(\\d+).:format?', quizController.show);			//Identificador con 1 o más digitos decimales (\\d+).
router.get('/quizes/:quizId(\\d+)/answer', quizController.answer);
router.get('/quizes/new', quizController.new);
router.post('/quizes/create', quizController.create);
router.get('/author', quizController.author);

module.exports = router;
