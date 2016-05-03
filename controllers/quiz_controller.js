var models = require('../models/models.js');

// GET /quizes/question
exports.question = function(req, res){
	models.Quiz.findAll().then(function(quiz){		//Nos devuelve un array con el contenido de la base de datos.
		res.render('quizes/question',{pregunta:quiz[0].pregunta})
	})
};

// GET /quizes/answer
exports.answer = function(req, res){
	models.Quiz.findAll().then(function(quiz){		//Nos devuelve un array con el contenido de la base de datos.
		if (req.query.respuesta === quiz[0].respuesta){
			res.render('quizes/answer', {respuesta: 'La respuesta es correcta'});
		}
		else {
			res.render('quizes/answer', {respuesta: 'La respuesta es incorrecta'});
		}
	})
};

exports.author = function(req,res){
	res.render('author.ejs');
};
