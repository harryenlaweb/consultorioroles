import { Meteor } from 'meteor/meteor';
import { Tratamientos } from '../lib/collections/tratamientos';
import { Profesionales } from '../lib/collections/profesionales';
import { Turnos } from '../lib/collections/turnos';
import { Pacientes } from '../lib/collections/pacientes';
import { Obras } from '../lib/collections/obras';
import { Consultorios } from '../lib/collections/consultorios';
import { Permisos } from '../lib/collections/permisos';
import { Usuarios } from '../lib/collections/usuarios';


Meteor.publish('tratamientos', function tratamientosPublication()
{	
    var mostrar = Roles.userIsInRole(this.userId,['adminTotal']);
    if (mostrar){
      return Tratamientos.find();  
    }
    else{
      usuarioLogueado = Usuarios.findOne({idUser:this.userId})
      return Tratamientos.find({consultorio: usuarioLogueado.consultorio});
    }
    return Tratamientos.find();  
});

Meteor.publish('profesionales', function profesionalesPublication()
{	
    /*var mostrar = Roles.userIsInRole(this.userId,['adminTotal']);
    if (mostrar){
      return Profesionales.find();  
    }
    else{
      usuarioLogueado = Usuarios.findOne({idUser:this.userId});  
      return Profesionales.find({consultorio: usuarioLogueado.consultorio});
    } */ 
    return Profesionales.find();  
});

Meteor.publish('turnos', function turnosPublication()
{
    /*var mostrar = Roles.userIsInRole(this.userId,['adminTotal']);
    if (mostrar){
      return Turnos.find();  
    }
    else{
    	usuarioLogueado = Usuarios.findOne({idUser:this.userId});  
      return Turnos.find({consultorio: usuarioLogueado.consultorio});
    }*/
    return Turnos.find();  
});

Meteor.publish('pacientes', function pacientesPublication()
{
    /*var mostrar = Roles.userIsInRole(this.userId,['adminTotal']);
    if (mostrar){
      return Pacientes.find();  
    }
    else{
    	usuarioLogueado = Usuarios.findOne({idUser:this.userId});  
      return Pacientes.find({consultorio: usuarioLogueado.consultorio});
    }*/
    return Pacientes.find();  
});

Meteor.publish('obras', function obrasPublication()
{
    //-----------------------ESTE CODIGO ES PARA VARIOS CONSULTORIOS-----------------------------
    /*var mostrar = Roles.userIsInRole(this.userId,['adminTotal']);
    if (mostrar){
      return Obras.find();  
    }
    else{
    	usuarioLogueado = Usuarios.findOne({idUser:this.userId});  
      return Obras.find({consultorio: usuarioLogueado.consultorio});
    }*/
    return Obras.find({});
});

Meteor.publish('consultorios', function consultoriosPublication()
{
    /*var mostrar = Roles.userIsInRole(this.userId,['adminTotal']);
    if (mostrar){
      return Consultorios.find();  
    }
    else{
      usuarioLogueado = Usuarios.findOne({idUser:this.userId});  
      return Consultorios.find({nombre: usuarioLogueado.consultorio});
    }*/
    return Consultorios.find();  
});

Meteor.publish('permisos', function permisosPublication()
{
  /*var mostrar = Roles.userIsInRole(this.userId,['adminTotal']);
  if (mostrar){
    return Permisos.find();
  }*/
  //return Permisos.find({owner: this.userId});
  return Permisos.find();
  
});

Meteor.publish('usuarios', function usuariosPublication()
{  
    return Usuarios.find();
});

//PUBLICA LOS PERFILES DE GOOGLE O FACEBOOK PARA QUE PUEDAN SER UTILIZADOS
Meteor.publish('usersGoogle', function usersPublication()
{
  
  return Meteor.users.find({_id: this.userId}, {fields: {'services.google.email': 1}});
});

/*Meteor.publish('secrets', function (group) {
  if (Roles.userIsInRole(this.userId, ['view-secrets','admin'], group)) {

    return Meteor.secrets.find({group: group});

  } else {

    // user not authorized. do not publish secrets
    this.stop();
    return;

  }
});*/

//Meteor.publish("facebook_email", function() { return Meteor.users.find({_id: this.userId}, {fields: {'services.facebook.email': 1}}); });