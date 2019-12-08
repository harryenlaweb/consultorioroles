import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import { Consultorios } from '../../../lib/collections/consultorios';
import { Profesionales } from '../../../lib/collections/profesionales';
import { Pacientes } from '../../../lib/collections/pacientes';
import { Turnos } from '../../../lib/collections/turnos';
import { Router } from 'meteor/iron:router';
import SimpleSchema from 'simpl-schema';
import { check } from 'meteor/check';
import { ReactiveVar } from 'meteor/reactive-var';

Template.horarios.onCreated(function(){     
  this.selMostrarManana = new ReactiveVar(false);
  this.selMostrarTarde = new ReactiveVar(false);
  

});

Template.registerHelper('formatDate4', function(date) {
	
	if (date !== undefined){
		return moment(date).format("HH:mm");		
	} else {
		var fecha = new Date();
		fecha.setHours(0,0,0);
		return moment(fecha).format("HH:mm");
	}
  
});

Template.horarios.helpers({    
  'verManana': function(){
    return Template.instance().selMostrarManana.get();
  },  
});


Template.horarios.events({

  'click .mostrarManana': function(){
      Template.instance().selMostrarManana.set(true);
   },
  
  'click .modalCargarLunes': function(event, template){             
        $('#modalCargarLunes').modal('show');
    },
 'submit #formCargarLunes':function(event) {
     // Prevent default browser form submit
      event.preventDefault();

      // Get value from form element
      const target = event.target;       

      //----------------------------------------------------------------MAÑANA--------------------------------------------------------
      if (target.rangoMananaLunes.value){var manana = target.rangoMananaLunes.value};       
      
      var mananaInicio = manana.substr(0,5); //cadena.substr(inicio[, longitud])
      var faperturaManana = new Date(); faperturaManana = moment(mananaInicio, 'HH:mm');
      faperturaManana = new Date(faperturaManana);      
      
      var mananaFin = manana.substr(6,5);
      var fcierreManana = new Date(); fcierreManana = moment(mananaFin, 'HH:mm');      
      fcierreManana = new Date(fcierreManana);
      

      if (target.rangoTardeLunes.value){var tarde = target.rangoTardeLunes.value}; 

       var tardeInicio = tarde.substr(0,5); //cadena.substr(inicio[, longitud])
      var faperturaTarde = new Date(); faperturaTarde = moment(tardeInicio, 'HH:mm');
      faperturaTarde = new Date(faperturaTarde);
      
      var tardeFin = tarde.substr(6,5);
      var fcierreTarde = new Date(); fcierreTarde = moment(tardeFin, 'HH:mm');
      fcierreTarde = new Date(fcierreTarde);      

      if (target.trabajaMananaLunes.value){var atManana = target.trabajaMananaLunes.checked};            
      if (target.trabajaTardeLunes.value){var atTarde = target.trabajaTardeLunes.checked};            
      //var atManana = target.trabajaMananaLunes.value;
      //var atTarde = target.trabajaTarde.Lunes.value;
    
      var cons = this.consultorio; 
      console.log(this);

      Consultorios.update({_id:cons._id},{$set: {
        lunes : {
          atiendeManana: atManana,
          mananaInicio: faperturaManana,          
          mananaFin : fcierreManana,
          atiendeTarde: atTarde,
          tardeInicio: faperturaTarde,
          tardeFin: fcierreTarde,
        }        
      }});

      $('#modalCargarLunes').modal('hide'); //CIERRO LA VENTANA MODAL      
  },


  'click .modalCargarMartes': function(event, template){            
        $('#modalCargarMartes').modal('show');
    },
 'submit #formCargarMartes':function(event) {
     // Prevent default browser form submit
      event.preventDefault();

      // Get value from form element
      const target = event.target;       

      //----------------------------------------------------------------MAÑANA--------------------------------------------------------
      if (target.rangoMananaMartes.value){var manana = target.rangoMananaMartes.value};       
      
      var mananaInicio = manana.substr(0,5); //cadena.substr(inicio[, longitud])
      var faperturaManana = new Date(); faperturaManana = moment(mananaInicio, 'HH:mm');
      faperturaManana = new Date(faperturaManana);      
      
      var mananaFin = manana.substr(6,5);
      var fcierreManana = new Date(); fcierreManana = moment(mananaFin, 'HH:mm');      
      fcierreManana = new Date(fcierreManana);
      

      if (target.rangoTardeMartes.value){var tarde = target.rangoTardeMartes.value}; 

       var tardeInicio = tarde.substr(0,5); //cadena.substr(inicio[, longitud])
      var faperturaTarde = new Date(); faperturaTarde = moment(tardeInicio, 'HH:mm');
      faperturaTarde = new Date(faperturaTarde);
      
      var tardeFin = tarde.substr(6,5);
      var fcierreTarde = new Date(); fcierreTarde = moment(tardeFin, 'HH:mm');
      fcierreTarde = new Date(fcierreTarde);      

      if (target.trabajaMananaMartes.value){var atManana = target.trabajaMananaMartes.checked};            
      if (target.trabajaTardeMartes.value){var atTarde = target.trabajaTardeMartes.checked};            
      //var atManana = target.trabajaMananaMartes.value;
      //var atTarde = target.trabajaTarde.Martes.value;
    
      var cons = this.consultorio; 
      console.log(this);

      Consultorios.update({_id:cons._id},{$set: {
        martes : {
          atiendeManana: atManana,
          mananaInicio: faperturaManana,          
          mananaFin : fcierreManana,
          atiendeTarde: atTarde,
          tardeInicio: faperturaTarde,
          tardeFin: fcierreTarde,
        }        
      }});

      $('#modalCargarMartes').modal('hide'); //CIERRO LA VENTANA MODAL      
  },

  'click .modalCargarMiercoles': function(event, template){   		  		
      	$('#modalCargarMiercoles').modal('show');
    },
 'submit #formCargarMiercoles':function(event) {
     // Prevent default browser form submit
      event.preventDefault();

      // Get value from form element
      const target = event.target;       

      //----------------------------------------------------------------MAÑANA--------------------------------------------------------
      if (target.rangoMananaMiercoles.value){var manana = target.rangoMananaMiercoles.value};       
      
      var mananaInicio = manana.substr(0,5); //cadena.substr(inicio[, longitud])
      var faperturaManana = new Date(); faperturaManana = moment(mananaInicio, 'HH:mm');
      faperturaManana = new Date(faperturaManana);      
      
      var mananaFin = manana.substr(6,5);
      var fcierreManana = new Date(); fcierreManana = moment(mananaFin, 'HH:mm');      
      fcierreManana = new Date(fcierreManana);
      

      if (target.rangoTardeMiercoles.value){var tarde = target.rangoTardeMiercoles.value}; 

       var tardeInicio = tarde.substr(0,5); //cadena.substr(inicio[, longitud])
      var faperturaTarde = new Date(); faperturaTarde = moment(tardeInicio, 'HH:mm');
      faperturaTarde = new Date(faperturaTarde);
      
      var tardeFin = tarde.substr(6,5);
      var fcierreTarde = new Date(); fcierreTarde = moment(tardeFin, 'HH:mm');
      fcierreTarde = new Date(fcierreTarde);      

      if (target.trabajaMananaMiercoles.value){var atManana = target.trabajaMananaMiercoles.checked};            
      if (target.trabajaTardeMiercoles.value){var atTarde = target.trabajaTardeMiercoles.checked};            
      //var atManana = target.trabajaMananaMiercoles.value;
      //var atTarde = target.trabajaTarde.Miercoles.value;
    
      var cons = this.consultorio; 
      console.log(this);

      Consultorios.update({_id:cons._id},{$set: {
        miercoles : {
          atiendeManana: atManana,
          mananaInicio: faperturaManana,          
          mananaFin : fcierreManana,
          atiendeTarde: atTarde,
          tardeInicio: faperturaTarde,
          tardeFin: fcierreTarde,
        }        
      }});

      $('#modalCargarMiercoles').modal('hide'); //CIERRO LA VENTANA MODAL      
  },

  'click .modalCargarJueves': function(event, template){            
        $('#modalCargarJueves').modal('show');
    },
 'submit #formCargarJueves':function(event) {
     // Prevent default browser form submit
      event.preventDefault();

      // Get value from form element
      const target = event.target;       

      //----------------------------------------------------------------MAÑANA--------------------------------------------------------
      if (target.rangoMananaJueves.value){var manana = target.rangoMananaJueves.value};       
      
      var mananaInicio = manana.substr(0,5); //cadena.substr(inicio[, longitud])
      var faperturaManana = new Date(); faperturaManana = moment(mananaInicio, 'HH:mm');
      faperturaManana = new Date(faperturaManana);      
      
      var mananaFin = manana.substr(6,5);
      var fcierreManana = new Date(); fcierreManana = moment(mananaFin, 'HH:mm');      
      fcierreManana = new Date(fcierreManana);
      

      if (target.rangoTardeJueves.value){var tarde = target.rangoTardeJueves.value}; 

       var tardeInicio = tarde.substr(0,5); //cadena.substr(inicio[, longitud])
      var faperturaTarde = new Date(); faperturaTarde = moment(tardeInicio, 'HH:mm');
      faperturaTarde = new Date(faperturaTarde);
      
      var tardeFin = tarde.substr(6,5);
      var fcierreTarde = new Date(); fcierreTarde = moment(tardeFin, 'HH:mm');
      fcierreTarde = new Date(fcierreTarde);      

      if (target.trabajaMananaJueves.value){var atManana = target.trabajaMananaJueves.checked};            
      if (target.trabajaTardeJueves.value){var atTarde = target.trabajaTardeJueves.checked};            
      //var atManana = target.trabajaMananaJueves.value;
      //var atTarde = target.trabajaTarde.Jueves.value;
    
      var cons = this.consultorio; 
      console.log(this);

      Consultorios.update({_id:cons._id},{$set: {
        jueves : {
          atiendeManana: atManana,
          mananaInicio: faperturaManana,          
          mananaFin : fcierreManana,
          atiendeTarde: atTarde,
          tardeInicio: faperturaTarde,
          tardeFin: fcierreTarde,
        }        
      }});

      $('#modalCargarJueves').modal('hide'); //CIERRO LA VENTANA MODAL      
  },

  'click .modalCargarViernes': function(event, template){             
        $('#modalCargarViernes').modal('show');
    },
 'submit #formCargarViernes':function(event) {
     // Prevent default browser form submit
      event.preventDefault();

      // Get value from form element
      const target = event.target;       

      //----------------------------------------------------------------MAÑANA--------------------------------------------------------
      if (target.rangoMananaViernes.value){var manana = target.rangoMananaViernes.value};       
      
      var mananaInicio = manana.substr(0,5); //cadena.substr(inicio[, longitud])
      var faperturaManana = new Date(); faperturaManana = moment(mananaInicio, 'HH:mm');
      faperturaManana = new Date(faperturaManana);      
      
      var mananaFin = manana.substr(6,5);
      var fcierreManana = new Date(); fcierreManana = moment(mananaFin, 'HH:mm');      
      fcierreManana = new Date(fcierreManana);
      

      if (target.rangoTardeViernes.value){var tarde = target.rangoTardeViernes.value}; 

       var tardeInicio = tarde.substr(0,5); //cadena.substr(inicio[, longitud])
      var faperturaTarde = new Date(); faperturaTarde = moment(tardeInicio, 'HH:mm');
      faperturaTarde = new Date(faperturaTarde);
      
      var tardeFin = tarde.substr(6,5);
      var fcierreTarde = new Date(); fcierreTarde = moment(tardeFin, 'HH:mm');
      fcierreTarde = new Date(fcierreTarde);      

      if (target.trabajaMananaViernes.value){var atManana = target.trabajaMananaViernes.checked};            
      if (target.trabajaTardeViernes.value){var atTarde = target.trabajaTardeViernes.checked};            
      //var atManana = target.trabajaMananaViernes.value;
      //var atTarde = target.trabajaTarde.Viernes.value;
    
      var cons = this.consultorio; 
      console.log(this);

      Consultorios.update({_id:cons._id},{$set: {
        viernes : {
          atiendeManana: atManana,
          mananaInicio: faperturaManana,          
          mananaFin : fcierreManana,
          atiendeTarde: atTarde,
          tardeInicio: faperturaTarde,
          tardeFin: fcierreTarde,
        }        
      }});

      $('#modalCargarViernes').modal('hide'); //CIERRO LA VENTANA MODAL      
  },

  'click .modalCargarSabado': function(event, template){            
        $('#modalCargarSabado').modal('show');
    },
 'submit #formCargarSabado':function(event) {
     // Prevent default browser form submit
      event.preventDefault();

      // Get value from form element
      const target = event.target;       

      //----------------------------------------------------------------MAÑANA--------------------------------------------------------
      if (target.rangoMananaSabado.value){var manana = target.rangoMananaSabado.value};       
      
      var mananaInicio = manana.substr(0,5); //cadena.substr(inicio[, longitud])
      var faperturaManana = new Date(); faperturaManana = moment(mananaInicio, 'HH:mm');
      faperturaManana = new Date(faperturaManana);      
      
      var mananaFin = manana.substr(6,5);
      var fcierreManana = new Date(); fcierreManana = moment(mananaFin, 'HH:mm');      
      fcierreManana = new Date(fcierreManana);
      

      if (target.rangoTardeSabado.value){var tarde = target.rangoTardeSabado.value}; 

       var tardeInicio = tarde.substr(0,5); //cadena.substr(inicio[, longitud])
      var faperturaTarde = new Date(); faperturaTarde = moment(tardeInicio, 'HH:mm');
      faperturaTarde = new Date(faperturaTarde);
      
      var tardeFin = tarde.substr(6,5);
      var fcierreTarde = new Date(); fcierreTarde = moment(tardeFin, 'HH:mm');
      fcierreTarde = new Date(fcierreTarde);      

      if (target.trabajaMananaSabado.value){var atManana = target.trabajaMananaSabado.checked};            
      if (target.trabajaTardeSabado.value){var atTarde = target.trabajaTardeSabado.checked};            
      //var atManana = target.trabajaMananaSabado.value;
      //var atTarde = target.trabajaTarde.Sabado.value;
    
      var cons = this.consultorio; 
      console.log(this);

      Consultorios.update({_id:cons._id},{$set: {
        sabado : {
          atiendeManana: atManana,
          mananaInicio: faperturaManana,          
          mananaFin : fcierreManana,
          atiendeTarde: atTarde,
          tardeInicio: faperturaTarde,
          tardeFin: fcierreTarde,
        }        
      }});

      $('#modalCargarSabado').modal('hide'); //CIERRO LA VENTANA MODAL      
  },

  'click .modalCargarDomingo': function(event, template){             
        $('#modalCargarDomingo').modal('show');
    },
 'submit #formCargarDomingo':function(event) {
     // Prevent default browser form submit
      event.preventDefault();

      // Get value from form element
      const target = event.target;       

      //----------------------------------------------------------------MAÑANA--------------------------------------------------------
      if (target.rangoMananaDomingo.value){var manana = target.rangoMananaDomingo.value};       
      
      var mananaInicio = manana.substr(0,5); //cadena.substr(inicio[, longitud])
      var faperturaManana = new Date(); faperturaManana = moment(mananaInicio, 'HH:mm');
      faperturaManana = new Date(faperturaManana);      
      
      var mananaFin = manana.substr(6,5);
      var fcierreManana = new Date(); fcierreManana = moment(mananaFin, 'HH:mm');      
      fcierreManana = new Date(fcierreManana);
      

      if (target.rangoTardeDomingo.value){var tarde = target.rangoTardeDomingo.value}; 

       var tardeInicio = tarde.substr(0,5); //cadena.substr(inicio[, longitud])
      var faperturaTarde = new Date(); faperturaTarde = moment(tardeInicio, 'HH:mm');
      faperturaTarde = new Date(faperturaTarde);
      
      var tardeFin = tarde.substr(6,5);
      var fcierreTarde = new Date(); fcierreTarde = moment(tardeFin, 'HH:mm');
      fcierreTarde = new Date(fcierreTarde);      

      if (target.trabajaMananaDomingo.value){var atManana = target.trabajaMananaDomingo.checked};            
      if (target.trabajaTardeDomingo.value){var atTarde = target.trabajaTardeDomingo.checked};            
      //var atManana = target.trabajaMananaDomingo.value;
      //var atTarde = target.trabajaTarde.Domingo.value;
    
      var cons = this.consultorio; 
      console.log(this);

      Consultorios.update({_id:cons._id},{$set: {
        domingo : {
          atiendeManana: atManana,
          mananaInicio: faperturaManana,          
          mananaFin : fcierreManana,
          atiendeTarde: atTarde,
          tardeInicio: faperturaTarde,
          tardeFin: fcierreTarde,
        }        
      }});

      $('#modalCargarDomingo').modal('hide'); //CIERRO LA VENTANA MODAL      
  },


})

Template.horarios.onRendered(function() {
  $("#rangoMananaLunes").ionRangeSlider({
      type: "double", 
      grid: true,
      from: 16,   
      values: [
          "00:00", "00:30", "01:00", "01:30", "02:00", "02:30", "03:00", "03:30", "04:00", "04:30", "05:00", "05:30", "06:00", "06:30", "07:00", "07:30", "08:00", "08:30","09:00", "09:30", "10:00", "10:30", "11:00", "11:30","12:00"
      ]
  });

  $("#rangoTardeLunes").ionRangeSlider({
      type: "double", 
      grid: true,
      from: 8,   
      to: 13,
      values: [
          "12:00","12:30","13:00", "13:30", "14:00", "14:30","15:00", "15:30", "16:00", "17:00", "18:00", "19:00","20:00","21:00","21:30","22:00","22:30","23:00","23:30","00:00"
      ]
  });

  $("#rangoMananaMartes").ionRangeSlider({
      type: "double", 
      grid: true,
      from: 16,   
      values: [
          "00:00", "00:30", "01:00", "01:30", "02:00", "02:30", "03:00", "03:30", "04:00", "04:30", "05:00", "05:30", "06:00", "06:30", "07:00", "07:30", "08:00", "08:30","09:00", "09:30", "10:00", "10:30", "11:00", "11:30","12:00"
      ]
  });

  $("#rangoTardeMartes").ionRangeSlider({
      type: "double", 
      grid: true,
      from: 8,   
      to: 13,   
      values: [
          "12:00","12:30","13:00", "13:30", "14:00", "14:30","15:00", "15:30", "16:00", "17:00", "18:00", "19:00","20:00","21:00","21:30","22:00","22:30","23:00","23:30","00:00"
      ]
  });

  $("#rangoMananaMiercoles").ionRangeSlider({
      type: "double", 
      grid: true,
      from: 16,   
      values: [
          "00:00", "00:30", "01:00", "01:30", "02:00", "02:30", "03:00", "03:30", "04:00", "04:30", "05:00", "05:30", "06:00", "06:30", "07:00", "07:30", "08:00", "08:30","09:00", "09:30", "10:00", "10:30", "11:00", "11:30","12:00"
      ]
  });

  $("#rangoTardeMiercoles").ionRangeSlider({
      type: "double", 
      grid: true,
      from: 8,   
      to: 13,   
      values: [
          "12:00","12:30","13:00", "13:30", "14:00", "14:30","15:00", "15:30", "16:00", "17:00", "18:00", "19:00","20:00","21:00","21:30","22:00","22:30","23:00","23:30","00:00"
      ]
  });

  $("#rangoMananaJueves").ionRangeSlider({
      type: "double", 
      grid: true,
      from: 16,   
      values: [
          "00:00", "00:30", "01:00", "01:30", "02:00", "02:30", "03:00", "03:30", "04:00", "04:30", "05:00", "05:30", "06:00", "06:30", "07:00", "07:30", "08:00", "08:30","09:00", "09:30", "10:00", "10:30", "11:00", "11:30","12:00"
      ]
  });

  $("#rangoTardeJueves").ionRangeSlider({
      type: "double", 
      grid: true,
      from: 8,   
      to: 13,   
      values: [
          "12:00","12:30","13:00", "13:30", "14:00", "14:30","15:00", "15:30", "16:00", "17:00", "18:00", "19:00","20:00","21:00","21:30","22:00","22:30","23:00","23:30","00:00"
      ]
  });

  $("#rangoMananaViernes").ionRangeSlider({
      type: "double", 
      grid: true,
      from: 16,   
      values: [
          "00:00", "00:30", "01:00", "01:30", "02:00", "02:30", "03:00", "03:30", "04:00", "04:30", "05:00", "05:30", "06:00", "06:30", "07:00", "07:30", "08:00", "08:30","09:00", "09:30", "10:00", "10:30", "11:00", "11:30","12:00"
      ]
  });

  $("#rangoTardeViernes").ionRangeSlider({
      type: "double", 
      grid: true,
      from: 8,   
      to: 13,   
      values: [
          "12:00","12:30","13:00", "13:30", "14:00", "14:30","15:00", "15:30", "16:00", "17:00", "18:00", "19:00","20:00","21:00","21:30","22:00","22:30","23:00","23:30","00:00"
      ]
  });

  $("#rangoMananaSabado").ionRangeSlider({
      type: "double", 
      grid: true,
      from: 16,   
      values: [
          "00:00", "00:30", "01:00", "01:30", "02:00", "02:30", "03:00", "03:30", "04:00", "04:30", "05:00", "05:30", "06:00", "06:30", "07:00", "07:30", "08:00", "08:30","09:00", "09:30", "10:00", "10:30", "11:00", "11:30","12:00"
      ]
  });

  $("#rangoTardeSabado").ionRangeSlider({
      type: "double", 
      grid: true,
      from: 8,   
      to: 13,   
      values: [
          "12:00","12:30","13:00", "13:30", "14:00", "14:30","15:00", "15:30", "16:00", "17:00", "18:00", "19:00","20:00","21:00","21:30","22:00","22:30","23:00","23:30","00:00"
      ]
  });

  $("#rangoMananaDomingo").ionRangeSlider({
      type: "double", 
      grid: true,
      from: 16,   
      values: [
          "00:00", "00:30", "01:00", "01:30", "02:00", "02:30", "03:00", "03:30", "04:00", "04:30", "05:00", "05:30", "06:00", "06:30", "07:00", "07:30", "08:00", "08:30","09:00", "09:30", "10:00", "10:30", "11:00", "11:30","12:00"
      ]
  });

  $("#rangoTardeDomingo").ionRangeSlider({
      type: "double", 
      grid: true,
      from: 8,   
      to: 13,   
      values: [
          "12:00","12:30","13:00", "13:30", "14:00", "14:30","15:00", "15:30", "16:00", "17:00", "18:00", "19:00","20:00","21:00","21:30","22:00","22:30","23:00","23:30","00:00"
      ]
  });

});

