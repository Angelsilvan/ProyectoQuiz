// GET /quizes/question
exports.question = function(req, res){
	var answer = req.query.answer || '';	
	res.render('quizes/question', {pregunta: 'Capital de Italia'});
};

// GET /quizes/answer
exports.answer = function(req, res){
	if (req.query.respuesta === 'Roma'){
		res.render('quizes/answer', {respuesta: 'La respuesta es correcta'});
	}
	else {
		res.render('quizes/answer', {respuesta: 'La respuesta es incorrecta'});
	}
};

exports.author = function(req,res){
	res.render('author.ejs');
}
