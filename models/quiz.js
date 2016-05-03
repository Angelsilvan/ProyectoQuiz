//Definición del modelo de Quiz
//Cuando empiece a funcionar se crea quiz.sqlite que es como una base que contiene todos los datos.
//Si lo borramos (regeneramos) o si lo copiamos (back-up).

module.exports = function(sequelize, DataTypes){
	return sequelize.define('Quiz',  				//Nombre de la tabla
			{ pregunta: DataTypes.STRING,			//Campo específico de la aplicación: texto
			  respuesta: DataTypes.STRING,			//Campo específico de la aplicación:texto
			});
}