/**
 * AlumnoController
 *
 * @description :: Server-side logic for managing alumnoes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

	new:function(req,res){
		console.log('Entraste a New');
		res.view();
	},

	create:function(req,res){
			var alumnoObj = {
				matricula: req.param('idmatricula'),
				nombre: req.param('nombre'),
				apellido_paterno:req.param('ap'),
				apellido_materno:req.param('am'),
				edad:req.param('edad'),
				cursa:req.param('carrera')
			}

			// Alumno es el modelo
			Alumno.create(alumnoObj, function(err, alumno){
				if(err){
					return res.redirect('alumno/new');
				}
				sails.log('alumno %s%', alumno);
				res.redirect('alumno/show/?matricula='+alumno.matricula);
			})
	},

	show:function(req,res,next){
		sails.log('Entraste a show');
		sails.log('Matricula: --> '+req.param('matricula'));

		Alumno.findOne({matricula:req.param('matricula')},
				function(err,alumno){
					if(err){
						return next(err);
					} res.view({alumno:alumno});
				});
	}
};
