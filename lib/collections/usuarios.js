import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { check } from 'meteor/check';
import { Meteor } from 'meteor/meteor';
import { EasySearch } from 'meteor/easy:search';

// Required AutoForm setup
SimpleSchema.extendOptions(['autoform']);

export const Usuarios = new Mongo.Collection('usuarios');

export const UsuariosIndex = new EasySearch.Index({
	collection: Usuarios,
	fields: ['idUser', 'email', 'consultorio', 'rol'],
	placeholder: "Search...",
	engine: new EasySearch.Minimongo(),
	defaultSearchOptions: {limit: 100}
})


Usuarios.attachSchema(new SimpleSchema({

	idUser: {type: String, optional: true, label: 'idUser'},

	email: {type: String, optional: true, label: 'Email'},	

	consultorio: {type: String, optional: true, label: 'Consultorio'},	

	mispermisos: { type: Array, optional: true, 
  		autoform: {type: "hidden"}   
  	},
  	'mispermisos.$': String, 	
}));

Usuarios.allow({
	insert: function(userId, doc){
		return doc.owner === userId;
	},	
	update: function(userId, doc){
		return doc.owner === userId;
	}
});

Usuarios.allow({
  insert: function () { return true; },
  update: function () { return true; },
  remove: function () { return true; }
});

Meteor.methods({
	'usuarios.remove'(usuarioId){
		check(usuarioId, String);
		Usuarios.remove(usuarioId);
	}
})