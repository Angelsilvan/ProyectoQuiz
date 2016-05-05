var express = require('express');
var router = express.Router();
var quizController = require ('../controllers/quiz_controller');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {title:'Quiz'});
});

//Visualización de los recursos.
router.get('/quizes', quizController.index);
router.get('/quizes/:quizId(\\d+)', quizController.show);			//Identificador con 1 o más digitos decimales (\\d+).
router.get('/quizes/:quizId(\\d+)/answer', quizController.answer);
router.get('/author', quizController.author);

module.exports = router;
