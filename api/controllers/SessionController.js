/**
 * SessionController
 *
 * @description :: Server-side logic for managing sessions
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var bcrypt=require('bcrypt');

module.exports = {
	new:function(req, res){
		res.view();
	},

	create:function(req, res, next) {
		console.log("inicio logeo");
		var username=req.param('nombre');
		var password=req.param('psw');

		if (!username || !password) {
			var errorUser = [{message:'El usuario y/o contraseña no son válidos'}]

			req.session.flash = {
				err:errorUser
			}
			return res.redirect('sessions/new');
		}

		Alumno.findOne({matricula:username}, function userfounded(err,user){
			if (err) {
				req.session.flash = {err:err}
				return res.redirect('session/new');
			}

			if (!user) {
				var noUserError = [{message:'No se encuentra al usuario'}]
				req.session.flash = {
					err:noUserError
				}
				return res.redirect('session/new');
			}
			bcrypt.compare(password, user.encryptedPassword,function passwordMatch(err, valid){
				if (err) {
					req.session.flash = {err:err}
					return res.redirect('session/new');
				}

				if (!valid) {
					var noUserError = [{message: 'No match password'}]
					req.session.flash = {
						err:noUserError
					}
					return res.redirect('session/new')
				}
				req.session.authenticated = true;
				req.session.Alumno = user;
				return res.redirect('/alumno/show/?matricula='+user.matricula);
			});
		});
	},

	destroy:function(req, res, next) {
		req.session.destroy();
		res.redirect('session/new')
	}
};
