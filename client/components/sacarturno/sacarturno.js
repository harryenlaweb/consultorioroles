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

Template.sacarturno.onCreated(function(){   
  this.selProfesionales = new ReactiveVar(null);
  this.selTratamiento = new ReactiveVar(null); 
  this.selTratamientos = new ReactiveVar([]);
  this.selPaciente = new ReactiveVar(null);
  this.selObra = new ReactiveVar(null);
  this.selPacienteBuscar = new ReactiveVar(null);
  this.selMostrarInfoTurno = new ReactiveVar(false);
  this.selTurnoLibre = new ReactiveVar(null);   
  this.selDia = new ReactiveVar(null);
  this.selDuracion = new ReactiveVar(0);
  this.selImporte = new ReactiveVar(0);  
  this.selModalInfoPaciente = new ReactiveVar();
  this.selModalInfoTratamientos = new ReactiveVar([]);
  this.selModalInfoTurno = new ReactiveVar(null);
  this.selTurnoEliminar = new ReactiveVar(null);
  this.selMyMenuItems = new ReactiveVar([]);  
  this.selActualizarVista = new ReactiveVar(true);


});

//OBTIENE LOS MINUTOS ENTRE DOS FECHAS TIPO DATE
function diferenciaMinutos( startTime, endTime ){
  var difference = endTime.getTime() - startTime.getTime(); // This will give difference in milliseconds
  var resultInMinutes = Math.round(difference / 60000);  
  return Number(resultInMinutes);
}

Template.registerHelper('formatDate1', function(date) {
  return moment(date).format("HH:mm");
});

Template.registerHelper('diaSemana', function() {
    var date = Template.instance().selDia.get();
    var dow = date.getDay();
    if (dow == 1) { return 'lunes'}
    if (dow == 2) { return 'martes'}
    if (dow == 3) { return 'miercoles'}
    if (dow == 4) { return 'jueves'}
    if (dow == 5) { return 'viernes'}
    if (dow == 6) { return 'sabado'}
    if (dow == 0) { return 'domingo'}

});

Template.registerHelper('formatDate2', function(date) {
  return moment(date).format('DD-MM-YYYY');
});

Template.registerHelper('formatDate3', function(date) {
  return moment(date).format('DD-MM-YYYY HH:mm');
});

Template.registerHelper('compare', function(v1, v2) {
  if (typeof v1 === 'object' && typeof v2 === 'object') {
    return _.isEqual(v1, v2); // do a object comparison
  } else {
    return v1 === v2;
  }
});

Template.registerHelper('diferenteFecha', function(f1, f2) {
  var hf1 = f1.getHours();
  var mf1 = f1.getMinutes();
  var aux_f1 = new Date(); aux_f1.setHours(hf1,mf1,0);
  var hf2 = f2.getHours();
  var mf2 = f2.getMinutes();
  var aux_f2 = new Date(); aux_f2.setHours(hf2,mf2,0);
  var resultado = !(moment(aux_f1).isSame(aux_f2));
  console.log('son fechas diferentes?:',resultado);
  return resultado;
});

Template.registerHelper('horarioCorrido', function() {

  var resultado = false;
  console.log("--------------------------------ENTRO A COMPARAR LINEA 90----------------------------------")

  var profesionalId = Template.instance().selProfesionales.get();
    if (profesionalId !== null){
      //RECUPERO EL PROFESIONAL DEL TRATAMIENTO A INSERTAR
      let profesional = Profesionales.findOne({"_id":profesionalId});   
      var diaSeleccionado = Template.instance().selDia.get();

      var dow = diaSeleccionado.getDay();
      if (dow == 1) { var profMananaInicio = profesional.lunes.mananaInicio; var profMananaFin = profesional.lunes.mananaFin;
      /*lunes*/       var profTardeInicio = profesional.lunes.tardeInicio; var profTardeFin = profesional.lunes.tardeFin;
                      profAtiendeManana = profesional.lunes.atiendeManana; profAtiendeTarde = profesional.lunes.atiendeTarde}
      if (dow == 2) { var profMananaInicio = profesional.martes.mananaInicio; var profMananaFin = profesional.martes.mananaFin;
                      var profTardeInicio = profesional.martes.tardeInicio; var profTardeFin = profesional.martes.tardeFin;
                      profAtiendeManana = profesional.martes.atiendeManana; profAtiendeTarde = profesional.martes.atiendeTarde}
      if (dow == 3) { var profMananaInicio = profesional.miercoles.mananaInicio; var profMananaFin = profesional.miercoles.mananaFin;
                      var profTardeInicio = profesional.miercoles.tardeInicio; var profTardeFin = profesional.miercoles.tardeFin;
                      profAtiendeManana = profesional.miercoles.atiendeManana; profAtiendeTarde = profesional.miercoles.atiendeTarde}
      if (dow == 4) { var profMananaInicio = profesional.jueves.mananaInicio; var profMananaFin = profesional.jueves.mananaFin; 
                      var profTardeInicio = profesional.jueves.tardeInicio; var profTardeFin = profesional.jueves.tardeFin;
                      profAtiendeManana = profesional.jueves.atiendeManana; profAtiendeTarde = profesional.jueves.atiendeTarde}
      if (dow == 5) { var profMananaInicio = profesional.viernes.mananaInicio; var profMananaFin = profesional.viernes.mananaFin;
                      var profTardeInicio = profesional.viernes.tardeInicio; var profTardeFin = profesional.viernes.tardeFin;
                      profAtiendeManana = profesional.viernes.atiendeManana; profAtiendeTarde = profesional.viernes.atiendeTarde}
      if (dow == 6) { var profMananaInicio = profesional.sabado.mananaInicio; var profMananaFin = profesional.sabado.mananaFin; 
                      var profTardeInicio = profesional.sabado.tardeInicio; var profTardeFin = profesional.sabado.tardeFin;
                      profAtiendeManana = profesional.sabado.atiendeManana; profAtiendeTarde = profesional.sabado.atiendeTarde}
      if (dow == 0) { var profMananaInicio = profesional.domingo.mananaInicio; var profMananaFin = profesional.domingo.mananaFin; 
                      var profTardeInicio = profesional.domingo.tardeInicio; var profTardeFin = profesional.domingo.tardeFin;
                      profAtiendeManana = profesional.domingo.atiendeManana; profAtiendeTarde = profesional.domingo.atiendeTarde}

  

      if (profAtiendeManana && profAtiendeTarde){ //SI ATIENDE DE MAÑANA Y DE TARDE HAY QUE VER QUE SI EL HORARIO DE FIN DE MAÑANA COINCIDE CON EL INICIO DE TARDE
        
        var hf1 = profMananaFin.getHours();
        var mf1 = profMananaFin.getMinutes();
        var aux_f1 = new Date(); aux_f1.setHours(hf1,mf1,0);
        var hf2 = profTardeInicio.getHours();
        var mf2 = profTardeInicio.getMinutes();
        var aux_f2 = new Date(); aux_f2.setHours(hf2,mf2,0);
        resultado = (moment(aux_f1).isSame(aux_f2));    
      }
    }   
    
  
  return resultado;
       
  
});


Template.registerHelper('eligioProfesional', function() {
  var profesionalesId = Template.instance().selProfesionales.get();
  var resultado = false;
  if (profesionalesId === null) {resultado = false} else {resultado = true}
  console.log('ELIGIO PROFESIONAL:', resultado);
  return resultado;
});

Template.registerHelper('iguales', function(string_a, string_b) {
  var resultado = string_a.localeCompare(string_b);
  if (resultado === 0){
    return true;
  }
  else{
    return false;
  }
});


var arr = [];

var arr2 = [];




Template.sacarturno.helpers({  
  formCollection() {
    return Profesionales;
  },
  formCollection() {
    return Pacientes;
  },
  formCollection() {
    return Turnos;
  },

  searchAttributes() {
    return {
      placeholder: 'Buscar ...',
    };
  },

//-------------------INFORMACION PARA LA VENTANA MODAL DE LOS TURNOS ------------------------------
  
  'ModalInfoPaciente': function(){
    return Template.instance().selModalInfoPaciente.get();
  },  

  'ModalInfoTurno': function(){
    return Template.instance().selModalInfoTurno.get();
  },

  'ModalInfoTratamientos': function(){
    return Template.instance().selModalInfoTratamientos.get();
  },

  'ActualizarVista': function(){
    var recuperar = Template.instance().selActualizarVista.get();    
    return recuperar;
    
  },

//--------------------------------------------------------------------------------------------------   
  'myMenuItems': function selectedItems() {   
   
    //return Template.instance().selMyMenuItems.get();
     var profesionalId = Template.instance().selProfesionales.get();  
    var cursor = Profesionales.findOne({_id:profesionalId},{'mistratamientos': 1});      
    arr = [];
    
   // var cursor = Profesionales.findOne({nombreApellido:"DEPILACION MEDICA DEFINITIVA CON LASER"},{'mistratamientos': 1});    

    let arreglo = cursor.mistratamientos;
    let arrayLength = arreglo.length;
    for (var i = 0; i < arrayLength; i++) {
        var elemento = arreglo[i];
        let obj = {};
        obj.value = elemento._id;
        if (elemento.duracion !== undefined){
          obj.caption = (elemento.nombre).concat(" / ").concat(elemento.duracion).concat(" min");
        }
        else{
          obj.caption = elemento.nombre;
        }        
        obj.selected = false;
        arr[i] = obj;        
    };

    Template.instance().selMyMenuItems.set(arr);
    
    return arr;
  },

  'mySelectedList': function selectedList() {
    let retVal = arr.filter(function aFilter(elem) {return elem.selected;})
    .map(function aMap(elem) {return elem.value;});
    return retVal ? retVal : [];
  },
  'myConfigOptions': function configOptions() {
    //CON ESTO PUEDO LLAMAR A Template.instance() DENTRO DE LA FUNCION onChange()
    Template.instance().selDuracion.set(0);
    Template.instance().selImporte.set(0);
    const instance = Template.instance();
    return {

      'nonSelectedText': 'Seleccione tratamientos',
      //'buttonClass': 'btn btn-primary',
      'numberDisplayed': 1,
      //'includeSelectAllOption':true,
      'onChange': function onChange(option, checked) {
        let index = $(option).val();
        let tra = Tratamientos.findOne({_id:index});
        let dur = instance.selDuracion.get();
        let imp = instance.selImporte.get();

        var arreglo = instance.selTratamientos.get();

        if (tra.duracion !== undefined){
          if (checked === true){
            tra_dura = Number(tra.duracion);
            tra_imp = Number(tra.importe);
            
            let trat= { _id: tra._id,
                        nombre:tra.nombre,
                        duracion:tra_dura,
                        importe:tra_imp };

            var encontro = false;
            var indice = 0;
            for(var i =0, len = arreglo.length; i < len; i++){
                var item = arreglo[i];
                if (item._id === trat._id){
                  encontro = true;
                  indice = i;
                }
            }
            if (!encontro){
               arreglo.push(trat);
            }
            else{
              console.log("YA INSERTO ESTE TRATAMIENTO");
            }            

            dur = Number(dur);
            imp = Number(imp);
            dur = dur + tra_dura;
            imp = imp + tra_imp;
            instance.selDuracion.set(dur);
            instance.selImporte.set(imp);
          }
          else{
            tra_dura = Number(tra.duracion);
            tra_imp = Number(tra.importe);

            let trat= { _id: tra._id,
                        nombre:tra.nombre,
                        duracion:tra_dura,
                        importe:tra_imp };

            var encontro = false;
            var indice = 0;
            for(var i =0, len = arreglo.length; i < len; i++){
                var item = arreglo[i];
                if (item._id === trat._id){
                  encontro = true;
                  indice = i;
                }
            }
            if (encontro){
              arreglo.splice(indice, 1);
            }
            else{
              console.log("NO SE ELIMINO NADA YA INSERTO ESTE TRATAMIENTO");
            }               
            
            dur = Number(dur);
            imp = Number(imp);
            dur = dur - tra_dura;
            imp = imp - tra_imp;
            instance.selDuracion.set(dur);
            instance.selImporte.set(imp);
          }
          
        }        
        arr.indexOf(index).selected = checked;
      }

    };
  },


  //-------------------------------------------------------------------------------------


  rangoSelect: function() {     
    //-----------------------RECUPERO EL PROFESIONAL SELECCIONADO-----------------------------
    var profesionalId = Template.instance().selProfesionales.get();
    if (profesionalId === null) {                
      //$('#modalNoIngresoProfesional').modal('show');        
    }
    else{
      //RECUPERO EL PROFESIONAL DEL TRATAMIENTO A INSERTAR
      let profesional = Profesionales.findOne({"_id":profesionalId});      

      var profAtiendeManana = false;
      var profAtiendeTarde = false;          

      var date = Template.instance().selDia.get();
      var dow = date.getDay();
      if (dow == 1) { var profMananaInicio = profesional.lunes.mananaInicio; var profMananaFin = profesional.lunes.mananaFin; 
                      var profTardeInicio = profesional.lunes.tardeInicio; var profTardeFin = profesional.lunes.tardeFin;
                      profAtiendeManana = profesional.lunes.atiendeManana; profAtiendeTarde = profesional.lunes.atiendeTarde}
      if (dow == 2) { var profMananaInicio = profesional.martes.mananaInicio; var profMananaFin = profesional.martes.mananaFin; 
                      var profTardeInicio = profesional.martes.tardeInicio; var profTardeFin = profesional.martes.tardeFin;
                      profAtiendeManana = profesional.martes.atiendeManana; profAtiendeTarde = profesional.martes.atiendeTarde}
      if (dow == 3) { var profMananaInicio = profesional.miercoles.mananaInicio; var profMananaFin = profesional.miercoles.mananaFin; 
                      var profTardeInicio = profesional.miercoles.tardeInicio; var profTardeFin = profesional.miercoles.tardeFin;
                      profAtiendeManana = profesional.miercoles.atiendeManana; profAtiendeTarde = profesional.miercoles.atiendeTarde}
      if (dow == 4) { var profMananaInicio = profesional.jueves.mananaInicio; var profMananaFin = profesional.jueves.mananaFin; 
                      var profTardeInicio = profesional.jueves.tardeInicio; var profTardeFin = profesional.jueves.tardeFin;
                      profAtiendeManana = profesional.jueves.atiendeManana; profAtiendeTarde = profesional.jueves.atiendeTarde}
      if (dow == 5) { var profMananaInicio = profesional.viernes.mananaInicio; var profMananaFin = profesional.viernes.mananaFin; 
                      var profTardeInicio = profesional.viernes.tardeInicio; var profTardeFin = profesional.viernes.tardeFin;
                      profAtiendeManana = profesional.viernes.atiendeManana; profAtiendeTarde = profesional.viernes.atiendeTarde}
      if (dow == 6) { var profMananaInicio = profesional.sabado.mananaInicio; var profMananaFin = profesional.sabado.mananaFin; 
                      var profTardeInicio = profesional.sabado.tardeInicio; var profTardeFin = profesional.sabado.tardeFin;
                      profAtiendeManana = profesional.sabado.atiendeManana; profAtiendeTarde = profesional.sabado.atiendeTarde}
      if (dow == 0) { var profMananaInicio = profesional.domingo.mananaInicio; var profMananaFin = profesional.domingo.mananaFin; 
                      var profTardeInicio = profesional.domingo.tardeInicio; var profTardeFin = profesional.domingo.tardeFin;
                      profAtiendeManana = profesional.domingo.atiendeManana; profAtiendeTarde = profesional.domingo.atiendeTarde}

      var inicio = 0, fin = 0;
      if (profAtiendeManana){
        inicio = profMananaInicio.getHours();
        if (profAtiendeTarde){
          fin = profTardeFin.getHours();
        }
      }
      else{
        if (profAtiendeTarde){
          inicio = profTardeInicio.getHours(); 
          fin = profTardeFin.getHours();
        }
        else{
          return "";
        }      
      }

      var cadena = '';    
      for (i=inicio, f=fin ; i <= f; i++){        
        cadena = cadena.concat('<option>' + i + '</option>');         
      }     

      return Spacebars.SafeString(cadena);  
    }
             
  },

  duracion1: function() {     
    return Template.instance().selDuracion.get();        
  },

  importe1: function() {     
    return Template.instance().selImporte.get();        
  },

  turnoEliminar: function() {     
    return Template.instance().selTurnoEliminar.get();        
  },

  //FUNCION DE TYPEAHEAD PARA AUTOCOMPLETAR EL PACIENTE Y SELECCIONARLO
  selecPaciente: function(event, suggestion, datasetName) {
    Template.instance().selPaciente.set(suggestion.id);  
    //suggestion.id=null;
  },  

  pacientes1: function() {     
    return Pacientes.find().fetch().map(function(object){ return {id: object._id, value: object.nombreDni}; });    
  },

  //FUNCION DE TYPEAHEAD PARA AUTOCOMPLETAR LA OBRA SOCIAL Y SELECCIONARLA
  selecObra: function(event, suggestion, datasetName) {
    Template.instance().selObra.set(suggestion.id);  
    //suggestion.id=null;
  },

  obras1: function() {     
    return Obras.find().fetch().map(function(object){ return {id: object._id, value: object.nombre}; });    
  },

  //--------------------------INFO VENTANA EMERGENTE PARA BUSCAR TURNOS DEL PACIENTE ------------------------------------

  //FUNCION DE TYPEAHEAD PARA AUTOCOMPLETAR EL PACIENTE Y SELECCIONARLO
  selecPacienteBuscar: function(event, suggestion, datasetName) {
    Template.instance().selPacienteBuscar.set(suggestion.id);  
    Template.instance().selMostrarInfoTurno.set(true);  
    //suggestion.id=null;
  },

  pacientesBuscar: function() {     
    return Pacientes.find().fetch().map(function(object){ return {id: object._id, value: object.nombreDni}; });    
  },

  turnosBuscar: function() {    
    //recupero el paciente seleccionado
    var pacienteId = Template.instance().selPacienteBuscar.get();
    var mostrar = Template.instance().selMostrarInfoTurno.get();

    if (mostrar){
      if (pacienteId) {
      var tur = Turnos.find({"paciente._id":pacienteId},{sort: {inicio: 1}});
      return tur; 
      } 
    }
    else{      
      return null;
    }
    
           
  },

  //recupero los tratamientos del profesional seleccionado
  tratamientos1: function() {
    var profesionalId = Template.instance().selProfesionales.get();     
    var cursor = Profesionales.findOne({_id:profesionalId},{'mistratamientos': 1});      
    var campo = cursor.mistratamientos;   
    return campo;
  },

  profesionales1: function() {
    var prof = Profesionales.find();
    console.log("-----------------LOS DATOS DE LOS PROFESIONALES SON:",prof);
    return prof;
  },

  //RECUPERO EL TRATAMIENTO SELECCIONADO PARA PODER INSERTAR EL TURNO
  tratamiento1: function() {    
    var tratamientoId = Template.instance().selTratamiento.get();
    var tra = Tratamientos.findOne({"_id":tratamientoId});
    Template.instance().selDuracion.set(tra.duracion);
    return tra;
  },

  dia: function() {    
    var diaSel = Template.instance().selDia.get();
    return diaSel;
  },
  profesional1: function() {    
    var profesionalesId = Template.instance().selProfesionales.get();
    var pro = Profesionales.findOne({"_id":profesionalesId});
    console.log("ESTOS SON LOS PROFESIONALES QUE RECUPERA:",pro);
    return pro;
  },
  
  turnos: function() {    
    //recupero el profesional seleccionado
    var profesionalId = Template.instance().selProfesionales.get();
    //recupero el dia seleccionado
    var diaSeleccionado = Template.instance().selDia.get(); 
    
    
    //CONVIERTO LAS FECHAS A FORMATO ISO   
    var iso1 = new Date(diaSeleccionado);
    var iso2 = new Date(diaSeleccionado);
    var diaiso2 = iso2.getDate()+1; //le sumo un dia a la fecha para buscar en dos rangos de fechas HOY<X<MAÑANA
    iso2.setDate(diaiso2);
    

    if (profesionalId) {
      var tur = Turnos.find({"profesional._id":profesionalId,"inicio" : {"$gte" : iso1, "$lt" : iso2}},{sort: {inicio: 1}});
      return tur; 
    }    
  },  

});


Template.sacarturno.events({

  'click .infos': function(){
      Session.set("infosClicked", true);
   },
  //----------------SELECT PROFESIONAL ---------------------
  'change #profesionales1': function(event, instance) {
    var profesionalesId = $(event.target).val();    
    instance.selProfesionales.set(profesionalesId);
    instance.selTratamiento.set(null);
    var arr = [];
    instance.selTratamientos.set(arr);
    instance.selMyMenuItems.set([]);
    instance.selDuracion.set(0);
    instance.selImporte.set(0);
    var recuperar = instance.selActualizarVista.get(); 
    if (recuperar){
      instance.selActualizarVista.set(false);
    } else{
      instance.selActualizarVista.set(true);
    }


  },


  //----------------SELECT TRATAMIENTO----------------------
  'change #tratamiento1': function(event, instance) {
    var eleccion = $(event.target).val();
    instance.selTratamiento.set(eleccion);
    
    //RECUPERO LOS TURNOS DEL PROFESIONAL
    var profesionalesId = Template.instance().selProfesionales.get();
    
    var turnos = Turnos.findOne({"profesional._id":profesionalesId});   
  },  

  //----------------SELECT DIA DEL CALENDARIO -------------------
  'dp.change #datetimepicker2': function(event, instance) {    
    var eleccion = event.date._d;    
    instance.selDia.set(eleccion);     
  },

  //************************************** FORMULARIO MODAL PARA CREAR UN PACIENTE **********************************
  'submit #formPaciente':function(event) {
      // Prevent default browser form submit
      event.preventDefault();

      // Get value from form element
      const target = event.target;
      var ingresoNombre = target.nombreApellido.value;      
      var ingresoDni = target.dni.value;
      var ingresoTelefono = target.telefono.value; 
      var ingresoCarnet = target.carnet.value; 
      var ingresoObra = Template.instance().selObra.get();      

      var espacio = " "; 
      var combinacion = ingresoNombre.concat(espacio);
      combinacion = combinacion.concat(ingresoDni);

      var obraSeleccionada = Obras.findOne({"_id":ingresoObra});//obtengo la Obra Social seleccionada (objeto)     
      if (obraSeleccionada){
        obraSeleccionada = obraSeleccionada.nombre; 
      } 
      
      //recupero los datos a insertar
      /*let ob= [{ _id: obraSeleccionada._id,
                nombre:obraSeleccionada.nombre,
                telefono:obraSeleccionada.telefono,
                direccion: obraSeleccionada.direccion,
                localidad:obraSeleccionada.localidad,
                provincia:obraSeleccionada.provincia,
                descripcion:obraSeleccionada.descripcion,
                carnet:ingresoCarnet,
                cuil:obraSeleccionada.cuil,
                owner:obraSeleccionada.owner,
      }];       */

      Pacientes.insert({nombreApellido:ingresoNombre, dni:ingresoDni, nombreDni:combinacion, telefono:ingresoTelefono, obra:obraSeleccionada,
          carnet:ingresoCarnet,});

      $('#modalIngresoPaciente').modal('hide'); //CIERRO LA VENTANA MODAL
  },

  //*******************************MUESTRO LOS DATOS DEL PACIENTE DEL TURNO********************************
  'click #modalInfoPaciente': function(event, template){       
      var turnoId = this._id;
      var turno = Turnos.findOne({"_id":turnoId});            
      Template.instance().selModalInfoPaciente.set(turno.paciente);  
      $('#modalInfoPaciente').modal('show');
    },  

  //*******************************MUESTRO LOS DATOS DE LOS TRATAMIENTOS DEL TURNO********************************
  'click #modalInfoTratamientos': function(event, template){       
      var turnoId = this._id;
      var turno = Turnos.findOne({"_id":turnoId});       
      Template.instance().selModalInfoTurno.set(turno);      
      Template.instance().selModalInfoTratamientos.set(turno.tratamientos);      
      $('#modalInfoTratamientos').modal('show');
    },  

  //***********************************ELIMINO UN TURNO*****************************************

  'click .modalRemoveTurno': function(event, template){
    var turnoId = this._id;
    var turno = Turnos.findOne({"_id":turnoId});
    Template.instance().selTurnoEliminar.set(turno);
    $('#modalEliminarTurno').modal('show');
  },

  'click .asistioTurno': function(event, template){
    var turnoId = this._id;
    var turno = Turnos.findOne({"_id":turnoId});
    Turnos.update({_id: turno._id},{$set: {estado :  "ASISTIO"}});    
  },

  'click .faltoTurno': function(event, template){
    var turnoId = this._id;
    var turno = Turnos.findOne({"_id":turnoId});
    Turnos.update({_id: turno._id},{$set: {estado :  "FALTO"}});    
  },

  'click .ocupadoTurno': function(event, template){
    var turnoId = this._id;
    var turno = Turnos.findOne({"_id":turnoId});
    Turnos.update({_id: turno._id},{$set: {estado :  "OCUPADO"}});    
  },

  'click .confirmadoTurno': function(event, template){
    var turnoId = this._id;
    var turno = Turnos.findOne({"_id":turnoId});
    Turnos.update({_id: turno._id},{$set: {estado :  "CONFIRMADO"}});    
  },
  'click .atendidoTurno': function(event, template){
    var turnoId = this._id;
    var turno = Turnos.findOne({"_id":turnoId});
    Turnos.update({_id: turno._id},{$set: {estado :  "ATENDIDO"}});    
  }, 
  'click .atendidoSobreTurno': function(event, template){
    var turnoId = this._id;
    var turno = Turnos.findOne({"_id":turnoId});
    Turnos.update({_id: turno._id},{$set: {estado :  "SOBRETURNO ATENDIDO"}});    
  },  
  
  'click .faltoSobreTurno': function(event, template){
    var turnoId = this._id;
    var turno = Turnos.findOne({"_id":turnoId});
    Turnos.update({_id: turno._id},{$set: {estado :  "SOBRETURNO FALTO"}});    
  },

   'click .borrarInfoBuscar': function(event, template){
    Template.instance().selMostrarInfoTurno.set(false);     
  },

  'click ._remove': function(event, template){ 

    var turno = Template.instance().selTurnoEliminar.get();   
    //ASISTIO, FALTO, OCUPADO, CONFIRMADO, ATENDIDO, SOBRETURNO, SOBRETURNO ATENDIDO, SOBRETURNO FALTO
    var esSobreturno = false;
    if ((turno.estado === "SOBRETURNO") || (turno.estado === "SOBRETURNO ATENDIDO") || (turno.estado === "SOBRETURNO FALTO")) {
      esSobreturno = true;
    }
       

    if (esSobreturno){
      console.log("---------------------------------------------------ELIMINO EL SOBRETURNO---------------------------------------------------")
      Turnos.remove({"_id": turno._id});
    }
    else{      
      

      //-----------------------RECUPERO EL PROFESIONAL SELECCIONADO-----------------------------
      var profesionalId = turno.profesional._id;        

      //RECUPERO EL PROFESIONAL DEL TRATAMIENTO A INSERTAR
      let profesional = Profesionales.findOne({"_id":profesionalId});      

      var profAtiendeManana = false;
      var profAtiendeTarde = false;          

      
      //SELECCIONO EL DIA DE LA SEMANA
      var date = Template.instance().selDia.get();
      var dow = date.getDay();
      //-----LUNES-------------------------------
      if (dow == 1) { var profMananaInicio = profesional.lunes.mananaInicio; var profMananaFin = profesional.lunes.mananaFin; 
                      var profTardeInicio = profesional.lunes.tardeInicio; var profTardeFin = profesional.lunes.tardeFin;
                      profAtiendeManana = profesional.lunes.atiendeManana; profAtiendeTarde = profesional.lunes.atiendeTarde}
      //-----MARTES-------------------------------
      if (dow == 2) { var profMananaInicio = profesional.martes.mananaInicio; var profMananaFin = profesional.martes.mananaFin; 
                      var profTardeInicio = profesional.martes.tardeInicio; var profTardeFin = profesional.martes.tardeFin;
                      profAtiendeManana = profesional.martes.atiendeManana; profAtiendeTarde = profesional.martes.atiendeTarde}
      //-----MIERCOLES-------------------------------
      if (dow == 3) { var profMananaInicio = profesional.miercoles.mananaInicio; var profMananaFin = profesional.miercoles.mananaFin; 
                      var profTardeInicio = profesional.miercoles.tardeInicio; var profTardeFin = profesional.miercoles.tardeFin;
                      profAtiendeManana = profesional.miercoles.atiendeManana; profAtiendeTarde = profesional.miercoles.atiendeTarde}
      //-----JUEVES-------------------------------
      if (dow == 4) { var profMananaInicio = profesional.jueves.mananaInicio; var profMananaFin = profesional.jueves.mananaFin; 
                      var profTardeInicio = profesional.jueves.tardeInicio; var profTardeFin = profesional.jueves.tardeFin;
                      profAtiendeManana = profesional.jueves.atiendeManana; profAtiendeTarde = profesional.jueves.atiendeTarde}
      //-----VIERNES-------------------------------
      if (dow == 5) { var profMananaInicio = profesional.viernes.mananaInicio; var profMananaFin = profesional.viernes.mananaFin; 
                      var profTardeInicio = profesional.viernes.tardeInicio; var profTardeFin = profesional.viernes.tardeFin;
                      profAtiendeManana = profesional.viernes.atiendeManana; profAtiendeTarde = profesional.viernes.atiendeTarde}
      //-----SABADO-------------------------------
      if (dow == 6) { var profMananaInicio = profesional.sabado.mananaInicio; var profMananaFin = profesional.sabado.mananaFin; 
                      var profTardeInicio = profesional.sabado.tardeInicio; var profTardeFin = profesional.sabado.tardeFin;
                      profAtiendeManana = profesional.sabado.atiendeManana; profAtiendeTarde = profesional.sabado.atiendeTarde}
      //-----DOMINGO-------------------------------
      if (dow == 0) { var profMananaInicio = profesional.domingo.mananaInicio; var profMananaFin = profesional.domingo.mananaFin; 
                      var profTardeInicio = profesional.domingo.tardeInicio; var profTardeFin = profesional.domingo.tardeFin;
                      profAtiendeManana = profesional.domingo.atiendeManana; profAtiendeTarde = profesional.domingo.atiendeTarde}

      //--------- TENGO QUE VER SI EL TURNO ES DE MAÑANA O DE TARDE Y USAR EL MISMO ALGORITMO ---------------------      

      var diaSeleccionado = Template.instance().selDia.get();

      //var fapertura = new Date(diaSeleccionado); fapertura.setHours(apertura,0,0); //TENGO QUE SETEAR LA HORA DE APERTURA DEL CONSULTORIO
      //var fcierre = new Date(diaSeleccionado);  fcierre.setHours(cierre,0,0); //TENGO QUE SETEAR LA HORA DE CIERRE DEL CONSULTORIO   
      var fapertura, fcierre; 
      var aperturaReal, cierreReal;
      var esTurnoDeManana = false;
      var esTurnoDeTarde = false;

      //ME TENGO QUE FIJAR SI EL TURNO A ELIMINAR ES DE MAÑANA O DE TARDE, SOLO CAMBIA LA FRANJA DE RAZONAMIENTO
      //TENGO QUE ACOTAR MI HORARIO DE APERTURA Y CIERRE A LA MAÑANA O A LA TARDE, SEGUN EL HORARIO A ELIMINAR    
      
      
      if (profAtiendeManana){        
        var profHoraInicioManana = profMananaInicio.getHours(); var profMinutosInicioManana = profMananaInicio.getMinutes();
            var proffaperturaManana = new Date(diaSeleccionado); 
        proffaperturaManana.setHours(profHoraInicioManana, profMinutosInicioManana,0);

            var profHoraFinManana = profMananaFin.getHours(); var profMinutosFinManana = profMananaFin.getMinutes();
            var proffcierreManana = new Date(diaSeleccionado); 
        proffcierreManana.setHours(profHoraFinManana, profMinutosFinManana,0);
        aperturaReal = proffaperturaManana;
        cierreReal = proffcierreManana;

        //if ((turno.inicio >= proffaperturaManana) && (turno.fin <= proffcierreManana)){ //EL TURNO QUE QUIERO ELIMINAR ES DE MAÑANA
          if (proffaperturaManana <= proffcierreManana){ //EL TURNO QUE QUIERO ELIMINAR ES DE MAÑANA          
          fapertura = proffaperturaManana;
          fcierre = proffcierreManana;
          esTurnoDeManana = true;
        }

      }

      if (profAtiendeTarde){
            var profHoraInicioTarte = profTardeInicio.getHours(); var profMinutosInicioTarte = profTardeInicio.getMinutes();
            var proffaperturaTarde =  new Date(diaSeleccionado); 
        proffaperturaTarde.setHours(profHoraInicioTarte, profMinutosInicioTarte,0);

            var profHoraFinTarte = profTardeFin.getHours(); var profMinutosFinTarte = profTardeFin.getMinutes();
            var proffcierreTarde = new Date(diaSeleccionado); 
        proffcierreTarde.setHours(profHoraFinTarte, profMinutosFinTarte,0);
        //si tiene datos de la apertura del local a la mañana no tengo que hacer nada
        if (aperturaReal === null){
          aperturaReal = proffaperturaTarde
        }        
        //en todo caso sobreescrito el valor del cierre real
        cierreReal = proffcierreTarde;

        if ((turno.inicio >= proffaperturaTarde) && (turno.fin <= proffcierreTarde)){ //EL TURNO QUE QUIERO ELIMINAR ES DE TARDE          
          fapertura = proffaperturaTarde;
          fcierre = proffcierreTarde;
          esTurnoDeTarde = true;
        } 
      }

      var iso1 = turno.inicio;//INICIO DEL TURNO
      var iso2 = turno.fin;//FIN DEL TURNO
      
      var base = iso1;
      var tope = iso2;

      //AHORA CAMBIA EL ALGORITMO DE ELIMINACION PORQUE PORQUE HAY QUE RESPETAR LOS HORARIOS DE AUSENSIA DEL PROFESIONAL Y CIERRE DEL LOCAL
      //ESTOS HORARIOS ESTAN PLASMADOS EN fapertura Y fcierre

      //BUSCO UN TURNO LIBRE, DE ESE PROFESIONAL, ANTES QUE ESTE PEGADO Y QUE SEA SUPERIOR A fapertura
      var turnoAntes = Turnos.findOne({"profesional._id":profesionalId, "estado": "LIBRE", fin : iso1});      
      if (turnoAntes){      
        base = turnoAntes.inicio;
        Turnos.remove({"_id": turnoAntes._id});
      }

      //BUSCO UN TURNO LIBRE, DE ESE PROFESIONAL, DESPUES QUE ESTE PEGADO    
      var turnoDespues = Turnos.findOne({"profesional._id":profesionalId, "estado": "LIBRE", inicio : iso2});      
      if (turnoDespues){      
        tope = turnoDespues.fin;
        Turnos.remove({"_id": turnoDespues._id});
      }

      Turnos.remove({"_id": turno._id});

      var diffMins = diferenciaMinutos(base, tope); var prof = turno.profesional;    


      //ACA TENGO QUE PREGUNTAR POR EL VERDADERO HORARIO DE APERTURA Y CIERRE DEL LOCAL, PARA VER SI HAY TURNOS.
      //--------------------------------------------------------------- inicio >= fapertura y inicio <= fcierre -------
      
      var col = Turnos.find({"profesional._id":profesionalId,"turno.estado": { $ne: "AUSENTE" },"turno.estado": { $ne: "CERRADO" },"turno.estado": { $ne: "SOBRETURNO" },"turno.estado": { $ne: "SOBRETURNO ATENDIDO" },"turno.estado": { $ne: "SOBRETURNO FALTO" }, "inicio" : {"$gte" : aperturaReal, "$lte" : cierreReal}});    
      
      

      //var col = Turnos.find({"profesional._id":profesionalId,"turno.sobreturno": false});  
      //SI ELIMINO TODOS LOS TURNOS NO TENGO QUE GENERAR UN TURNO VACIO
      if (col.count() !== 0){      
        console.log("-----------------------INGRESA A INSERTAR EL TURNO LIBRE----------------------");
        Turnos.insert({inicio:base, fin: tope, duracion: diffMins, estado:"LIBRE", profesional:prof});  
      } else{
        console.log("-----------------------NO INGRESA A INSERTAR EL TURNO LIBRE----------------------");
      }
    }
    
    $('#modalEliminarTurno').modal('hide');
  },

 
  //************************************** FORMULARIO MODAL PARA RESERVAR UN TURNO **********************************
  'submit #formTurno':function(event) {

      //------------------ ESTO TIENE QUE ESTAR AL PRINCIPIO SINO DAN ERROR LAS VENTANAS MODALES ------------
      //Prevent default browser form submit
      event.preventDefault();

      var tratamientoId = Template.instance().selTratamiento.get();
      var tratamientosCombos = Template.instance().selTratamientos.get();
      console.log("tratamientosCombos", tratamientosCombos);
      var cons = this.consultorio;

      /*if (tratamientoId === null) {
        console.log('LINEA 582');
        $('#modalNoIngresoTratamiento').modal('show');        
      }
      else{*/
        //RECUPERO EL TRATAMIENTO SELECCIONADO (OBJETO)
        let tratamiento = Tratamientos.findOne({"_id":tratamientoId});
        console.log(tratamiento);
        if (tratamiento.sobreturno){ //ES UN SOBRETURNO              
              var apertura = 8;
              var cierre = 22;              

              // Get value from form element
              const target = event.target;  
              var mot = target.motivo.value;

              //-----------------------RECUPERO EL PROFESIONAL SELECCIONADO-----------------------------
              var profesionalId = Template.instance().selProfesionales.get();
              if (profesionalId === null) {                
                $('#modalNoIngresoProfesional').modal('show');        
              };

              //RECUPERO EL PROFESIONAL DEL TRATAMIENTO A INSERTAR
              let profesional = Profesionales.findOne({"_id":profesionalId});
              let prof={  _id:profesional._id,
                          nombreApellido: profesional.nombreApellido,
              };
              //----------------------RECUPERO EL PACIENTE SELECCIONADO----------------------------

              var pacienteId = Template.instance().selPaciente.get();  
              if (pacienteId === null) {
                $('#modalNoIngresoPaciente').modal('show');        
              };
              let paciente = Pacientes.findOne({"_id":pacienteId});      
              let pac= {   _id: paciente._id,
                            nombreApellido:paciente.nombreApellido,
                            dni:paciente.dni,
                            telefono:paciente.telefono,         
              }; 

              //-----------------------RECUPERO EL TRATAMIENTO SELECCIONADO----------------------------

              var imp;
              var trat;
              var ingresoTratamiento = true;
              /*if (profesional.combos){                                         
                trat = Template.instance().selTratamientos.get();        
                imp = Template.instance().selImporte.get();//RECUPERO EL IMPORTE DE LOS TRATAMIENTOS
                if (trat.length == 0) { ingresoTratamiento = false};
                console.log('ENTRO EN COMBOS 1');

              }
              else{        */
                var tratamientoId = Template.instance().selTratamiento.get();
                if (tratamientoId === null) { ingresoTratamiento = false };

                //RECUPERO EL TRATAMIENTO SELECCIONADO (OBJETO)
                let tratamiento = Tratamientos.findOne({"_id":tratamientoId});
                var dur = Number(tratamiento.duracion);
                trat= [{ _id: tratamiento._id,
                            nombre:tratamiento.nombre,
                            duracion:dur,
                            importe:tratamiento.importe,
                }];
                imp = tratamiento.importe;//RECUPERO EL IMPORTE DEL TRATAMIENTO;
              //}

              if (ingresoTratamiento) {
                //--------------------------RECUPERO LOS HORARIOS DEL TURNO-------------------------
                var horaInicio = Number(target.selHoraInicio.value);       
                var minutosInicio = Number(target.selMinutosInicio.value);      
                
                //--------------------------SETEO HORA INICIO Y FIN ------------------------------------

                //RECUPERO EL DIA SELECCIONADO
                var diaSeleccionado = Template.instance().selDia.get();           
                
                var date1 = moment(diaSeleccionado);
                var date2 = moment(diaSeleccionado);

                //SETEO LA HORA DE INICIO      
                date1.set({hour:horaInicio,minute:minutosInicio});
              

                //TENGO QUE CALCULAR LA HORA DE FIN CON LA DURACION DEL TRATAMIENTO
                if (target.selHoraFin === undefined) {             

                  //SETEO LA HORA DE FIN PARA SUMARLE LA DURACION DEL TRATAMIENTO                
                  date2.set({hour:horaInicio,minute:minutosInicio});     

                  //RECUPERO LA DURACION DEL TRATAMIENTO DESDE LA VARIABLE REACTIVA
                  numberDuracion = Template.instance().selDuracion.get();

                  //LE SUMO LOS MINUTOS DEL TRATAMIENTO
                  date2 = moment(date2).add(numberDuracion, 'minutes');

                  var horaFin = moment(date2).get('hour');
                  var minutosFin = moment(date2).get('minute');
                }
                else{
                  var horaFin = Number(target.selHoraFin.value);
                  var minutosFin = Number(target.selMinutosFin.value);

                  //SETEO LAS HORA DE FIN                
                  date2.set({hour:horaFin,minute:minutosFin});
                };

             
                //-----------------------------------------------------INSERCION DEL TURNO-------------------------------------                                 

                var fapertura = new Date(diaSeleccionado); fapertura.setHours(apertura,0,0); //TENGO QUE SETEAR LA HORA DE APERTURA DEL CONSULTORIO
                var fcierre = new Date(diaSeleccionado);  fcierre.setHours(cierre,0,0); //TENGO QUE SETEAR LA HORA DE CIERRE DEL CONSULTORIO
                var iso1 = new Date(date1);  
                var iso2 = new Date (date2);    

                if (iso2 > fcierre){          
                  $('#modalHorarioValido').modal('show');           
                }
                else{

                   //--------------------------------------------------------------- inicio >= fapertura y inicio <= fcierre -------
                  var tur = Turnos.find({"profesional._id":profesionalId,$or: [ {estado: "OCUPADO"}, {estado: "ASISTIO"} ,{estado: "FALTO"},
                                                {estado: "CONFIRMADO"},{estado: "ATENDIDO"},{estado: "LIBRE"},{estado: "SOBRETURNO"},{estado: "CERRADO"},{estado: "AUSENTE"}], inicio : {$gte : fapertura, $lte : fcierre}},{sort: {inicio: 1}});  
                  //NO HAY NINGUN TURNO
                  if (tur.count()===0){                      
                    var difTurno = diferenciaMinutos(iso1, iso2);
                    Turnos.insert({inicio:iso1, fin:iso2, duracion: difTurno, estado:"SOBRETURNO", importe:imp, tratamientos:trat, profesional:prof, paciente: pac ,motivo:mot}); //TURNO            
                    
                    Turnos.insert({inicio:fapertura, fin:fcierre, estado:"LIBRE", profesional:prof});//DESPUES
                  }
                  else{
                    var difTurno = diferenciaMinutos(iso1, iso2);
                    Turnos.insert({inicio:iso1, fin:iso2, duracion: difTurno, estado:"SOBRETURNO", importe:imp, tratamientos:trat, profesional:prof, paciente: pac ,motivo:mot}); //TURNO
                  }
                  
                  $('#modalIngresoTurno').modal('hide');
                } 
              }
              else{ //NO INGRESO TRATAMIENTO
                $('#modalNoIngresoTratamiento').modal('show');
              }

        } 
        else {          
              //------------------------------CARGO LOS HORARIOS DEL CONSULTORIO--------------------------------------    
              var apertura = 8;
              var cierre = 22;
              var diaSeleccionado = Template.instance().selDia.get(); 
              var atiendeManana = false;
              var atiendeTarde = false;          

              var date = Template.instance().selDia.get();
              var dow = date.getDay();
              if (dow == 1) { var mananaInicio = cons.lunes.mananaInicio; var mananaFin = cons.lunes.mananaFin; 
                              var tardeInicio = cons.lunes.tardeInicio; var tardeFin = cons.lunes.tardeFin;
                              atiendeManana = cons.lunes.atiendeManana; atiendeTarde = cons.lunes.atiendeTarde}
              if (dow == 2) { var mananaInicio = cons.martes.mananaInicio; var mananaFin = cons.martes.mananaFin; 
                              var tardeInicio = cons.martes.tardeInicio; var tardeFin = cons.martes.tardeFin;
                              atiendeManana = cons.martes.atiendeManana; atiendeTarde = cons.martes.atiendeTarde}
              if (dow == 3) { var mananaInicio = cons.miercoles.mananaInicio; var mananaFin = cons.miercoles.mananaFin; 
                              var tardeInicio = cons.miercoles.tardeInicio; var tardeFin = cons.miercoles.tardeFin;
                              atiendeManana = cons.miercoles.atiendeManana; atiendeTarde = cons.miercoles.atiendeTarde}
              if (dow == 4) { var mananaInicio = cons.jueves.mananaInicio; var mananaFin = cons.jueves.mananaFin; 
                              var tardeInicio = cons.jueves.tardeInicio; var tardeFin = cons.jueves.tardeFin;
                              atiendeManana = cons.jueves.atiendeManana; atiendeTarde = cons.jueves.atiendeTarde}
              if (dow == 5) { var mananaInicio = cons.viernes.mananaInicio; var mananaFin = cons.viernes.mananaFin; 
                              var tardeInicio = cons.viernes.tardeInicio; var tardeFin = cons.viernes.tardeFin;
                              atiendeManana = cons.viernes.atiendeManana; atiendeTarde = cons.viernes.atiendeTarde}
              if (dow == 6) { var mananaInicio = cons.sabado.mananaInicio; var mananaFin = cons.sabado.mananaFin; 
                              var tardeInicio = cons.sabado.tardeInicio; var tardeFin = cons.sabado.tardeFin;
                              atiendeManana = cons.sabado.atiendeManana; atiendeTarde = cons.sabado.atiendeTarde}
              if (dow == 0) { var mananaInicio = cons.domingo.mananaInicio; var mananaFin = cons.domingo.mananaFin; 
                              var tardeInicio = cons.domingo.tardeInicio; var tardeFin = cons.domingo.tardeFin;
                              atiendeManana = cons.domingo.atiendeManana; atiendeTarde = cons.domingo.atiendeTarde}

              
                    var horaInicioManana = mananaInicio.getHours(); var minutosInicioManana = mananaInicio.getMinutes();
                    var faperturaManana = new Date(diaSeleccionado); 
              faperturaManana.setHours(horaInicioManana, minutosInicioManana,0);

                    var horaFinManana = mananaFin.getHours(); var minutosFinManana = mananaFin.getMinutes();
                    var fcierreManana = new Date(diaSeleccionado); 
              fcierreManana.setHours(horaFinManana, minutosFinManana,0);

                    var horaInicioTarte = tardeInicio.getHours(); var minutosInicioTarte = tardeInicio.getMinutes();
                    var faperturaTarde =  new Date(diaSeleccionado); 
              faperturaTarde.setHours(horaInicioTarte, minutosInicioTarte,0);

                    var horaFinTarte = tardeFin.getHours(); var minutosFinTarte = tardeFin.getMinutes();
                    var fcierreTarde = new Date(diaSeleccionado); 
              fcierreTarde.setHours(horaFinTarte, minutosFinTarte,0);    

              //----------------------------CARGO LOS HORARIOS DEL PROFESIONAL----------------------------------------------------
                      //-----------------------RECUPERO EL PROFESIONAL SELECCIONADO-----------------------------
                      var profesionalId = Template.instance().selProfesionales.get();
                      if (profesionalId === null) {                
                        $('#modalNoIngresoProfesional').modal('show');        
                      };

                      //RECUPERO EL PROFESIONAL DEL TRATAMIENTO A INSERTAR
                      let profesional = Profesionales.findOne({"_id":profesionalId});
                      let prof={  _id:profesional._id,nombreApellido: profesional.nombreApellido};

                      var profAtiendeManana = false;
                      var profAtiendeTarde = false;          

                      var date = Template.instance().selDia.get();
                      var dow = date.getDay();
                      if (dow == 1) { var profMananaInicio = profesional.lunes.mananaInicio; var profMananaFin = profesional.lunes.mananaFin; 
                                      var profTardeInicio = profesional.lunes.tardeInicio; var profTardeFin = profesional.lunes.tardeFin;
                                      profAtiendeManana = profesional.lunes.atiendeManana; profAtiendeTarde = profesional.lunes.atiendeTarde}
                      if (dow == 2) { var profMananaInicio = profesional.martes.mananaInicio; var profMananaFin = profesional.martes.mananaFin; 
                                      var profTardeInicio = profesional.martes.tardeInicio; var profTardeFin = profesional.martes.tardeFin;
                                      profAtiendeManana = profesional.martes.atiendeManana; profAtiendeTarde = profesional.martes.atiendeTarde}
                      if (dow == 3) { var profMananaInicio = profesional.miercoles.mananaInicio; var profMananaFin = profesional.miercoles.mananaFin; 
                                      var profTardeInicio = profesional.miercoles.tardeInicio; var profTardeFin = profesional.miercoles.tardeFin;
                                      profAtiendeManana = profesional.miercoles.atiendeManana; profAtiendeTarde = profesional.miercoles.atiendeTarde}
                      if (dow == 4) { var profMananaInicio = profesional.jueves.mananaInicio; var profMananaFin = profesional.jueves.mananaFin; 
                                      var profTardeInicio = profesional.jueves.tardeInicio; var profTardeFin = profesional.jueves.tardeFin;
                                      profAtiendeManana = profesional.jueves.atiendeManana; profAtiendeTarde = profesional.jueves.atiendeTarde}
                      if (dow == 5) { var profMananaInicio = profesional.viernes.mananaInicio; var profMananaFin = profesional.viernes.mananaFin; 
                                      var profTardeInicio = profesional.viernes.tardeInicio; var profTardeFin = profesional.viernes.tardeFin;
                                      profAtiendeManana = profesional.viernes.atiendeManana; profAtiendeTarde = profesional.viernes.atiendeTarde}
                      if (dow == 6) { var profMananaInicio = profesional.sabado.mananaInicio; var profMananaFin = profesional.sabado.mananaFin; 
                                      var profTardeInicio = profesional.sabado.tardeInicio; var profTardeFin = profesional.sabado.tardeFin;
                                      profAtiendeManana = profesional.sabado.atiendeManana; profAtiendeTarde = profesional.sabado.atiendeTarde}
                      if (dow == 0) { var profMananaInicio = profesional.domingo.mananaInicio; var profMananaFin = profesional.domingo.mananaFin; 
                                      var profTardeInicio = profesional.domingo.tardeInicio; var profTardeFin = profesional.domingo.tardeFin;
                                      profAtiendeManana = profesional.domingo.atiendeManana; profAtiendeTarde = profesional.domingo.atiendeTarde}

                      if (profAtiendeManana){
                        var profHoraInicioManana = profMananaInicio.getHours(); var profMinutosInicioManana = profMananaInicio.getMinutes();
                            var proffaperturaManana = new Date(diaSeleccionado); 
                        proffaperturaManana.setHours(profHoraInicioManana, profMinutosInicioManana,0);

                            var profHoraFinManana = profMananaFin.getHours(); var profMinutosFinManana = profMananaFin.getMinutes();
                            var proffcierreManana = new Date(diaSeleccionado); 
                        proffcierreManana.setHours(profHoraFinManana, profMinutosFinManana,0);
                      }

                      if (profAtiendeTarde){
                            var profHoraInicioTarte = profTardeInicio.getHours(); var profMinutosInicioTarte = profTardeInicio.getMinutes();
                            var proffaperturaTarde =  new Date(diaSeleccionado); 
                        proffaperturaTarde.setHours(profHoraInicioTarte, profMinutosInicioTarte,0);

                            var profHoraFinTarte = profTardeFin.getHours(); var profMinutosFinTarte = profTardeFin.getMinutes();
                            var proffcierreTarde = new Date(diaSeleccionado); 
                        proffcierreTarde.setHours(profHoraFinTarte, profMinutosFinTarte,0); 
                      }

              
              // Get value from form element
              const target = event.target;  

              var mot = target.motivo.value;

             
                        //----------------------RECUPERO EL PACIENTE SELECCIONADO----------------------------

                        var pacienteId = Template.instance().selPaciente.get();  
                        if (pacienteId === null) {
                          $('#modalNoIngresoPaciente').modal('show');        
                        };
                        let paciente = Pacientes.findOne({"_id":pacienteId});      
                        let pac= {   _id: paciente._id, nombreApellido:paciente.nombreApellido, dni:paciente.dni, telefono:paciente.telefono}; 

              //-----------------------RECUPERO EL TRATAMIENTO SELECCIONADO----------------------------

                        var imp;
                        var trat;
                        var ingresoTratamiento = true;
                        /*if (profesional.combos){                                         
                                trat = Template.instance().selTratamientos.get();        
                                imp = Template.instance().selImporte.get();//RECUPERO EL IMPORTE DE LOS TRATAMIENTOS
                                if ( trat.length == 0) { ingresoTratamiento = false; };                
                        }
                        else{ //NO HAY COMBOS       */
                                var tratamientoId = Template.instance().selTratamiento.get();
                                if (tratamientoId === null) {ingresoTratamiento = false; }
                                else{
                                  //RECUPERO EL TRATAMIENTO SELECCIONADO (OBJETO)
                                  let tratamiento = Tratamientos.findOne({"_id":tratamientoId});
                                  var dur = Number(tratamiento.duracion);
                                  trat= [{ _id: tratamiento._id, nombre:tratamiento.nombre, duracion:dur, importe:tratamiento.importe }];
                                  imp = tratamiento.importe;//RECUPERO EL IMPORTE DEL TRATAMIENTO;
                                }                         
                        //}


              if (ingresoTratamiento){//--------------------------RECUPERO LOS HORARIOS DEL TURNO-------------------------
                        var horaInicio = Number(target.selHoraInicio.value);             
                        var minutosInicio = Number(target.selMinutosInicio.value);      
                        
                        //--------------------------SETEO HORA INICIO Y FIN ------------------------------------

                        //RECUPERO EL DIA SELECCIONADO
                        
                        
                        var date1 = moment(diaSeleccionado);
                        var date2 = moment(diaSeleccionado);

                        //SETEO LA HORA DE INICIO      
                        date1.set({hour:horaInicio,minute:minutosInicio});
              

                //TENGO QUE CALCULAR LA HORA DE FIN CON LA DURACION DEL TRATAMIENTO
                        if (target.selHoraFin === undefined) {                                  
                          date2.set({hour:horaInicio,minute:minutosInicio});     //SETEO LA HORA DE FIN PARA SUMARLE LA DURACION DEL TRATAMIENTO
                          numberDuracion = Template.instance().selDuracion.get(); //RECUPERO LA DURACION DEL TRATAMIENTO DESDE LA VARIABLE REACTIVA
                          date2 = moment(date2).add(numberDuracion, 'minutes'); //LE SUMO LOS MINUTOS DEL TRATAMIENTO
                          var horaFin = moment(date2).get('hour');
                          var minutosFin = moment(date2).get('minute');
                        }
                        else{
                          var horaFin = Number(target.selHoraFin.value);
                          var minutosFin = Number(target.selMinutosFin.value);                              
                          date2.set({hour:horaFin,minute:minutosFin}); //SETEO LAS HORA DE FIN 
                        };

             
                //-----------------------------------------------------INSERCION DEL TURNO-------------------------------------                                 

                        //var fapertura = new Date(diaSeleccionado); fapertura.setHours(apertura,0,0); //TENGO QUE SETEAR LA HORA DE APERTURA DEL CONSULTORIO
                        //var fcierre = new Date(diaSeleccionado);  fcierre.setHours(cierre,0,0); //TENGO QUE SETEAR LA HORA DE CIERRE DEL CONSULTORIO
                        var fapertura = faperturaManana;
                        var fcierre = fcierreTarde;
                        var iso1 = new Date(date1);  
                        var iso2 = new Date (date2);    

                        if ((iso2 > fcierre) || (horaInicio === 0) || (iso1 < fapertura) || (horaFin === 0)){          
                          $('#modalHorarioValido').modal('show');           
                        }
                        //********************************************************* INSERSION DE TURNOS ***********************************************************************************************
                        else{

                          //--------------------------------------------------------------- inicio >= fapertura y inicio <= fcierre -------
                          var tur = Turnos.find({"profesional._id":profesionalId,$or: [ {estado: "OCUPADO"}, {estado: "ASISTIO"} ,{estado: "FALTO"},
                                                        {estado: "CONFIRMADO"},{estado: "ATENDIDO"},{estado: "LIBRE"},{estado: "CERRADO"},{estado: "AUSENTE"}],  
                                                        inicio : {$gte : fapertura, $lte : fcierre}},{sort: {inicio: 1}}); 

                           
                          if (tur.count()===1){
                            var tur2 = Turnos.findOne({"profesional._id":profesionalId,$or: [ {estado: "OCUPADO"}, {estado: "ASISTIO"} ,{estado: "FALTO"},
                                                        {estado: "CONFIRMADO"},{estado: "ATENDIDO"},{estado: "LIBRE"},{estado: "CERRADO"},{estado: "AUSENTE"}],  
                                                        inicio : {$gte : fapertura, $lte : fcierre}},{sort: {inicio: 1}});
                            Turnos.remove({"_id": tur2._id});
                          }

                          var tur = Turnos.find({"profesional._id":profesionalId,$or: [ {estado: "OCUPADO"}, {estado: "ASISTIO"} ,{estado: "FALTO"},
                                                        {estado: "CONFIRMADO"},{estado: "ATENDIDO"},{estado: "LIBRE"},{estado: "CERRADO"},{estado: "AUSENTE"}],  
                                                        inicio : {$gte : fapertura, $lte : fcierre}},{sort: {inicio: 1}}); 

                          //INSERTO EL HORARIO CERRADO DEL CONSULTORIO Y LOS HORARIOS DEL PROFESIONAL
                          if (tur.count()===0){ //SI NO HAY NINGUN TURNO TENGO QUE INSERTAR EL TURNO DE HORARIO CERRADO  
                              var fa = new Date(diaSeleccionado); fa.setHours(apertura,0,0); //TENGO QUE SETEAR LA HORA DE APERTURA DEL CONSULTORIO
                              var fc = new Date(diaSeleccionado);  fc.setHours(cierre,0,0); //TENGO QUE SETEAR LA HORA DE CIERRE DEL CONSULTORIO
                              if (atiendeManana) {
                                if (atiendeTarde){ 
                                  if (profAtiendeManana){
                                    var difAntes = diferenciaMinutos(fapertura, proffaperturaManana);              
                                    if (difAntes != 0){ 
                                      Turnos.insert({inicio:faperturaManana, fin:proffaperturaManana, duracion: difAntes, estado:"AUSENTE", profesional:prof});//AUSENTE MAÑANA INICIO                                      
                                    }                                    
                                    
                                    var difTurno = diferenciaMinutos(proffaperturaManana, proffcierreManana);   
                                    if (difTurno != 0)           {
                                      Turnos.insert({inicio:proffaperturaManana, fin:proffcierreManana, duracion: difTurno, estado:"LIBRE", profesional:prof}); //LIBRE MAÑANA  
                                    }
                                    var difDespues = diferenciaMinutos(proffcierreManana, fcierreManana);              
                                    if (difDespues != 0){
                                      Turnos.insert({inicio:proffcierreManana, fin:fcierreManana, duracion: difDespues, estado:"AUSENTE", profesional:prof});//AUSENTE MAÑANA FIN
                                    }                                    

                                  }
                                  else{
                                    var difAntes = diferenciaMinutos(faperturaManana, fcierreManana);              
                                    Turnos.insert({inicio:faperturaManana, fin:fcierreManana, duracion: difAntes, estado:"AUSENTE", profesional:prof});//MAÑANA 
                                  }                                  
                                    
                                  var difTurno = diferenciaMinutos(fcierreManana, faperturaTarde);              
                                  if (difTurno != 0){
                                    Turnos.insert({inicio:fcierreManana, fin:faperturaTarde, duracion: difTurno, estado:"CERRADO", profesional:prof}); //CERRADO                                    
                                  }
                                  

                                  if (profAtiendeTarde){

                                    var difAntes = diferenciaMinutos(faperturaTarde, proffaperturaTarde);              
                                    if (difAntes != 0){ 
                                      Turnos.insert({inicio:faperturaTarde, fin:proffaperturaTarde, duracion: difAntes, estado:"AUSENTE", profesional:prof});//AUSENTE TARDE INICIO                                      
                                    }
                                    
                                    var difTurno = diferenciaMinutos(proffaperturaTarde, proffcierreTarde);              
                                    if (difTurno != 0){
                                      Turnos.insert({inicio:proffaperturaTarde, fin:proffcierreTarde, duracion: difTurno, estado:"LIBRE", profesional:prof}); //LIBRE TARDE  
                                    }
                                    
                                    var difDespues = diferenciaMinutos(proffcierreTarde, fcierreTarde);              
                                    if (difDespues != 0){
                                      Turnos.insert({inicio:proffcierreTarde, fin:fcierreTarde, duracion: difDespues, estado:"AUSENTE", profesional:prof});//AUSENTE TARDE FIN
                                    }
                                    
                                  }
                                  else{
                                    var difDespues = diferenciaMinutos(faperturaTarde, fcierreTarde);    
                                    if (difDespues != 0){
                                      Turnos.insert({inicio:faperturaTarde, fin:fcierreTarde, duracion: difDespues, estado:"AUSENTE", profesional:prof});//TARDE
                                    }
                                    
                                  }
                                }
                                else{ //atiende de mañana y no por la tarde  

                                  if (profAtiendeManana){
                                    var difAntes = diferenciaMinutos(faperturaManana, proffaperturaManana);   
                                    if (difAntes != 0)           {
                                      Turnos.insert({inicio:faperturaManana, fin:proffaperturaManana, duracion: difAntes, estado:"AUSENTE", profesional:prof});//AUSENTE MAÑANA INICIO  
                                    }                                    
                                    
                                    var difTurno = diferenciaMinutos(proffaperturaManana, proffcierreManana);              
                                    if (difTurno !=0 ){
                                      Turnos.insert({inicio:proffaperturaManana, fin:proffcierreManana, duracion: difTurno, estado:"LIBRE", profesional:prof}); //LIBRE MAÑANA  
                                    }                                    

                                    var difDespues = diferenciaMinutos(proffcierreManana, fcierreManana);  
                                    if (difDespues != 0)            {
                                      Turnos.insert({inicio:proffcierreManana, fin:fcierreManana, duracion: difDespues, estado:"AUSENTE", profesional:prof});//AUSENTE MAÑANA FIN  
                                    }                                    

                                  }
                                  else{
                                    var difAntes = diferenciaMinutos(faperturaManana, fcierreManana);              
                                    if (difAntes != 0){
                                      Turnos.insert({inicio:faperturaManana, fin:fcierreManana, duracion: difAntes, estado:"AUSENTE", profesional:prof});//MAÑANA   
                                    }                                    
                                  }                                   
                                    
                                  var difTurno = diferenciaMinutos(fcierreManana, fc); 
                                  if (difTurno != 0)             {
                                    Turnos.insert({inicio:fcierreManana, fin:fcierre, duracion: difTurno, estado:"CERRADO", profesional:prof}); //CERRADO                            
                                  }
                                  
                                }
                              }
                              else{
                                if (atiendeTarde){ //atiende solo de tarde                          
                                    
                                  var difTurno = diferenciaMinutos(fa, faperturaTarde);  
                                  if (difTurno != 0){
                                    Turnos.insert({inicio:fa, fin:faperturaTarde, duracion: difTurno, estado:"CERRADO", profesional:prof}); //CERRADO  
                                  }                                  

                                  if (profAtiendeTarde){

                                    var difAntes = diferenciaMinutos(faperturaTarde, proffaperturaTarde);    
                                    if (difAntes != 0)          {
                                      Turnos.insert({inicio:faperturaTarde, fin:proffaperturaTarde, duracion: difAntes, estado:"AUSENTE", profesional:prof});//AUSENTE TARDE INICIO                                        
                                    }
                                    
                                    var difTurno = diferenciaMinutos(proffaperturaTarde, proffcierreTarde);              
                                    if (difTurno != 0){
                                      Turnos.insert({inicio:proffaperturaTarde, fin:profHoraFinTarte, duracion: difTurno, estado:"LIBRE", profesional:prof}); //LIBRE TARDE  
                                    }
                                    
                                    var difDespues = diferenciaMinutos(proffcierreTarde, fcierreTarde);              
                                    if (difDespues != 0){
                                      Turnos.insert({inicio:proffcierreTarde, fin:fcierreTarde, duracion: difDespues, estado:"AUSENTE", profesional:prof});//AUSENTE TARDE FIN  
                                    }
                                    
                                  }
                                  else{
                                    var difDespues = diferenciaMinutos(faperturaTarde, fcierreTarde);              
                                    if (difDespues != 0){
                                      Turnos.insert({inicio:faperturaTarde, fin:fcierreTarde, duracion: difDespues, estado:"AUSENTE", profesional:prof});//TARDE  
                                    }                                    
                                  }
                                }
                                else{ // no atiende en todo el dia
                                  var difTurno = diferenciaMinutos(fa, fc);   
                                  if (difTurno != 0){
                                    Turnos.insert({inicio:fa, fin:fc, duracion: difTurno, estado:"CERRADO", profesional:prof}); //CERRADO  
                                  }
                                  
                                }
                              }                        
                           }
                          

                          //var tur = Turnos.find({"profesional._id":profesionalId,$or: [ {estado: "OCUPADO"}, {estado: "ASISTIO"} ,{estado: "FALTO"},
                          //                              {estado: "CONFIRMADO"},{estado: "ATENDIDO"},{estado: "LIBRE"},{estado: "CERRADO"},{estado: "AUSENTE"}],  inicio : {$gte : fapertura, $lte : fcierre}},{sort: {inicio: 1}}); 
                          var tur = Turnos.find({"profesional._id":profesionalId, inicio : {$gte : fapertura, $lte : fcierre}},{sort: {inicio: 1}}); 
                          //NO HAY NINGUN TURNO
                          if (tur.count() === 0){ //SOLO SE GENERO EL TURNO CON LOS HORARIOS DE APERTURA Y CIERRE DEL CONSULTORIO
                            //ESPACIO ANTES
                            //PRIMER HORARIO          
                            if ((horaInicio === apertura) && (minutosInicio === 0)){             
                              
                              var difTurno = diferenciaMinutos(iso1, iso2);
                              Turnos.insert({inicio:iso1, fin:iso2, duracion: difTurno, estado:"OCUPADO", importe:imp, tratamientos:trat, profesional:prof, paciente: pac ,motivo:mot}); //TURNO
                              
                              var difDespues = diferenciaMinutos(iso2, fcierre);
                              Turnos.insert({inicio:iso2, fin:fcierre, duracion: difDespues, estado:"LIBRE", profesional:prof});//DESPUES
                            }
                            //HORARIO DEL MEDIO apertura<HORARIO<cierre
                            else{
                              horaF = Number(horaFin); //convierto la hora de string a number            
                              if (horaF < cierre){  
                                var difAntes = diferenciaMinutos(fapertura, iso1);              
                                Turnos.insert({inicio:fapertura, fin:iso1, duracion: difAntes, estado:"LIBRE", profesional:prof});//ANTES 
                                  
                                var difTurno = diferenciaMinutos(iso1, iso2);              
                                Turnos.insert({inicio:iso1, fin:iso2, duracion: difTurno, estado:"OCUPADO", importe:imp,tratamientos:trat, profesional:prof, paciente: pac ,motivo:mot}); //TURNO

                                
                                var difDespues = diferenciaMinutos(iso2, fcierre);              
                                Turnos.insert({inicio:iso2, fin:fcierre, duracion: difDespues, estado:"LIBRE", profesional:prof});//DESPUES              
                              }
                              //ES EL ULTIMO HORARIO
                              else{                
                                  
                                var difAntes = diferenciaMinutos(fapertura, fin);
                                Turnos.insert({inicio:fapertura, fin:iso1, duracion: difAntes, estado:"LIBRE", profesional:prof});//ANTES

                                var difTurno = diferenciaMinutos(iso1, iso2);
                                Turnos.insert({inicio:iso1, fin:iso2, duracion: difTurno, estado:"OCUPADO",importe:imp, tratamientos:trat, profesional:prof, paciente: pac ,motivo:mot}); //TURNO            
                              }
                            }
                            $('#modalIngresoTurno').modal('hide');          
                          }
                          //HAY TURNOS
                          else{

                            //QUE SE QUIERA METER EN EL MEDIO DE UN TURNO OCUPADO
                            var condicion1 = Turnos.find({"profesional._id":profesionalId,$or: [ {estado: "OCUPADO"}, {estado: "ASISTIO"} ,{estado: "FALTO"},
                                                        {estado: "CONFIRMADO"},{estado: "ATENDIDO"},{estado: "CERRADO"},{estado: "AUSENTE"}],inicio : {$lte : iso1}, fin : {$gte : iso2}});

                            //QUE SE QUIERA METER SOLAPADO CON EL INICIO DE UN TURNO
                            var condicion2 = Turnos.find({"profesional._id":profesionalId,$or: [ {estado: "OCUPADO"}, {estado: "ASISTIO"} ,{estado: "FALTO"},
                                                        {estado: "CONFIRMADO"},{estado: "ATENDIDO"},{estado: "CERRADO"},{estado: "AUSENTE"}],inicio : {$gt : iso1, $lt : iso2}});

                            //QUE SE QUIERA METER SOLAPADO CON EL FIN DE UN TURNO
                            var condicion3 = Turnos.find({"profesional._id":profesionalId,$or: [ {estado: "OCUPADO"}, {estado: "ASISTIO"} ,{estado: "FALTO"},
                                                        {estado: "CONFIRMADO"},{estado: "ATENDIDO"},{estado: "CERRADO"},{estado: "AUSENTE"}],fin : {$gt : iso1, $lt : iso2}});

                            //SI NO SE SOLAPA CON NINGUN TURNO
                            if ((condicion1.count()===0) && (condicion2.count()===0) && (condicion3.count()===0)) {
                              
                              //PRIMER HORARIO
                              horaI = Number(horaInicio); //convierto la hora de string a number
                              minutosI = Number(minutosInicio); //convierto la hora de string a number
                              if ((horaI === apertura) && (minutosI === 0)){              
                                //TENGO QUE ENCONTRAR EL TOPE
                                var colTope = Turnos.findOne({"profesional._id":profesionalId, $or: [ {estado: "OCUPADO"}, {estado: "ASISTIO"} ,{estado: "FALTO"},
                                                        {estado: "CONFIRMADO"},{estado: "ATENDIDO"},{estado: "CERRADO"},{estado: "AUSENTE"}],inicio : {$gte : iso2,$lte:fcierre}},{sort: {inicio: 1}});  
                                //NO ENCUENTRA UN TOPE ==> TOPE ES iso2
                                
                                //TIENE QUE HABER POR LO MENOS UN TURNO QUE HAGA DE TOPE                           
                                var tope = colTope.inicio;
                                var base = iso1;

                                if ((base.getTime() === iso1.getTime()) && (tope.getTime() === iso2.getTime())){
                                    
                                  var difTurno = diferenciaMinutos(iso1, iso2);
                                  Turnos.insert({inicio:iso1, fin:iso2, duracion: difTurno, estado:"OCUPADO",importe:imp, tratamientos:trat, profesional:prof, paciente: pac ,motivo:mot}); //TURNO 
                                }
                                else{
                                    
                                  var difTurno = diferenciaMinutos(iso1, iso2);
                                  Turnos.insert({inicio:iso1, fin:iso2, duracion: difTurno, estado:"OCUPADO",importe:imp, tratamientos:trat, profesional:prof, paciente: pac ,motivo:mot}); //TURNO
                                   
                                  if ( iso2.getTime() !== tope.getTime() ){
                                    var difDespues = diferenciaMinutos(iso2, tope);
                                    Turnos.insert({inicio:iso2, fin:tope, duracion: difDespues, estado:"LIBRE", profesional:prof});//DESPUES                              
                                  }
                                }                
                              }
                              //A BUSCAR LA BASE Y EL TOPE
                              else{
                                //RECUPERO EL MENOR DE LA FECHA FIN QUE SE APROXIMA A iso1
                                var colBase = Turnos.findOne({"profesional._id":profesionalId,$or: [ {estado: "OCUPADO"}, {estado: "ASISTIO"} ,{estado: "FALTO"},
                                                        {estado: "CONFIRMADO"},{estado: "ATENDIDO"},{estado: "CERRADO"},{estado: "AUSENTE"}],inicio : {$gte : fapertura, $lte : fcierre},fin : {$lte : iso1}},{sort: {inicio: -1}});
                                
                                //*********************************************************
                                if (colBase) {                 
                                  var base = colBase.fin;
                                  //RECUPERO EL MAYOR DE LA FECHA INICIO QUE SE APROXIMA A iso2
                                  var colTope = Turnos.findOne({"profesional._id":profesionalId,inicio : {$gte : fapertura, $lte : fcierre},$or: [ {estado: "OCUPADO"}, {estado: "ASISTIO"} ,{estado: "FALTO"},
                                                        {estado: "CONFIRMADO"},{estado: "ATENDIDO"},{estado: "CERRADO"},{estado: "AUSENTE"}],inicio : {$gte : iso2, $lte:fcierre}},{sort: {inicio: 1}});
                                  
                                  if (colTope)
                                      {var tope = colTope.inicio} 
                                  else{
                                    var tope = fcierre}
                                  
                                  if ((base.getTime() === iso1.getTime()) && (tope.getTime() === iso2.getTime())){                                      
                                    var difTurno = diferenciaMinutos(iso1, iso2);
                                    Turnos.insert({inicio:iso1, fin:iso2, duracion: difTurno, estado:"OCUPADO", importe:imp,tratamientos:trat, profesional:prof, paciente: pac ,motivo:mot}); //TURNO 
                                  }
                                  else{                    
                                    
                                    if ( base.getTime() !== iso1.getTime() ){
                                      var difAntes = diferenciaMinutos(base, iso1);
                                      Turnos.insert({inicio:base, fin:iso1, duracion: difAntes, estado:"LIBRE", profesional:prof});//ANTES 
                                    } 
                                      
                                    var difTurno = diferenciaMinutos(iso1, iso2);
                                    Turnos.insert({inicio:iso1, fin:iso2, duracion: difTurno, estado:"OCUPADO", importe:imp,tratamientos:trat, profesional:prof, paciente: pac ,motivo:mot}); //TURNO                    
                                    
                                    if ( iso2.getTime() !== tope.getTime() && (iso2 <= fcierre)){
                                      var difDespues = diferenciaMinutos(iso2, tope);
                                      Turnos.insert({inicio:iso2, fin:tope, duracion: difDespues, estado:"LIBRE", profesional:prof});//DESPUES
                                    }
                                  }                
                                }              
                                else{ //LA BASE ES LA APERTURA DEL CONSULTORIO
                                  
                                  base = fapertura;
                                  var colTope = Turnos.findOne({"profesional._id":profesionalId,$or: [ {estado: "OCUPADO"}, {estado: "ASISTIO"} ,{estado: "FALTO"},
                                                        {estado: "CONFIRMADO"},{estado: "ATENDIDO"},{estado: "CERRADO"},{estado: "AUSENTE"}],inicio : {$gte : fapertura, $lte : fcierre},inicio : {$gte : iso2}},{sort: {inicio: 1}});
                                  var tope = colTope.inicio;
                                  if ((base.getTime() === iso1.getTime()) && (tope.getTime() === iso2.getTime())){
                                      
                                    var difTurno = diferenciaMinutos(iso1, iso2);
                                    Turnos.insert({inicio:iso1, fin:iso2, duracion: difTurno, estado:"OCUPADO",importe:imp, tratamientos:trat, profesional:prof, paciente: pac ,motivo:mot}); //TURNO 
                                  }
                                  else{                    

                                    if ( base.getTime() !== iso1.getTime() ){                        
                                      var difAntes = diferenciaMinutos(base, iso1);
                                      Turnos.insert({inicio:base, fin:iso1, duracion: difAntes, estado:"LIBRE", profesional:prof});//ANTES 
                                    }
                                      
                                    var difTurno = diferenciaMinutos(iso1, iso2);
                                    Turnos.insert({inicio:iso1, fin:iso2, duracion: difTurno, estado:"OCUPADO",importe:imp, tratamientos:trat, profesional:prof, paciente: pac ,motivo:mot}); //TURNO                  
                                    
                                    if ( (iso2.getTime() !== tope.getTime()) && (tope <= fcierre)){
                                      var difDespues = diferenciaMinutos(iso2, tope);
                                      Turnos.insert({inicio:iso2, fin:tope, duracion: difDespues, estado:"LIBRE", profesional:prof});//DESPUES   
                                    }
                                  }
                                  
                                }
                              }

                              //TENGO QUE ELIMINAR EL TURNO LIBRE DONDE SE INSERTO EL TURNO            
                              var turnoLibre = Turnos.findOne({"profesional._id":profesionalId,"estado":"LIBRE",inicio : {$lte : iso1}, fin : {$gte : iso2}}); 
                              Turnos.remove({_id: turnoLibre._id});  

                              Template.instance().selPaciente.set(null);
                              Template.instance().selTratamiento.set(null);       
                              
                              
                              $('#modalIngresoTurno').modal('hide'); //CIERRO LA VENTANA MODAL
                            }
                            else{
                              $('#modalTurnoOcupado').modal('show');            
                            }
                          }
                        };
              }
              else{ //NO INGRESO TRATAMIENTO
                $('#modalNoIngresoTratamiento').modal('show');
              }
        } 
      //}  
  },

});

Template.sacarturno.onRendered(function() {
    //const instance = Template.instance();

    $('#datetimepicker2').datetimepicker({
        inline: true,
        format:'L', 
        locale: 'es',       
    });    

    //---------------------BORRO LOS DATOS DE LA VENTANAS MODALES-------------------  
    $("#modalIngresoPaciente").on("hidden.bs.modal", function(){        
        $(this).find("input,textarea,select").val('').end();
    });
    $("#modalIngresoTurno").on("hidden.bs.modal", function(){        
        $(this).find("input,textarea,select").val('').end();
    });

    $("#modalBuscarTurnos").on("hidden.bs.modal", function(){        
        $(this).find("input,textarea,select").val('').end();
    });

    $("#modalIngresoSobreTurno").on("hidden.bs.modal", function(){        
        $(this).find("input,textarea,select").val('').end();
    });

    $("#modalInfoPaciente").on("hidden.bs.modal", function(){        
        $(this).find().val('').end();
    });
    
    $('#multiple').multiselect();

    Meteor.typeahead.inject();    
});