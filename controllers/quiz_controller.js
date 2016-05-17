var models = require('../models/models.js');

// GET /quizes.:format?
exports.index = function(req,res){
	if(req.query.busqueda === undefined || req.query.busqueda === '' ){	//Si no existe el párametro de búsqueda.
		models.Quiz.findAll().then(function(quizes){		//Buscamos todos los elementos.
		if(req.params.format === 'json'){
			res.json(quizes);
		}
		else {
			res.render('quizes/index.ejs', {quizes: quizes});	//Pasamos toda la matriz al renderizador que tendrá tantos elementos como filas tiene la tabla.
		}})
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
	models.Quiz.findById(req.params.quizId).then(function(quiz){	//Busqueda del elemento asociado al id buscado.
		if (req.params.format === 'json'){
			res.json(quiz);
		}
		else{
		res.render('quizes/show',{quiz:quiz});						//Renderizamos la vista.
		}
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
