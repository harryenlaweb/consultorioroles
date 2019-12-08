import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import { Consultorios } from '../../../lib/collections/consultorios';
import { Usuarios } from '../../../lib/collections/usuarios';
import { Router } from 'meteor/iron:router';
import SimpleSchema from 'simpl-schema';
import { check } from 'meteor/check';

//const Messages = new Mongo.Collection('messages');

Template.consultorioUsuario.helpers({
	
	formCollection() {
		return Consultorios;
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

Template.consultorioUsuario.events({
	'click .agregarUsuario': function(event, template){		
		let usuarioSeleccionado = Usuarios.findOne({"_id":this._id});//obtengo el usuario seleccionado (objeto)
		//let user = Meteor.users.findOne("5SosYpEvotTEqcSpu");
		let user = Meteor.user();		

		let consultorio = template.data.consultorio;//obtengo el objeto consultorio

		
		//recupero los datos a insertar
		let us= {	idUser: usuarioSeleccionado.idUser,
					email:usuarioSeleccionado.email,					
					mispermisos:usuarioSeleccionado.mispermisos,
		};

		//inserto los datos en el arreglo
		Consultorios.update({_id:consultorio._id},{$push:{misusuarios:us}});

		Usuarios.update({_id:usuarioSeleccionado._id},{$set: {consultorio : consultorio.nombre }});
		
	},
	/*'click .removerTratamiento': function(event, template){	

		let tratamientoSeleccionado = Tratamientos.findOne({"_id":this._id});//obtengo el tratamiento seleccionado (objeto)
		let profesional = template.data.profesional;//obtengo el _id del profesional

		Meteor.call('profesionales.removeTrat',profesional._id, tratamientoSeleccionado._id);	
		
	}*/
})