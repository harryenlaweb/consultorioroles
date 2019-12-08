import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import { Tratamientos } from '../../../lib/collections/tratamientos';
import { Profesionales } from '../../../lib/collections/profesionales';
import { Pacientes } from '../../../lib/collections/pacientes';
import { Turnos } from '../../../lib/collections/turnos';
import { Router } from 'meteor/iron:router';
import SimpleSchema from 'simpl-schema';
import { check } from 'meteor/check';
import { ReactiveVar } from 'meteor/reactive-var'

Template.profesionales.onCreated(function(){     
  this.selProfesionalEliminar = new ReactiveVar(null);
  this.selProfesionalInfo = new ReactiveVar(null);
  this.selProfesionalEditar = new ReactiveVar(null);
});


Template.profesionales.helpers({
  searchAttributes() {
    return {
      placeholder: 'Buscar ...',
    };
  },
  
  profesionalEliminar: function() {     
    return Template.instance().selProfesionalEliminar.get();        
  },

  profesionalInfo: function() {     
    return Template.instance().selProfesionalInfo.get();        
  },

  profesionalEditar: function() {     
    return Template.instance().selProfesionalEditar.get();        
  },
});


Template.profesionales.events({

  'click .modalProfesionalInfo': function(event, template){        
      var profesional = Profesionales.findOne({"_id":this._id});      
      Template.instance().selProfesionalInfo.set(profesional);      
      $('#modalProfesionalInfo').modal('show');
    }, 

  'click .modalRemoveProfesional': function(event, template){   
      var profesional = Profesionales.findOne({"_id":this._id});      
      Template.instance().selProfesionalEliminar.set(profesional);
      $('#modalEliminarProfesional').modal('show');
    },

  'click ._remove': function(event, template){ 
      var profesional = Template.instance().selProfesionalEliminar.get();
      Meteor.call('profesionales.remove',profesional._id);
      $('#modalEliminarProfesional').modal('hide');
  },

  //----------------SELECT DIA DEL CALENDARIO -------------------
  /*'dp.change #datetimepicker2': function(event, instance) {    
    var eleccion = event.date._d;    
    instance.selDia.set(eleccion); 
    var d = Template.instance().selDia.get();    
  },*/

  

  'click .modalProfesionalEditar': function(event, template){   
      var profesional = Profesionales.findOne({"_id":this._id});      
      Template.instance().selProfesionalEditar.set(profesional);
      $('#modalProfesionalEditar').modal('show');
    }, 

  'submit #formModificarProfesional':function(event) {
     // Prevent default browser form submit
      event.preventDefault();

      // Get value from form element
      const target = event.target; 

      

      //if (target.combos.value){var ingresoCombos = target.combos.checked};            
      
      if (target.nombreApellido.value){var ingresoNombre = target.nombreApellido.value};
      if (target.dni.value){var ingresoDni = target.dni.value};
      if (target.especialidad.value){var ingresoEspecialidad = target.especialidad.value};
      if (target.telefono.value){var ingresoTelefono = target.telefono.value};
      if (target.email.value){var ingresoEmail = target.email.value};   
      if (target.descripcion.value){var ingresoDescripcion = target.descripcion.value};         
      
      var profesional = Template.instance().selProfesionalEditar.get();       

      Profesionales.update({_id:profesional._id},{$set: {
        //combos : ingresoCombos,
        nombreApellido : ingresoNombre,
        dni : ingresoDni,
        especialidad : ingresoEspecialidad,
        telefono : ingresoTelefono,
        email : ingresoEmail,
        descripcion : ingresoDescripcion,            
      }});
      

      $('#modalProfesionalEditar').modal('hide'); //CIERRO LA VENTANA MODAL
      
  },


})



Template.profesionales.onRendered(function() {

    $('#datetimepicker2').datetimepicker({
        //inline: true,
        format:'L', 
        locale: 'es',       
    });   
});

