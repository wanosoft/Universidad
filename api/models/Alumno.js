/**
 * Alumno.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  autoCreatedAt: false,
  autoUpdatedAt: false,

    attributes: {

    	matricula: {
        type: 'integer',
        unique: true,
        primaryKey: true
      },

      nombre:{
      	type: 'string',
      	size: 25,
      	required:true
      },

      apellido_paterno:{
      	type: 'string',
      	size: 25,
      	required:true
      },

      apellido_materno:{
      	type: 'string',
      	size: 25,
      	required:true
      },

      edad:{
      	type: 'integer',
      	required:true
      },

      cursa:{
        model:'carrera' //nombre de la entidad a relacionar
      },

      cursa_materia:{
        collection:'materia',
        via:'matricula'
      },

      password:{
        type:'string',
        required: true
      },

      passwordConfirmation:{
        type:'string',
        required: true
      },

      encryptedPassword:{
        type:'string'
      },

      // NOTE: elimina ataques csrf del objeto password
      toJSON:function(){
        var obj = this.toObject();
        delete obj.password;
        delete obj._csrf;
        delete obj.passwordConfirmation;
        return obj;
      }
    },

    // NOTE: Ciclo de vida del callback
    beforeCreate: function(values, next) {
      console.log('Entraste a beforeCreate');
      var password = values.password;
      var passwordConfirmation = values.passwordConfirmation;
      console.log(password + '; ' + passwordConfirmation);

      if (!password || !passwordConfirmation || password!=passwordConfirmation) {
          var passError=[{
            name: 'passwordDoesNotMatch',
            message: 'Las contraseñas deben coincidir.'
          }]
          return next({
            err:passError
          });
      }

      require('bcrypt').hash(values.password, 10, function passwordEncrypted(err,encryptedPassword) {
        if (err) {
          return next(err);
        }
        values.password = null;
        values.passwordConfirmation = null;
        values.encryptedPassword = encryptedPassword;
        next();
      });
    }
};
