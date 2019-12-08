import { Router } from 'meteor/iron:router';
import { Meteor, User } from 'meteor/meteor';
import { Tratamientos, TratamientosIndex } from '../lib/collections/tratamientos';
import { Profesionales, ProfesionalesIndex } from '../lib/collections/profesionales';
import { Turnos, TurnosIndex } from '../lib/collections/turnos';
import { Pacientes, PacientesIndex } from '../lib/collections/pacientes';
import { Obras, ObrasIndex } from '../lib/collections/obras';
import { Consultorios, ConsultoriosIndex } from '../lib/collections/consultorios';
import { Permisos, PermisosIndex } from '../lib/collections/permisos';
import { Usuarios, UsuariosIndex } from '../lib/collections/usuarios';

Router.onBeforeAction(function () {  	
	
		if (!Meteor.userId()) {    
		    Router.go('home');   
		/*} else{
			if(Router.current().route.getName() === 'home'){ Router.go('calendar')}
		}*/
		}else{ 
			var usuarioIntenet = Roles.userIsInRole(Meteor.userId(),['internet']);			
			
			// SI NO ES UN USUARIO DEL SISTEMA LO LLEVA A SACAR UN TURNO
			if (usuarioIntenet){				
		    	if(Router.current().route.getName() === 'home'){ Router.go('misdatos');}

			}else{ //SI ES UN USUARIO DEL SISTEMA LO LLEVA AL CALENDARIO
				 //Router.go('calendar'); 
				if(Router.current().route.getName() === 'home'){ Router.go('calendar');}
			}
		}
		this.next(); 
	//}  
  	
  
});



Router.configure({
	layoutTemplate: 'baseLayout',
	waitOn:function() {
			 	return [
				 	function() { return Meteor.subscribe('tratamientos'); },
				 	function() { return Meteor.subscribe('profesionales'); },
				 	function() { return Meteor.subscribe('turnos'); },
				 	function() { return Meteor.subscribe('pacientes'); },
				 	function() { return Meteor.subscribe('tratamientosProfesional'); },
				 	function() { return Meteor.subscribe('obras'); },
				 	function() { return Meteor.subscribe('consultorios'); },
				 	function() { return Meteor.subscribe('permisos'); },
				 	function() { return Meteor.subscribe('usuarios'); },
				 	function() { return Meteor.subscribe('usersGoogle'); },

			 	];			 	
	},	
});

Router.route('/', {
  name: 'home'
});


//-------------------------------SECCION TRATAMIENTOS----------------------------------
Router.route('/tratamientos', function(){
	var user;      
    user = Meteor.user();
	let esAdminTotal = Roles.userIsInRole(user._id,['adminTotal']);
	let esAdminConsultorio = Roles.userIsInRole(user._id,['adminConsultorio']);
	let esPaciente = Roles.userIsInRole(user._id,['paciente']); //--------------------------SACAR ESTA LINEA -----------------
	let mostrar = esAdminTotal || esAdminConsultorio || esPaciente;

	
		if (mostrar){			
			this.render('tratamientos',{
				data: {
					tratamientos(){
						return TratamientosIndex;
					}
				}
			})
		}	
		else{Router.go('home')}			
}, {
	name: 'tratamientos'
})

Router.route('/tratamiento_form', function(){
	var user;      
    user = Meteor.user()
	let esAdminTotal = Roles.userIsInRole(user._id,['adminTotal']);
	let esAdminConsultorio = Roles.userIsInRole(user._id,['adminConsultorio']);
	let mostrar = esAdminTotal || esAdminConsultorio;	
		if (mostrar){this.render('tratamiento_form')}	
		else{Router.go('home')}	
},{
	name: 'tratamiento_form'
})

//-------------------------------SECCION PROFESIONALES----------------------------------

Router.route('/profesionales', function(){
	var user;      
    user = Meteor.user()
	let esAdminTotal = Roles.userIsInRole(user._id,['adminTotal']);
	let esAdminConsultorio = Roles.userIsInRole(user._id,['adminConsultorio']);
	let mostrar = esAdminTotal || esAdminConsultorio;

	
		if (mostrar){			
			this.render('profesionales',{
				data: {
					profesionales(){
						return ProfesionalesIndex;
					}
				}
			})
		}	
		else{Router.go('home')}			
}, {
	name: 'profesionales'
})

Router.route('/profesional_form', function(){
	var user;      
    user = Meteor.user()
	let esAdminTotal = Roles.userIsInRole(user._id,['adminTotal']);
	let esAdminConsultorio = Roles.userIsInRole(user._id,['adminConsultorio']);
	let mostrar = esAdminTotal || esAdminConsultorio;	
		if (mostrar){this.render('profesional_form')}	
		else{Router.go('home')}	
},{
	name: 'profesional_form'
})


Router.route('/profesional_tratamiento/:_id', function(){
	let profesional = Profesionales.findOne({_id: this.params._id});
	var user = Meteor.user()
	let esAdminTotal = Roles.userIsInRole(user._id,['adminTotal']);
	let esAdminConsultorio = Roles.userIsInRole(user._id,['adminConsultorio']);
	let mostrar = (esAdminTotal || esAdminConsultorio) && profesional;
	
		if (mostrar){			
			this.render('profesional_tratamiento',{
				data: {
					profesional: profesional,
					tratamientos(){
						return TratamientosIndex;
					}
				}
			})
		}	
		else{Router.go('home')}			
}, {
	name: 'profesional_tratamiento'
})

Router.route('/profesional_horarios/:_id', function(){
	let profesional = Profesionales.findOne({_id: this.params._id});
	var user = Meteor.user();
    let usuarioL = Usuarios.findOne({idUser: user._id});
    let cons = Consultorios.findOne({nombre: usuarioL.consultorio});
	let esAdminTotal = Roles.userIsInRole(user._id,['adminTotal']);
	let esAdminConsultorio = Roles.userIsInRole(user._id,['adminConsultorio']);
	let mostrar = esAdminTotal || esAdminConsultorio;

	
		if (mostrar){			
			this.render('profesional_horarios',{
				data: {
					profesional:profesional,
					consultorio:cons
				}
			})
		}	
		else{Router.go('home')}			
}, {
	name: 'profesional_horarios'
})


//-------------------------------SECCION CALENDARIO----------------------------------

Router.route('/calendar', function(){
	var user = Meteor.user();
    let usuarioL = Usuarios.findOne({idUser: user._id});
    let cons = Consultorios.findOne({nombre: usuarioL.consultorio});
	let esAdminTotal = Roles.userIsInRole(user._id,['adminTotal']);
	let esAdminConsultorio = Roles.userIsInRole(user._id,['adminConsultorio']);
	let mostrar = esAdminTotal || esAdminConsultorio;
	//let mostrar = true;

	
		if (mostrar){			
			this.render('calendar',{
				data: {
					profesionales(){
						return ProfesionalesIndex;
					},
					tratamientos(){
						return TratamientosIndex;
					},
					turnos(){
						return TurnosIndex;
					},
					pacientes(){
						return PacientesIndex;
					},
					consultorio:cons
				}
			})
		}	
		else{Router.go('home')}			
}, {
	name: 'calendar'
})



//-------------------------------SECCION TURNOS----------------------------------

Router.route('/turnos',{
	name: 'turnos',
	data: {
		turnos(){
			return TurnosIndex;
		}
	}
})

Router.route('/turno_form', {
	name: 'turno_form',
	data: {		
		turnos(){
			return Turnos;
		}
	}
})

Router.route('/turno_tratamiento/:_id', function(){
	let turno = Turnos.findOne({_id: this.params._id});
	if (!turno){
		Router.go('turnos');
	}
	else{
		this.render('turno_tratamiento',{
			data: {
				turno: turno,
				tratamientos(){
					return TratamientosIndex;
				},
				pacientes(){
					return PacientesIndex;
				},
			}
		})
	}
}, {
	name: 'turno_tratamiento',	
})

//-------------------------------SECCION PACIENTES----------------------------------
Router.route('/pacientes', function(){
	var user = Meteor.user()
	let esAdminTotal = Roles.userIsInRole(user._id,['adminTotal']);
	let esAdminConsultorio = Roles.userIsInRole(user._id,['adminConsultorio']);
	let daTurnos = Roles.userIsInRole(user._id,['turnos']);	
	let mostrar = esAdminTotal || esAdminConsultorio || daTurnos;
	
		if (mostrar){			
			this.render('pacientes',{
				data: {
					pacientes(){
						return PacientesIndex;
					}
				}
			})
		}	
		else{Router.go('home')}			
}, {
	name: 'pacientes'
})

Router.route('/paciente_form', function(){
	var user = Meteor.user()
	let esAdminTotal = Roles.userIsInRole(user._id,['adminTotal']);
	let esAdminConsultorio = Roles.userIsInRole(user._id,['adminConsultorio']);
	let daTurnos = Roles.userIsInRole(user._id,['turnos']);	
	let mostrar = esAdminTotal || esAdminConsultorio || daTurnos;
		
		if (mostrar){this.render('paciente_form')}	
		else{Router.go('home')}	
},{
	name: 'paciente_form'
})


//-------------------------------SECCION OBRAS----------------------------------


Router.route('/obras', function(){
	var user = Meteor.user()
	let esAdminTotal = Roles.userIsInRole(user._id,['adminTotal']);
	let esAdminConsultorio = Roles.userIsInRole(user._id,['adminConsultorio']);
	let mostrar = esAdminTotal || esAdminConsultorio;

	
		if (mostrar){			
			this.render('obras',{
				data: {
					obras(){
						return ObrasIndex;
					}
				}
			})
		}	
		else{Router.go('home')}			
}, {
	name: 'obras'
})

Router.route('/obra_form', function(){
	var user = Meteor.user()
	let esAdminTotal = Roles.userIsInRole(user._id,['adminTotal']);
	let esAdminConsultorio = Roles.userIsInRole(user._id,['adminConsultorio']);
	let mostrar = esAdminTotal || esAdminConsultorio;	
		if (mostrar){this.render('obra_form')}	
		else{Router.go('home')}	
},{
	name: 'obra_form'
})


//-------------------------------SECCION CONSULTORIOS----------------------------------
Router.route('/consultorios', function(){
	var user = Meteor.user()
	let esAdminTotal = Roles.userIsInRole(user._id,['adminTotal']);	
	let mostrar = esAdminTotal;
	
		if (mostrar){			
			this.render('consultorios',{
				data: {
					consultorios(){
						return ConsultoriosIndex;
					}
				}
			})
		}	
		else{Router.go('home')}			
}, {
	name: 'consultorios'
})

Router.route('/consultorio_form', function(){
	var user = Meteor.user()
	let esAdminTotal = Roles.userIsInRole(user._id,['adminTotal']);	
	let mostrar = esAdminTotal;	
		if (mostrar){this.render('consultorio_form')}	
		else{Router.go('home')}	
},{
	name: 'consultorio_form'
})


Router.route('/consultorio_usuario/:_id', function(){
	let consultorio = Consultorios.findOne({_id: this.params._id});
	var user = Meteor.user()
	let esAdminTotal = Roles.userIsInRole(user._id,['adminTotal']);
	let mostrar = esAdminTotal && consultorio;
	
		if (mostrar){			
			this.render('consultorio_usuario',{
				data: {
					consultorio: consultorio,
					usuarios(){
						return UsuariosIndex;
					}
				}
			})
		}	
		else{Router.go('consultorios')}			
}, {
	name: 'consultorio_usuario'
})


//-------------------------------SECCION PERMISOS (ROLES)----------------------------------
Router.route('/permisos', function(){
	var user = Meteor.user()
	let esAdminTotal = Roles.userIsInRole(user._id,['adminTotal']);	
	let mostrar = esAdminTotal;
	
		if (mostrar){			
			this.render('permisos',{
				data: {
					permisos(){
						return PermisosIndex;
					}
				}
			})
		}	
		else{Router.go('home')}			
}, {
	name: 'permisos'
})


Router.route('/permiso_form', function(){
	var user = Meteor.user()
	let esAdminTotal = Roles.userIsInRole(user._id,['adminTotal']);	
	let mostrar = esAdminTotal;	
		if (mostrar){this.render('permiso_form')}	
		else{Router.go('home')}	
},{
	name: 'permiso_form'
})

Router.route('/permiso_usuario/:_id', function(){
	let permiso = Permisos.findOne({_id: this.params._id});
	var user = Meteor.user()
	let esAdminTotal = Roles.userIsInRole(user._id,['adminTotal']);
	let mostrar = esAdminTotal && permiso;
	
		if (mostrar){			
			this.render('permiso_usuario',{
				data: {
					permiso: permiso,
					usuarios(){
						return UsuariosIndex;
					}
				}
			})
		}	
		else{Router.go('consultorios')}			
}, {
	name: 'permiso_usuario'
})

//-------------------------------SECCION HORARIOS DEL CONSULTORIO----------------------------------

Router.route('/horarios', function(){
	var user = Meteor.user();
    let usuarioL = Usuarios.findOne({idUser: user._id});
    let cons = Consultorios.findOne({nombre: usuarioL.consultorio});
	let esAdminTotal = Roles.userIsInRole(user._id,['adminTotal']);
	let esAdminConsultorio = Roles.userIsInRole(user._id,['adminConsultorio']);
	let mostrar = esAdminTotal || esAdminConsultorio;

	
		if (mostrar){			
			this.render('horarios',{
				data: {
					consultorio:cons
				}
			})
		}	
		else{Router.go('home')}			
}, {
	name: 'horarios'
})

//-------------------------SECCION SACAR TURNOS DE UN PACIENTE -----------------------
Router.route('/misdatos',{
	name: 'misdatos',
	data: {
		turnos(){
			return TurnosIndex;
		},
		usersGoogle(){
			return User;
		}
	}
})

Router.route('/sacarturno', function(){
	/*var user = Meteor.user();
    let esInternet = Roles.userIsInRole(user._id,['internet']);
    if (esInternet){
    	let cons = Consultorios.findOne({nombre: "Crecer Odontologia"});	
    }*/

    let cons = Consultorios.findOne();	
    //let usuarioL = Usuarios.findOne({idUser: user._id});
    //let cons = Consultorios.findOne({nombre: usuarioL.consultorio});
	//let esAdminTotal = Roles.userIsInRole(user._id,['adminTotal']);
	//let esAdminConsultorio = Roles.userIsInRole(user._id,['adminConsultorio']);
	//let mostrar = esAdminTotal || esAdminConsultorio;
	let mostrar = true;

	
		if (mostrar){			
			this.render('sacarturno',{
				data: {
					profesionales(){
						return ProfesionalesIndex;
					},
					tratamientos(){
						return TratamientosIndex;
					},
					turnos(){
						return TurnosIndex;
					},
					pacientes(){
						return PacientesIndex;
					},
					consultorio:cons
				}
			})
		}	
		else{Router.go('misdatos')}			
}, {
	name: 'sacarturno'
})