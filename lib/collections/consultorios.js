import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { UsuariosConsultorio } from './usuariosConsultorio';
import { check } from 'meteor/check';
import { Meteor } from 'meteor/meteor';
import { EasySearch } from 'meteor/easy:search';

// Required AutoForm setup
SimpleSchema.extendOptions(['autoform']);

export const Consultorios = new Mongo.Collection('consultorios');

export const ConsultoriosIndex = new EasySearch.Index({
	collection: Consultorios,
	fields: ['nombre','direccion'],
	placeholder: "Search...",
	engine: new EasySearch.Minimongo(),
	defaultSearchOptions: {limit: 100}
})

//*********************************************HORARIOS EL CONSULTORIO***************************************************
let HorarioConsultorio = new SimpleSchema({
	atiendeManana: {type: Boolean, optional: true},
	mananaInicio: {type: Date,  optional: true},	
	mananaFin: {type: Date,  optional: true},	

	atiendeTarde: {type: Boolean, optional: true},
	tardeInicio: {type: Date,  optional: true},
	tardeFin: { type: Date, optional: true},
});


Consultorios.attachSchema(new SimpleSchema({
	
	nombre: {type: String, label: 'Nombre'},

	direccion: {type: String, label: 'Direccion', optional: true},	

  	misusuarios: { type: Array, optional: true, 
  		autoform: {type: "hidden"}   
  	},
  	'misusuarios.$': UsuariosConsultorio,  	  	

	descripcion:{ type: String, label: 'Descripción del consultorio', optional: true,
		autoform:{ type: "textarea", row: 10, class: "textarea"}
	}﻿,

	owner:{type: String, label: "Propietario",
		autoValue() {return this.userId},
		autoform: {type: "hidden"}
	},
	created: {type: Date,
		autoValue() {return new Date()},
		autoform: {type: "hidden"}
	},	

	//Horario del consultorio
	lunes: 		{type: HorarioConsultorio, optional:true},	
	martes: 	{type: HorarioConsultorio, optional:true},	
	miercoles: 	{type: HorarioConsultorio, optional:true},	
	jueves: 	{type: HorarioConsultorio, optional:true},	
	viernes: 	{type: HorarioConsultorio, optional:true},	
	sabado: 	{type: HorarioConsultorio, optional:true},	
	domingo: 	{type: HorarioConsultorio, optional:true},		

}));

Consultorios.allow({
	insert: function(userId, doc){
		return doc.owner === userId;
	},	
	update: function(userId, doc){
		return doc.owner === userId;
	}
});

Consultorios.allow({
  insert: function () { return true; },
  update: function () { return true; },
  remove: function () { return true; }
});

Meteor.methods({
	'consultorios.remove'(consultorioId){
		check(consultorioId, String);
		Consultorios.remove(consultorioId);
	},	
})

Meteor.methods({
    'consultorios.removeUs'(memberID, subID) {
        //console.log("MemberID: " + memberID + " | " + "SubID: " + subID);
        Consultorios.update(
            {_id: memberID},
            {$pull:{misusuarios: {_id: subID}}}, {getAutoValues: false});
    }
});
