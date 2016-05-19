var models = require('../models/models.js');

//Autoload - Factoriza el código si la ruta incluye :quizId
exports.load = function(req,res,next,quizId){
	models.Quiz.findById(quizId).then(function(quiz){
		if(quiz){
			req.quiz = quiz;
			next();
		}
		else{
			next(new Error ('No existe quizId = ' + quizId));
		}
	}).catch(function(error){next(error);});
};

// GET /quizes.:format?
exports.index = function(req,res){
	if(req.query.busqueda === undefined || req.query.busqueda === '' ){	//Si no existe el párametro de búsqueda.
		models.Quiz.findAll().then(function(quizes){		//Buscamos todos los elementos.
			if(req.params.format === 'json'){
				res.json(quizes);
			}
			else {
				res.render('quizes/index.ejs', {quizes: quizes});	//Pasamos toda la matriz al renderizador que tendrá tantos elementos como filas tiene la tabla.
			}
		}).catch(function(error){next(error);});
	}
	else{	//Si hemos introducido algo no vacío en el cajetín
		var busqueda = req.query.busqueda.replace(/ /g, "%");	//Palabra introducida
		models.Quiz.findAll({where: ["pregunta like ?", "%"+busqueda+"%"], order: ["pregunta"]}).then(function(quizes){
		if(req.params.format === 'json'){
			res.json(quizes);
		}
		else {
			res.render('quizes/index.ejs', {quizes: quizes});	//Pasamos toda la matriz al renderizador que tendrá tantos elementos como filas tiene la tabla.
		}})	
	}													//Solo con los elementos buscados.
};

// GET /quizes/:id(\\d).:format?
exports.show = function(req, res){
		res.render('quizes/show',{quiz:req.quiz});						//Renderizamos la vista.
};

// GET /quizes/answer
exports.answer = function(req, res){
	var resultado = 'Incorrecto';
		if (req.query.respuesta === req.quiz.respuesta){
			resultado = 'Correcto';
		}
			res.render('quizes/answer', {quiz:req.quiz, respuesta: resultado});	//Renderizamos que es incorrecto.
};

exports.author = function(req,res){
	res.render('author.ejs');
};
