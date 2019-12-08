import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import { Profesionales } from '../../../lib/collections/profesionales';
import { Consultorios } from '../../../lib/collections/consultorios';
import { Pacientes } from '../../../lib/collections/pacientes';
import { Turnos } from '../../../lib/collections/turnos';
import { Router } from 'meteor/iron:router';
import SimpleSchema from 'simpl-schema';
import { check } from 'meteor/check';
import { ReactiveVar } from 'meteor/reactive-var'

Template.registerHelper('formatDate5', function(date) {
  
  if (date !== undefined){
    return moment(date).format("HH:mm");    
  } else {
    var fecha = new Date();
    fecha.setHours(0,0,0);
    return moment(fecha).format("HH:mm");
  }
  
});


Template.profesionalHorarios.events({
  
  'click .modalCargarLunes': function(event, template){             
        $('#modalCargarLunes').modal('show');
    },
  'submit #formCargarLunes':function(event) {

    // Prevent default browser form submit
      event.preventDefault();

      // Get value from form element
      const target = event.target;       

      //----------------------------------------------------------------MAÑANA--------------------------------------------------------
      var cons = this.consultorio;
      if (cons.lunes.atiendeManana){
        if (target.rangoMananaLunes.value){var manana = target.rangoMananaLunes.value};       
          var atManana = target.trabajaMananaLunes.checked;
          if (atManana){
            var mananaInicio = manana.substr(0,5); //cadena.substr(inicio[, longitud])
            var faperturaManana = new Date(); faperturaManana = moment(mananaInicio, 'HH:mm');
            faperturaManana = new Date(faperturaManana);      
            
            var mananaFin = manana.substr(6,5);
            var fcierreManana = new Date(); fcierreManana = moment(mananaFin, 'HH:mm');      
            fcierreManana = new Date(fcierreManana);
          }
      }
      else{
            var atManana = false;
      }

      if (cons.lunes.atiendeTarde){
        if (target.rangoTardeLunes.value){var tarde = target.rangoTardeLunes.value}; 
          var atTarde = target.trabajaTardeLunes.checked;
          if (atTarde){
            var tardeInicio = tarde.substr(0,5); //cadena.substr(inicio[, longitud])
            var faperturaTarde = new Date(); faperturaTarde = moment(tardeInicio, 'HH:mm');
            faperturaTarde = new Date(faperturaTarde);
            
            var tardeFin = tarde.substr(6,5);
            var fcierreTarde = new Date(); fcierreTarde = moment(tardeFin, 'HH:mm');
            fcierreTarde = new Date(fcierreTarde);
          }        
      }
      else{
        var atTarde = false;
      }      

    
      var prof = this.profesional;
      

      Profesionales.update({_id:prof._id},{$set: {
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
      var cons = this.consultorio;
      if (cons.martes.atiendeManana){
        if (target.rangoMananaMartes.value){var manana = target.rangoMananaMartes.value};       
          var atManana = target.trabajaMananaMartes.checked;
          if (atManana){
            var mananaInicio = manana.substr(0,5); //cadena.substr(inicio[, longitud])
            var faperturaManana = new Date(); faperturaManana = moment(mananaInicio, 'HH:mm');
            faperturaManana = new Date(faperturaManana);      
            
            var mananaFin = manana.substr(6,5);
            var fcierreManana = new Date(); fcierreManana = moment(mananaFin, 'HH:mm');      
            fcierreManana = new Date(fcierreManana);
          }
      }
      else{
            var atManana = false;
      }

      if (cons.martes.atiendeTarde){
        if (target.rangoTardeMartes.value){var tarde = target.rangoTardeMartes.value}; 
          var atTarde = target.trabajaTardeMartes.checked;
          if (atTarde){
            var tardeInicio = tarde.substr(0,5); //cadena.substr(inicio[, longitud])
            var faperturaTarde = new Date(); faperturaTarde = moment(tardeInicio, 'HH:mm');
            faperturaTarde = new Date(faperturaTarde);
            
            var tardeFin = tarde.substr(6,5);
            var fcierreTarde = new Date(); fcierreTarde = moment(tardeFin, 'HH:mm');
            fcierreTarde = new Date(fcierreTarde);
          }        
      }
      else{
        var atTarde = false;
      }      

    
      var prof = this.profesional;
      

      Profesionales.update({_id:prof._id},{$set: {
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
      var cons = this.consultorio;
      if (cons.miercoles.atiendeManana){
        if (target.rangoMananaMiercoles.value){var manana = target.rangoMananaMiercoles.value};       
          var atManana = target.trabajaMananaMiercoles.checked;
          if (atManana){
            var mananaInicio = manana.substr(0,5); //cadena.substr(inicio[, longitud])
            var faperturaManana = new Date(); faperturaManana = moment(mananaInicio, 'HH:mm');
            faperturaManana = new Date(faperturaManana);      
            
            var mananaFin = manana.substr(6,5);
            var fcierreManana = new Date(); fcierreManana = moment(mananaFin, 'HH:mm');      
            fcierreManana = new Date(fcierreManana);
          }
      }
      else{
            var atManana = false;
      }

      if (cons.miercoles.atiendeTarde){
        if (target.rangoTardeMiercoles.value){var tarde = target.rangoTardeMiercoles.value}; 
          var atTarde = target.trabajaTardeMiercoles.checked;
          if (atTarde){
            var tardeInicio = tarde.substr(0,5); //cadena.substr(inicio[, longitud])
            var faperturaTarde = new Date(); faperturaTarde = moment(tardeInicio, 'HH:mm');
            faperturaTarde = new Date(faperturaTarde);
            
            var tardeFin = tarde.substr(6,5);
            var fcierreTarde = new Date(); fcierreTarde = moment(tardeFin, 'HH:mm');
            fcierreTarde = new Date(fcierreTarde);
          }        
      }
      else{
        var atTarde = false;
      }      

    
      var prof = this.profesional;
      

      Profesionales.update({_id:prof._id},{$set: {
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
      var cons = this.consultorio;
      if (cons.jueves.atiendeManana){
        if (target.rangoMananaJueves.value){var manana = target.rangoMananaJueves.value};       
          var atManana = target.trabajaMananaJueves.checked;
          if (atManana){
            var mananaInicio = manana.substr(0,5); //cadena.substr(inicio[, longitud])
            var faperturaManana = new Date(); faperturaManana = moment(mananaInicio, 'HH:mm');
            faperturaManana = new Date(faperturaManana);      
            
            var mananaFin = manana.substr(6,5);
            var fcierreManana = new Date(); fcierreManana = moment(mananaFin, 'HH:mm');      
            fcierreManana = new Date(fcierreManana);
          }
      }
      else{
            var atManana = false;
      }

      if (cons.jueves.atiendeTarde){
        if (target.rangoTardeJueves.value){var tarde = target.rangoTardeJueves.value}; 
          var atTarde = target.trabajaTardeJueves.checked;
          if (atTarde){
            var tardeInicio = tarde.substr(0,5); //cadena.substr(inicio[, longitud])
            var faperturaTarde = new Date(); faperturaTarde = moment(tardeInicio, 'HH:mm');
            faperturaTarde = new Date(faperturaTarde);
            
            var tardeFin = tarde.substr(6,5);
            var fcierreTarde = new Date(); fcierreTarde = moment(tardeFin, 'HH:mm');
            fcierreTarde = new Date(fcierreTarde);
          }        
      }
      else{
        var atTarde = false;
      }      

    
      var prof = this.profesional;
      

      Profesionales.update({_id:prof._id},{$set: {
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
      var cons = this.consultorio;
      if (cons.viernes.atiendeManana){
        if (target.rangoMananaViernes.value){var manana = target.rangoMananaViernes.value};       
          var atManana = target.trabajaMananaViernes.checked;
          if (atManana){
            var mananaInicio = manana.substr(0,5); //cadena.substr(inicio[, longitud])
            var faperturaManana = new Date(); faperturaManana = moment(mananaInicio, 'HH:mm');
            faperturaManana = new Date(faperturaManana);      
            
            var mananaFin = manana.substr(6,5);
            var fcierreManana = new Date(); fcierreManana = moment(mananaFin, 'HH:mm');      
            fcierreManana = new Date(fcierreManana);
          }
      }
      else{
            var atManana = false;
      }

      if (cons.viernes.atiendeTarde){
        if (target.rangoTardeViernes.value){var tarde = target.rangoTardeViernes.value}; 
          var atTarde = target.trabajaTardeViernes.checked;
          if (atTarde){
            var tardeInicio = tarde.substr(0,5); //cadena.substr(inicio[, longitud])
            var faperturaTarde = new Date(); faperturaTarde = moment(tardeInicio, 'HH:mm');
            faperturaTarde = new Date(faperturaTarde);
            
            var tardeFin = tarde.substr(6,5);
            var fcierreTarde = new Date(); fcierreTarde = moment(tardeFin, 'HH:mm');
            fcierreTarde = new Date(fcierreTarde);
          }        
      }
      else{
        var atTarde = false;
      }      

    
      var prof = this.profesional;
      

      Profesionales.update({_id:prof._id},{$set: {
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
      var cons = this.consultorio;
      if (cons.sabado.atiendeManana){
        if (target.rangoMananaSabado.value){var manana = target.rangoMananaSabado.value};       
          var atManana = target.trabajaMananaSabado.checked;
          if (atManana){
            var mananaInicio = manana.substr(0,5); //cadena.substr(inicio[, longitud])
            var faperturaManana = new Date(); faperturaManana = moment(mananaInicio, 'HH:mm');
            faperturaManana = new Date(faperturaManana);      
            
            var mananaFin = manana.substr(6,5);
            var fcierreManana = new Date(); fcierreManana = moment(mananaFin, 'HH:mm');      
            fcierreManana = new Date(fcierreManana);
          }
      }
      else{
            var atManana = false;
      }

      if (cons.sabado.atiendeTarde){
        if (target.rangoTardeSabado.value){var tarde = target.rangoTardeSabado.value}; 
          var atTarde = target.trabajaTardeSabado.checked;
          if (atTarde){
            var tardeInicio = tarde.substr(0,5); //cadena.substr(inicio[, longitud])
            var faperturaTarde = new Date(); faperturaTarde = moment(tardeInicio, 'HH:mm');
            faperturaTarde = new Date(faperturaTarde);
            
            var tardeFin = tarde.substr(6,5);
            var fcierreTarde = new Date(); fcierreTarde = moment(tardeFin, 'HH:mm');
            fcierreTarde = new Date(fcierreTarde);
          }        
      }
      else{
        var atTarde = false;
      }      

    
      var prof = this.profesional;
      

      Profesionales.update({_id:prof._id},{$set: {
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
      var cons = this.consultorio;
      if (cons.domingo.atiendeManana){
        if (target.rangoMananaDomingo.value){var manana = target.rangoMananaDomingo.value};       
          var atManana = target.trabajaMananaDomingo.checked;
          if (atManana){
            var mananaInicio = manana.substr(0,5); //cadena.substr(inicio[, longitud])
            var faperturaManana = new Date(); faperturaManana = moment(mananaInicio, 'HH:mm');
            faperturaManana = new Date(faperturaManana);      
            
            var mananaFin = manana.substr(6,5);
            var fcierreManana = new Date(); fcierreManana = moment(mananaFin, 'HH:mm');      
            fcierreManana = new Date(fcierreManana);
          }
      }
      else{
            var atManana = false;
      }

      if (cons.domingo.atiendeTarde){
        if (target.rangoTardeDomingo.value){var tarde = target.rangoTardeDomingo.value}; 
          var atTarde = target.trabajaTardeDomingo.checked;
          if (atTarde){
            var tardeInicio = tarde.substr(0,5); //cadena.substr(inicio[, longitud])
            var faperturaTarde = new Date(); faperturaTarde = moment(tardeInicio, 'HH:mm');
            faperturaTarde = new Date(faperturaTarde);
            
            var tardeFin = tarde.substr(6,5);
            var fcierreTarde = new Date(); fcierreTarde = moment(tardeFin, 'HH:mm');
            fcierreTarde = new Date(fcierreTarde);
          }        
      }
      else{
        var atTarde = false;
      }      

    
      var prof = this.profesional;
      

      Profesionales.update({_id:prof._id},{$set: {
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


Template.profesionalHorarios.onRendered(function() {

  function generarRangos(inicio, fin) {    
    var cadena = [];    
    if (inicio > fin){ // fin = "00:00"
      var finAux = fin;
      finAux.setHours(23,30,00);
      for (i=inicio, f=finAux ; i <= f;){            
        cadena.push(moment(i).format('HH:mm')); // 16:13;
        i = moment(i).add(30, 'minutes');  // suma 30 minutos
      }
      cadena.push("00:00"); // 16:13;
    }
    else{
      for (i=inicio, f=fin ; i <= f;){            
        cadena.push(moment(i).format('HH:mm')); // 16:13;
        i = moment(i).add(30, 'minutes');  // suma 30 minutos
      }      
    }    
    return cadena;    
  }

  var nombreConsultorio = this.data.profesional.consultorio;
  var cons = Consultorios.findOne({nombre: nombreConsultorio}); 

  //-------------------------------------------------------LUNES---------------------------------------------------------------
  var valuesMananaLunes = generarRangos(cons.lunes.mananaInicio, cons.lunes.mananaFin);
  var valuesTardeLunes = generarRangos(cons.lunes.tardeInicio, cons.lunes.tardeFin);  


  $("#rangoMananaLunes").ionRangeSlider({
      type: "double", 
      grid: true,            
      values: valuesMananaLunes,
  });
  
  $("#rangoTardeLunes").ionRangeSlider({
      type: "double", 
      grid: true,
      values: valuesTardeLunes,
      
  }); 

  //-------------------------------------------------------MARTES---------------------------------------------------------------

  var valuesMananaMartes = generarRangos(cons.martes.mananaInicio, cons.martes.mananaFin);
  var valuesTardeMartes = generarRangos(cons.martes.tardeInicio, cons.martes.tardeFin);  


  $("#rangoMananaMartes").ionRangeSlider({
      type: "double", 
      grid: true,            
      values: valuesMananaMartes,
  });
  
  $("#rangoTardeMartes").ionRangeSlider({
      type: "double", 
      grid: true,
      values: valuesTardeMartes,
      
  });
  
  //-------------------------------------------------------MIERCOLES---------------------------------------------------------------
  var valuesMananaMiercoles = generarRangos(cons.miercoles.mananaInicio, cons.miercoles.mananaFin);
  var valuesTardeMiercoles = generarRangos(cons.miercoles.tardeInicio, cons.miercoles.tardeFin);  


  $("#rangoMananaMiercoles").ionRangeSlider({
      type: "double", 
      grid: true,            
      values: valuesMananaMiercoles,
  });
  
  $("#rangoTardeMiercoles").ionRangeSlider({
      type: "double", 
      grid: true,
      values: valuesTardeMiercoles,
      
  });

  //--------------------------------------------------JUEVES-----------------------------------------------------

  var valuesMananaJueves = generarRangos(cons.jueves.mananaInicio, cons.jueves.mananaFin);
  var valuesTardeJueves = generarRangos(cons.jueves.tardeInicio, cons.jueves.tardeFin);  


  $("#rangoMananaJueves").ionRangeSlider({
      type: "double", 
      grid: true,            
      values: valuesMananaJueves,
  });
  
  $("#rangoTardeJueves").ionRangeSlider({
      type: "double", 
      grid: true,
      values: valuesTardeJueves,
      
  });

  //--------------------------------------------------VIERNES-----------------------------------------------------

  var valuesMananaViernes = generarRangos(cons.viernes.mananaInicio, cons.viernes.mananaFin);
  var valuesTardeViernes = generarRangos(cons.viernes.tardeInicio, cons.viernes.tardeFin);  


  $("#rangoMananaViernes").ionRangeSlider({
      type: "double", 
      grid: true,            
      values: valuesMananaViernes,
  });
  
  $("#rangoTardeViernes").ionRangeSlider({
      type: "double", 
      grid: true,
      values: valuesTardeViernes,
      
  });
  
  //--------------------------------------------------SABADO-----------------------------------------------------

  var valuesMananaSabado = generarRangos(cons.sabado.mananaInicio, cons.sabado.mananaFin);
  var valuesTardeSabado = generarRangos(cons.sabado.tardeInicio, cons.sabado.tardeFin);  


  $("#rangoMananaSabado").ionRangeSlider({
      type: "double", 
      grid: true,            
      values: valuesMananaSabado,
  });
  
  $("#rangoTardeSabado").ionRangeSlider({
      type: "double", 
      grid: true,
      values: valuesTardeSabado,
      
  });

  //--------------------------------------------------DOMINGO-----------------------------------------------------

  var valuesMananaDomingo = generarRangos(cons.domingo.mananaInicio, cons.domingo.mananaFin);
  var valuesTardeDomingo = generarRangos(cons.domingo.tardeInicio, cons.domingo.tardeFin);  


  $("#rangoMananaDomingo").ionRangeSlider({
      type: "double", 
      grid: true,            
      values: valuesMananaDomingo,
  });
  
  $("#rangoTardeDomingo").ionRangeSlider({
      type: "double", 
      grid: true,
      values: valuesTardeDomingo,
      
  });

});


