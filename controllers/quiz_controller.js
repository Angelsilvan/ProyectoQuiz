var models = require('../models/models.js');

// GET /quizes
exports.index = function(req,res){
	models.Quiz.findAll().then(function(quizes){			//Buscamos todos los elementos para luego listarlos.
		res.render('quizes/index.ejs', {quizes: quizes});	//Pasamos toda la matriz al renderizador que tendrá tantos elementos como filas tiene la tabla.
	})
};

// GET /quizes/:id
exports.show = function(req, res){
	models.Quiz.findById(req.params.quizId).then(function(quiz){	//Busqueda del elemento asociado al id buscado.
		res.render('quizes/show',{quiz:quiz});						//Renderizamos la vista.
	})
};

// GET /quizes/answer
exports.answer = function(req, res){
	models.Quiz.findById(req.params.quizId).then(function(quiz){		//Nos devuelve un array con el contenido de la base de datos.
		if (req.query.respuesta === quiz.respuesta){
			res.render('quizes/answer', {quiz:quiz, respuesta: 'La respuesta es correcta'});	//Renderizamos que es correcto.
		}
		else {
			res.render('quizes/answer', {quiz:quiz, respuesta: 'La respuesta es incorrecta'});	//Renderizamos que es incorrecto.
		}
	})
};

exports.author = function(req,res){
	res.render('author.ejs');
};

