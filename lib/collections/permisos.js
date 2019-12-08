import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { check } from 'meteor/check';
import { Meteor } from 'meteor/meteor';
import { EasySearch } from 'meteor/easy:search';

// Required AutoForm setup
SimpleSchema.extendOptions(['autoform']);

export const Permisos = new Mongo.Collection('permisos');

export const PermisosIndex = new EasySearch.Index({
	collection: Permisos,
	fields: ['nombre','descripcion'],
	placeholder: "Search...",
	engine: new EasySearch.Minimongo(),
	defaultSearchOptions: {limit: 100}
})

Permisos.attachSchema(new SimpleSchema({
	
	nombre: {type: String, label: 'Nombre'},	 

	descripcion:{ type: String, label: 'Descripción del rol', optional: true, 		
		autoform:{ type: "textarea", row: 10, class: "textarea"	}
	}﻿,

	owner:{	type: String, label: "Propietario",
		autoValue() {return this.userId	},
		autoform: {	type: "hidden"}
	},
	created: { type: Date,
			autoValue() {return new Date()},
		autoform: {	type: "hidden"}
	},	
	
}));

Permisos.allow({
	insert: function(userId, doc){
		return doc.owner === userId;
	},	
	update: function(userId, doc){
		return doc.owner === userId;
	}
});

Permisos.allow({
  insert: function () { return true; },
  update: function () { return true; },
  remove: function () { return true; }
});

Meteor.methods({
	'permisos.remove'(perId){
		check(perId, String);
		Permisos.remove(perId);
	},	
});



Meteor.methods({
    'permisos.agregarRol'(userId, rol) {
        Roles.addUsersToRoles(userId, rol);
    }
});

