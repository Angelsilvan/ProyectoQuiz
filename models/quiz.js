//Definición del modelo de Quiz
//Cuando empiece a funcionar se crea quiz.sqlite que es como una base que contiene todos los datos.
//Si lo borramos (regeneramos) o si lo copiamos (back-up).

module.exports = function(sequelize, DataTypes){
	return sequelize.define('Quiz',  				//Nombre de la tabla
			{ pregunta: {
			 	type :DataTypes.STRING,			//Campo específico de la aplicación: texto
			 	validate: {notEmpty: {msg:" --> Falta la pregunta"}}				//notEmpty es una función interna de sequelize que permite ver si el campo está o no vacío.
			 },
			  respuesta: {
			  	type: DataTypes.STRING,			//Campo específico de la aplicación:texto
			  	validate: {notEmpty: {msg:" --> Falta la respuesta"}}
			 },
			});
}