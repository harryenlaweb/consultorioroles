import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import { Permisos } from '../../../lib/collections/permisos';
import { Usuarios } from '../../../lib/collections/usuarios';
import { Router } from 'meteor/iron:router';
import SimpleSchema from 'simpl-schema';
import { check } from 'meteor/check';

//const Messages = new Mongo.Collection('messages');

Template.permisoUsuario.helpers({
	
	formCollection() {
		return Permisos;
	},
	formCollection() {
		return Usuarios;
	},
	searchAttributes() {
    return {
      placeholder: 'Buscar ...',
    };
  },
})

Template.permisoUsuario.events({
	'click .agregarPermiso': function(event, template){				

		let usuarioSeleccionado = Usuarios.findOne({"_id":this._id});//obtengo el usuario seleccionado (objeto)
		let permiso = template.data.permiso;//obtengo el objeto permiso	
		
		//recupero los datos a insertar
		//let per= {nombre:permiso.nombre};

		//inserto los datos en el arreglo
		Usuarios.update({_id:usuarioSeleccionado._id},{$push:{mispermisos:permiso.nombre}});		
	

		Meteor.call('permisos.agregarRol',usuarioSeleccionado.idUser, permiso.nombre); //(metodo, userId, rol)		
	},	
})