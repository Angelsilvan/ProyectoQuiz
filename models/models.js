var path = require('path');

//Cargar Modelo ORM
var Sequelize = require ('sequelize');

//Usar BBDDSQLite:
//	DATABASE_URL = sqlite:///
//	DATABASE_STORAGE = quiz.sqlite
//Usar BBDD Postgress:
//	DATABASE_URL = postgres://pwbijjukeoavks:FjYBLACP2ZpyTZky2Csls0ihKn@ec2-54-228-219-2.eu-west-1.compute.amazonaws.com:5432/d8cbul11h5bhu1
//	DATABASE_STORAGE --> No se utiliza en Heroku

var url, storage;

if(!process.env.DATABASE_URL){
	url = "sqlite:///";
	storage = "quiz.sqlite";
}
else{
	url = process.env.DATABASE_URL;
	storage = process.env.DATABASE_STORAGE || '';
}

//Usar BBDD SQLite
var sequelize = new Sequelize(url,					//Tipo de base de datos y donde guardamos los datos.
								{storage:storage,
								omitNull: true
								});

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