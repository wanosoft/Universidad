/**
 * AlumnoController
 *
 * @description :: Server-side logic for managing alumnoes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

	new:function(req,res){
		console.log("Entraste a New");
		res.view();
	},

	create:function(req,res,next){
			var alumnoObj = {
				nombre: req.param('nombre'),
				apellido_paterno:req.param('ap');
				apellido_materno:req.param('ap');
				edad:req.param('edad');
				cursa.req.param('carrera');
			}
	},

	// Alumno es el modelo
	Alumno.create(alumnoObj, function(err,alumno){
		if(err){
			return res.redirect('alumno/new');
		}
		return res.redirect('alumno/new');
	})
};
