import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import { Tratamientos } from '../../../lib/collections/tratamientos';
import { Profesionales } from '../../../lib/collections/profesionales';
import { Router } from 'meteor/iron:router';
import SimpleSchema from 'simpl-schema';
import { check } from 'meteor/check';

//const Messages = new Mongo.Collection('messages');




Template.profesionalTratamiento.helpers({
	formCollection() {
		return Tratamientos;
	},
	formCollection() {
		return Profesionales;
	},
	searchAttributes() {
	    return {
	      placeholder: 'Buscar ...',
	    };
  	},

  	tieneTratamientoInternet: function() {
  		let tratamientoSeleccionado = Tratamientos.findOne({"_id":this._id});//obtengo el tratamiento seleccionado (objeto)	    
	    var resp = false;
	    if (tratamientoSeleccionado.tratamientoDeInternet !== null){
	    	resp = true;
	    }
	    return resp;
	},
})

Template.profesionalTratamiento.events({
	'click .agregarTratamiento': function(event, template){		
		let tratamientoSeleccionado = Tratamientos.findOne({"_id":this._id});//obtengo el tratamiento seleccionado (objeto)

		let profesional = template.data.profesional;//obtengo el _id del profesional
		
		//recupero los datos a insertar
		let trat= {	_id: tratamientoSeleccionado._id,
					nombre:tratamientoSeleccionado.nombre,
					duracion:tratamientoSeleccionado.duracion,
					importe: tratamientoSeleccionado.importe,
					sexo:tratamientoSeleccionado.sexo,
					frecuencia:tratamientoSeleccionado.frecuencia,
					descripcion:tratamientoSeleccionado.descripcion,
					owner:tratamientoSeleccionado.owner,
		};

		//inserto los datos en el arreglo
		Profesionales.update({_id:profesional._id},{$push:{mistratamientos:trat}});		
	},
	'click .removerTratamiento': function(event, template){	

		let tratamientoSeleccionado = Tratamientos.findOne({"_id":this._id});//obtengo el tratamiento seleccionado (objeto)
		let profesional = template.data.profesional;//obtengo el _id del profesional

		Meteor.call('profesionales.removeTrat',profesional._id, tratamientoSeleccionado._id);	
		
	},


	'click .agregarTratamientoInternet': function(event, template){		
		let tratamientoSeleccionado = Tratamientos.findOne({"_id":this._id});//obtengo el tratamiento seleccionado (objeto)
		console.log(tratamientoSeleccionado);

		let profesional = template.data.profesional;//obtengo el _id del profesional
		
		//recupero los datos a insertar
		let trat= {	_id: tratamientoSeleccionado._id,
					nombre:tratamientoSeleccionado.nombre,
					duracion:tratamientoSeleccionado.duracion,
					importe: tratamientoSeleccionado.importe,
					sexo:tratamientoSeleccionado.sexo,
					frecuencia:tratamientoSeleccionado.frecuencia,
					descripcion:tratamientoSeleccionado.descripcion,
					owner:tratamientoSeleccionado.owner,
		};

		//inserto el tratamiento de internet
		Profesionales.update({_id:profesional._id},{$set: {tieneTratamientoInternet : trat}});		
	},
	

	'click .removerTratamientoInternet': function(event, template){	

		let tratamientoSeleccionado = Tratamientos.findOne({"_id":this._id});//obtengo el tratamiento seleccionado (objeto)

		let profesional = template.data.profesional;//obtengo el _id del profesional		

		//inserto el tratamiento de internet
		Profesionales.update({_id:profesional._id},{$set: {tieneTratamientoInternet : null}});		
		//Meteor.call('profesionales.removerTratamientoInternet',profesional._id, tratamientoSeleccionado._id);	
		
	}
})