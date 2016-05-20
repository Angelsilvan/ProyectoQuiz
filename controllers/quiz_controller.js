var models = require('../models/models.js');
var sessionController = require('../controllers/session_controller');

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

exports.contador = function(req, res, next){
	var ahora = new Date();
	if(req.session.user){
		var inicio = req.session.user.minutos*60 + req.session.user.segundos;
		var actual = ahora.getMinutes()*60 + ahora.getSeconds();
		var conexion = actual - inicio;
		if (conexion > 120){		//Si el usuario está logueado y su sesión lleva más de dos minutos.
			res.redirect('/logout');	//Destruimos la sesión.
		} 
		else {		//Si el usuario está logueado pero su sesión no ha caducado, reiniciamos el atributo de la hora.
			req.session.user.minutos = ahora.getMinutes();
			req.session.user.segundos = ahora.getSeconds();
			next();
		}
	} 
	else {				//Si el usuario no está logueado pasamos al siguiente middleware.
		next();
	}
};

// GET /quizes.:format?
exports.index = function(req,res){
	if(req.query.busqueda === undefined || req.query.busqueda === '' ){	//Si no existe el párametro de búsqueda.
		models.Quiz.findAll().then(function(quizes){		//Buscamos todos los elementos.
			if(req.params.format === 'json'){
				res.json(quizes);
			}
			else {
				res.render('quizes/index.ejs', {quizes: quizes, errors:[]});	//Pasamos toda la matriz al renderizador que tendrá tantos elementos como filas tiene la tabla.
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
			res.render('quizes/index.ejs', {quizes: quizes, errors:[]});	//Pasamos toda la matriz al renderizador que tendrá tantos elementos como filas tiene la tabla.
		}})	
	}													//Solo con los elementos buscados.
};

// GET /quizes/:id(\\d).:format?
exports.show = function(req, res){
		res.render('quizes/show',{quiz:req.quiz, errors:[]});						//Renderizamos la vista.
};

// GET /quizes/answer
exports.answer = function(req, res){
	var resultado = 'Incorrecto';
		if (req.query.respuesta === req.quiz.respuesta){
			resultado = 'Correcto';
		}
			res.render('quizes/answer', {quiz:req.quiz, respuesta: resultado, errors:[]});	//Renderizamos que es incorrecto.
};

exports.author = function(req,res){
	res.render('author.ejs',{errors:[]});
};

exports.new = function(req, res){
	var quiz = models.Quiz.build({
		pregunta:"Pregunta", respuesta:"Respuesta"
	});
	res.render('quizes/new', {quiz:quiz, errors:[]});
};

//POST /quizes/create 
exports.create = function(req,res){
	var quiz = models.Quiz.build(req.body.quiz);
	quiz.validate().then(function(err){				//validate indica si está todo correcto o no.
		if(err){
			res.render('quizes/new', {quiz:quiz, errors: err.errors});		//Si hay errores se pasan los errores.
		}
		else{	//Si no ha habido ningún error guardamos la pregunta en la base de datos.
			//Guarda en la DB los campso pregunta y respuesta de quiz
			quiz.save({fields:["pregunta", "respuesta"]}).then(function(){
				res.redirect('/quizes')
			})	// La primitiva POST no tiene asociada una renderización por lo que hacemos una redirección HTTP para cargar de nuevo la página de preguntas.
		}
	});
};