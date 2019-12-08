import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import { Tratamientos } from '../../../lib/collections/tratamientos';
import { Profesionales } from '../../../lib/collections/profesionales';
import { Pacientes } from '../../../lib/collections/pacientes';
import { Turnos } from '../../../lib/collections/turnos';
import { Obras } from '../../../lib/collections/obras';
import { Usuarios } from '../../../lib/collections/usuarios';
import { Router } from 'meteor/iron:router';
import SimpleSchema from 'simpl-schema';
import { check } from 'meteor/check';
import { ReactiveVar } from 'meteor/reactive-var'


Template.misdatos.onCreated(function(){   
  this.selPedirDatos = new ReactiveVar(true);
  


});

Template.misdatos.helpers({
  
   formCollection() {
    return Pacientes;
  },

  formCollection() {
    return Obras;
  },

  formCollection() {
    return usersGoogle;
  },

  //FUNCION DE TYPEAHEAD PARA AUTOCOMPLETAR LA OBRA SOCIAL Y SELECCIONARLA
  selecObra: function(event, suggestion, datasetName) {
    Template.instance().selObra2.set(suggestion.id);  
    //suggestion.id=null;
  },

  obras1: function() {
    var ob = Obras.find();    
    return ob;
  },

  pedirDatos: function() {
    //TENGO QUE VERIFICAR SI EL USUARIO YA CARGO DATOS Y SETEAR UNA VARIABLE REACTIVA
    var idUsuario = Meteor.userId();   

    //BUSCO UN PACIENTE CON ESTE userId;
    var encontroDatos = Pacientes.findOne({idUser:idUsuario});
    console.log("DATOS ENCONTRADOS:", encontroDatos);

    if (encontroDatos){
      console.log("ENCONTRO DATOS");
      Template.instance().selPedirDatos.set(false);  
      
    }
    var resp = Template.instance().selPedirDatos.get();  
    console.log("PEDIR DATOS: ",resp);
    return resp;
  },

  /*obras1: function() {     
    return Obras.find().fetch().map(function(object){ return {id: object._id, value: object.nombre}; });    
  },*/
})


Template.misdatos.events({   

    'submit #formPaciente':function(event) {
      // Prevent default browser form submit
    event.preventDefault();

    // Get value from form element
    const target = event.target;  
    var ingresoNombre = null; 
    var ingresoDni = null;
    var ingresoObra = null;
    var ingresoCarnet = null;  
    var ingresoTelefono = null;
    var ingresoEmail = null;
    var ingresoFechaNacimiento = null;

    
    
    
    if (target.dni.value){ingresoDni = target.dni.value};


    if (target.nombreApellido.value){ingresoNombre = target.nombreApellido.value};
    
    if (target.telefono.value){ingresoTelefono = target.telefono.value};        

    if (target.carnet.value){ingresoCarnet = target.carnet.value};
    
    if (target.carnet.value){ingresoObra = target.obra.value};
    var obraSeleccionada = Obras.findOne({"_id":ingresoObra});//obtengo la Obra Social seleccionada (objeto)     
    if (obraSeleccionada){
      obraSeleccionada = obraSeleccionada.nombre; 
    }   
    console.log("OBRA SOCIAL INGRESADA", obraSeleccionada);

    var cons = this.consultorio;    

    var ingresoFechaIngreso = new Date();// tiene que ser seteada con el dia de hoy
    
    //RECUPERO EL EMAIL DEL USUARIO, DEPENDIENDO SI ES USUARIO DE FACEBOOK, GOOGLE, TWITER, ETC.
    var usuario = Meteor.userId();
    var user = Meteor.users.findOne(usuario);
    if (user.services)
    {
        if (user.services.facebook)
            ingresoEmail = user.services.facebook.email;
        if (user.services.twitter)
            ingresoEmail = user.services.twitter.email;
        if (user.services.google)
            ingresoEmail = user.services.google.email;
    };
    
    //SOLO SE PUEDE PEDIR UN TURNO HASTA SER ATENDIDO
    var pidioTurno = true;
    var vecesQueFalto = 0;

    if (target.fechaNacimiento.value){      
      ingresoFechaNacimiento = target.fechaNacimiento.value;    
      ingresoFechaNacimiento = moment(ingresoFechaNacimiento, "DD-MM-YYYY");
      ingresoFechaNacimiento = new Date(ingresoFechaNacimiento);//.toDateString("dd-MM-yyyy");      
    };

    //CREO UNA COMBINACION. ESTO ES PARA PODER BUSCAR CON TYPEHEAD DE MANERA DINAMICA. BUSCA POR NOMBRE O POR DNI
    var espacio = " "; 
    var combinacion = ingresoNombre.concat(espacio);
    combinacion = combinacion.concat(ingresoDni);

    //PRIMERO TENGO QUE VER QUE EL DNI DEL USUARIO NO ESTE INGRESADO EN LA BASE DE DATOS    
    //SI EL DNI DE USUARIO NO EXISTE
    Pacientes.insert({
      idUser:usuario,
      nombreApellido:ingresoNombre, 
      dni:ingresoDni, 
      telefono:ingresoTelefono,          
      nombreDni:combinacion,
      obra:obraSeleccionada,
      carnet:ingresoCarnet,
      fechaNacimiento:ingresoFechaNacimiento,          
      email:ingresoEmail,      
      fechaIngreso:ingresoFechaIngreso,
      consultorio:cons, 
      pidioTurno:pidioTurno,
      vecesQueFalto:vecesQueFalto,    
    });
    
      
    Router.go('/pacientes');
  }
  


});


Template.misdatos.onRendered(function() {
  //$('.fechaNacimiento').mask('dd/mm/aaaa');
  $("#fechaNacimiento").inputmask("d-m-y");
  $("#telefono").inputmask("(9999)999999999");
  $("#dni").inputmask("99.999.999");

  

  Meteor.typeahead.inject();
});