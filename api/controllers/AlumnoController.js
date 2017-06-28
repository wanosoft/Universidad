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
				cursa:req.param('carrera'),
				password:req.param('psw'),
				passwordConfirmation:req.param('pswc')
			}

			// Alumno es el modelo
			Alumno.create(alumnoObj, function(err, alumno){
				if(err){
					//console.log(JSON.stringify(err));
					req.session.flash={err:err};
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
	},

	edit:function(req,res,next){
		sails.log('Entraste a editar');
		sails.log('Matricula: --> '+req.param('matricula'));

		Alumno.findOne({matricula:req.param('matricula')},
				function(err,alumno){
					if(err){
						return next(err);
					} res.view({alumno:alumno});
				});
	},

	update:function(req,res,next){
		var alumnoObj = {
			nombre: req.param('nombre'),
			apellido_paterno:req.param('ap'),
			apellido_materno:req.param('am'),
			edad:req.param('edad'),
			cursa:req.param('carrera')
		}

		Alumno.update({matricula:req.param('matricula')},
			alumnoObj, function(err,alumno){
				if (err) {
					sails.log(err);
					return res.redirect('/alumno/show/?matricula='
						+req.param('matricula'));
				} return res.redirect('/alumno/show/?matricula='
					+req.param('matricula'));
			}
		)
	},

	all:function(req,res,next){
		Alumno.find(function(error,alumnos){
			if (error) {
					sails.log(error);
					return next(error);
			} res.view({alumnos:alumnos});
		})
<<<<<<< HEAD
	},

	delete:function(req,res,next){
		Alumno.destroy({matricula:req.param('matricula')},
			function(err){
				if(err){
					sails.log(err);
					return next(err);
				} res.redirect('/alumno/all');
			}
		)
=======
>>>>>>> 79c18c7bf9e829dcbfdf4a83c468f2211b1b72fb
	}
};
