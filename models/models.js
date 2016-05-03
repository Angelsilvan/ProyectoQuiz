var path = require('path');

//Cargar Modelo ORM
var Sequelize = require ('sequelize');

//Usar BBDD SQLite
var sequelize = new Sequelize(null,null,null,
								{dialect:"sqlite", storage:"quiz.sqlite"} //Tipo de base de datos y donde guardamos los datos.
							);

//Importar la definición de la tabla Quiz en quiz.js
var Quiz = sequelize.import(path.join(__dirname,'quiz'));
exports.Quiz = Quiz;	//Lo exportamos para poder importarlo en otros lugares de la aplicación.

//Inicializar la base de datos.
sequelize.sync().then(function(){			//Sincronizamos las definiciones que hay en el modelo.
												//.success ejecuta el manejador una vez creada la tabla
	Quiz.count().then(function(count){		//Nos dice el nº de filas que tiene la tabla.
		if(count===0){
			Quiz.create({pregunta:'Capital de Italia',	//Inicializamos la tabla si está vacía (0 filas).
						 respuesta: 'Roma'

			});
			Quiz.create({pregunta:'Capital de Portugal',	//Inicializamos la tabla si está vacía (0 filas).
						 respuesta: 'Lisboa'

			})
		.then(function(){console.log('Base de datos inicializada')});
		};
	});
});