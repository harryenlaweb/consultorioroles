import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { TratamientosProfesional } from './tratamientosProfesional';
import { Usuarios } from './usuarios';
import { check } from 'meteor/check';
import { Meteor } from 'meteor/meteor';
import { EasySearch } from 'meteor/easy:search';

// Required AutoForm setup
SimpleSchema.extendOptions(['autoform']);

export const Profesionales = new Mongo.Collection('profesionales');

export const ProfesionalesIndex = new EasySearch.Index({
	collection: Profesionales,
	fields: ['nombreApellido','especialidad'],
	placeholder: "Search...",
	engine: new EasySearch.Minimongo(),
	defaultSearchOptions: {limit: 100}
})

//*********************************************HORARIOS DE LA SEMANA DEL PROFESIONAL***************************************************
let HorarioProfesional = new SimpleSchema({
	atiendeManana: {type: Boolean, optional: true},
	mananaInicio: {type: Date,  optional: true},	
	mananaFin: {type: Date,  optional: true},	

	atiendeTarde: {type: Boolean, optional: true},
	tardeInicio: {type: Date,  optional: true},
	tardeFin: { type: Date, optional: true},
});

Profesionales.attachSchema(new SimpleSchema({

	combos: {type: Boolean, label: '¿Utiliza combos de tratamientos?', optional: true},

	
	nombreApellido: {type: String, label: 'Nombre y apellido'},

	dni: {type: String, label: 'DNI', optional: true},

	especialidad: {type: String, label: 'Especialidad', optional: true},

	telefono: {type: String, label: 'Telefono', optional: true},

	email: {type: String, label: 'email', optional: true},

	consultorio:{type: String, label: "Consultorio",
		autoValue() {
			var usuarioLogueado = Usuarios.findOne({idUser : this.userId});
			return usuarioLogueado.consultorio;			
		},
		autoform: {type: "hidden"}
	},		

	//le asigno un tratamiento al profesional. Este tratamiento se va mostrar al paciente que quiera sacar un turno por internet
	//tratamientoDeInternet: {type: TratamientosProfesional, optional: true, autoform: {type: "hidden"}},

  	mistratamientos: { type: Array, optional: true, 
  		autoform: {type: "hidden"}   
  	},
  	'mistratamientos.$': TratamientosProfesional,  	  	

	descripcion:{ type: String, label: 'Descripción del profesional', optional: true,
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
	lunes: 		{type: HorarioProfesional, optional:true, autoform: {type: "hidden"}},	
	martes: 	{type: HorarioProfesional, optional:true, autoform: {type: "hidden"}},	
	miercoles: 	{type: HorarioProfesional, optional:true, autoform: {type: "hidden"}},	
	jueves: 	{type: HorarioProfesional, optional:true, autoform: {type: "hidden"}},	
	viernes: 	{type: HorarioProfesional, optional:true, autoform: {type: "hidden"}},	
	sabado: 	{type: HorarioProfesional, optional:true, autoform: {type: "hidden"}},	
	domingo: 	{type: HorarioProfesional, optional:true, autoform: {type: "hidden"}},
	
}));

Profesionales.allow({
	insert: function(userId, doc){
		return doc.owner === userId;
	},	
	update: function(userId, doc){
		return doc.owner === userId;
	}
});

Profesionales.allow({
  insert: function () { return true; },
  update: function () { return true; },
  remove: function () { return true; }
});

Meteor.methods({
	'profesionales.remove'(profesionalId){
		check(profesionalId, String);
		Profesionales.remove(profesionalId);
	},	
})

Meteor.methods({
    'profesionales.removeTrat'(memberID, subID) {
        //console.log("MemberID: " + memberID + " | " + "SubID: " + subID);
        Profesionales.update(
            {_id: memberID},
            {$pull:{mistratamientos: {_id: subID}}}, {getAutoValues: false});
    },
    /*'profesionales.removeTratInternet'(memberID, subID) {
        //console.log("MemberID: " + memberID + " | " + "SubID: " + subID);
        Profesionales.update(
            {_id: memberID},
            {$set:{tratamientoDeInternet: {_id: subID}}}, {getAutoValues: false});
    }*/
});
