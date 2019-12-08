import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { check } from 'meteor/check';
import { Meteor } from 'meteor/meteor';
import { EasySearch } from 'meteor/easy:search';
import { ObrasPaciente } from './obrasPaciente';
import { Usuarios } from './usuarios';

// Required AutoForm setup
SimpleSchema.extendOptions(['autoform']);

export const Pacientes = new Mongo.Collection('pacientes');

export const PacientesIndex = new EasySearch.Index({
	collection: Pacientes,
	fields: ['nombreApellido', 'dni', 'carnet', 'telefono',],
	placeholder: "Search...",
	engine: new EasySearch.Minimongo(),
	defaultSearchOptions: {limit: 100}
})


Pacientes.attachSchema(new SimpleSchema({

	//SI ES UN USUARIO GENERADO DESDE INTERNET TENGO QUE GUARDAR EL idUser logueado
	idUser: {type: String, optional: true, label: 'idUser'},

	vecesQueFalto: {type: Number, optional: true},

	pidioTurno: {type: Boolean, optional: true},

	nombreApellido: {type: String, 	label: 'Nombre y apellido', optional: true},
	
	dni: {type: String,	label: 'DNI', optional: true},	
	
	//este campo es necesario para el autocomplete cuando se busca un paciente a la hora de reservar un turno
	nombreDni: {type: String, label: 'nombreDni', optional: true,
		autoform: {	type: "hidden" }
	},

	telefono: {	type: String, optional: true, label: 'Teléfono'},

	direccion: {type: String, optional: true, label: 'Direccion'},

	localidad: {type: String, optional: true, label: 'Localiad'},

	provincia: {type: String, optional: true, label: 'Provincia'},

	email: {type: String, optional: true, label: 'Email'},

	profesion: {type: String, optional: true, label: 'Profesion'},

	fechaNacimiento: {type: Date, optional: true, label: 'Fecha de nacimiento'},

	fechaIngreso: {type: Date, optional: true, label: 'Fecha de ingreso'},

	//sexo: {type: String, label: '¿El paciente es Hombre o Mujer?', optional: true}, 

	consultorio:{type: String, label: "Consultorio",
		autoValue() {
			var usuarioLogueado = Usuarios.findOne({idUser : this.userId});
			return usuarioLogueado.consultorio;			
		},
		autoform: {type: "hidden"}
	},	

    /*misobras: {type: Array, optional: true, 
    	autoform: {type: "hidden"}   
  	},
  	'misobras.$': ObrasPaciente,   	*/

  	carnet: {type: String, optional: true}, 

  	obra: {type: String, optional: true}, 

	descripcion:{ type: String, label: 'Descripción del paciente', optional: true, 
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
	
}));

Pacientes.allow({
	insert: function(userId, doc){
		return doc.owner === userId;
	},	
	update: function(userId, doc){
		return doc.owner === userId;
	}
});

Pacientes.allow({
  insert: function () { return true; },
  update: function () { return true; },
  remove: function () { return true; }
});

Meteor.methods({
	'pacientes.remove'(pacienteId){
		check(pacienteId, String);
		Pacientes.remove(pacienteId);
	}
})

Meteor.methods({
    'pacientes.removeObra'(memberID, subID) {        
        Pacientes.update(
            {_id: memberID},
            {$pull:{misobras: {_id: subID}}}, {getAutoValues: false});
    }
});
