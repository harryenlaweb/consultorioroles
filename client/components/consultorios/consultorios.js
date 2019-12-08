import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import { Consultorios } from '../../../lib/collections/consultorios';
import { Router } from 'meteor/iron:router';
import SimpleSchema from 'simpl-schema';
import { check } from 'meteor/check';
import { ReactiveVar } from 'meteor/reactive-var'

Template.consultorios.onCreated(function(){     
  this.selConsultorioEliminar = new ReactiveVar(null);
  this.selConsultorioInfo = new ReactiveVar(null);
  this.selConsultorioEditar = new ReactiveVar(null);
});


Template.consultorios.helpers({
  searchAttributes() {
    return {
      placeholder: 'Buscar ...',
    };
  },
  
  consultorioEliminar: function() {     
    return Template.instance().selConsultorioEliminar.get();        
  },

  consultorioInfo: function() {     
    return Template.instance().selConsultorioInfo.get();        
  },

  consultorioEditar: function() {     
    return Template.instance().selConsultorioEditar.get();        
  },
});


Template.consultorios.events({

  'click .modalConsultorioInfo': function(event, template){        
      var consultorio = Consultorios.findOne({"_id":this._id});      
      Template.instance().selConsultorioInfo.set(consultorio);      
      $('#modalConsultorioInfo').modal('show');
    }, 

	'click .modalRemoveConsultorio': function(event, template){		
    	var consultorio = Consultorios.findOne({"_id":this._id});	    
	    Template.instance().selConsultorioEliminar.set(consultorio);
	    $('#modalEliminarConsultorio').modal('show');
  	},

  'click ._remove': function(event, template){ 
	    var consultorio = Template.instance().selConsultorioEliminar.get();
	    Meteor.call('consultorio.remove',consultorio._id);
	    $('#modalEliminarConsultorio').modal('hide');
	},

  //----------------SELECT DIA DEL CALENDARIO -------------------
  /*'dp.change #datetimepicker2': function(event, instance) {    
    var eleccion = event.date._d;    
    instance.selDia.set(eleccion); 
    var d = Template.instance().selDia.get();    
  },*/

  

  'click .modalConsultorioEditar': function(event, template){   
      var consultorio = Consultorios.findOne({"_id":this._id});      
      Template.instance().selConsultorioEditar.set(consultorio);
      $('#modalConsultorioEditar').modal('show');
    }, 

  'submit #formModificarConsultorio':function(event) {
      // Prevent default browser form submit
      event.preventDefault();

      // Get value from form element
      const target = event.target;            

      var consultorio = Template.instance().selConsultorioEditar.get();  

      Consultorios.update({_id:consultorio._id},{$set: {
        nombreApellido : target.nombreApellido.value,
        dni : target.dni.value,
        especialidad : target.especialidad.value,
        telefono : target.telefono.value,
        email : target.email.value,
        //fechaNacimiento : target.fechaNacimiento.value,
        sexo : target.sexo.value,
        descripcion : target.descripcion.value,            
      }});
      

      $('#modalConsultorioEditar').modal('hide'); //CIERRO LA VENTANA MODAL
      
  },


})



Template.consultorios.onRendered(function() {

    $('#datetimepicker2').datetimepicker({
        //inline: true,
        format:'L', 
        locale: 'es',       
    });   
});

