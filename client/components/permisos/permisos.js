import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import { Permisos } from '../../../lib/collections/permisos';
import { Router } from 'meteor/iron:router';
import SimpleSchema from 'simpl-schema';
import { check } from 'meteor/check';
import { ReactiveVar } from 'meteor/reactive-var'

Template.permisos.onCreated(function(){     
  this.selPermisoEliminar = new ReactiveVar(null);
  this.selPermisoInfo = new ReactiveVar(null);
  this.selPermisoEditar = new ReactiveVar(null);
});


Template.permisos.helpers({
  searchAttributes() {
    return {
      placeholder: 'Buscar ...',
    };
  },
  
  permisoEliminar: function() {     
    return Template.instance().selPermisoEliminar.get();        
  },

  permisoInfo: function() {     
    return Template.instance().selPermisoInfo.get();        
  },

  permisoEditar: function() {     
    return Template.instance().selPermisoEditar.get();        
  },
});


Template.permisos.events({

  'click .modalPermisoInfo': function(event, template){        
      var permiso = Permisos.findOne({"_id":this._id});      
      Template.instance().selPermisoInfo.set(permiso);      
      $('#modalPermisoInfo').modal('show');
    }, 

	'click .modalRemovePermiso': function(event, template){		
    	var permiso = Permisos.findOne({"_id":this._id});	    
	    Template.instance().selPermisoEliminar.set(permiso);
	    $('#modalEliminarPermiso').modal('show');
  	},

  'click ._remove': function(event, template){ 
	    var permiso = Template.instance().selPermisoEliminar.get();
	    Meteor.call('permiso.remove',permiso._id);
	    $('#modalEliminarPermiso').modal('hide');
	},

  //----------------SELECT DIA DEL CALENDARIO -------------------
  /*'dp.change #datetimepicker2': function(event, instance) {    
    var eleccion = event.date._d;    
    instance.selDia.set(eleccion); 
    var d = Template.instance().selDia.get();    
  },*/

  

  'click .modalPermisoEditar': function(event, template){   
      var permiso = Permisos.findOne({"_id":this._id});      
      Template.instance().selPermisoEditar.set(permiso);
      $('#modalPermisoEditar').modal('show');
    }, 

  'submit #formModificarPermiso':function(event) {
      // Prevent default browser form submit
      event.preventDefault();

      // Get value from form element
      const target = event.target;            

      var permiso = Template.instance().selPermisoEditar.get();  

      Permisos.update({_id:permiso._id},{$set: {
        nombre : target.nombre.value,        
        descripcion : target.descripcion.value,            
      }});
      

      $('#modalPermisoEditar').modal('hide'); //CIERRO LA VENTANA MODAL
      
  },


})