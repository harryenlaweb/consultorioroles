import SimpleSchema from 'simpl-schema';

// Required AutoForm setup
SimpleSchema.extendOptions(['autoform']);

export const UsuariosConsultorio = new SimpleSchema({
	idUser: { type: String },
	email: { type: String,	label: 'Email' },
	mispermisos: { type: Array, optional: true, 
  		autoform: {type: "hidden"}   
  	},
  	'mispermisos.$': String,
	
});

