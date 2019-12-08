import { Meteor } from 'meteor/meteor';
import { Random } from 'meteor/random'
import { Usuarios } from '../lib/collections/usuarios';

Meteor.startup(() => {
  // code to run on server at startup
});

//AL CREAR UN USUARIO DESDE INTERNET LE ASIGNA UN ROL "internet"
/*Accounts.onCreateUser(function(options, user) {

    user.profile = options.profile ? options.profile : {};
    //user.roles = ['internet'];
    return user
  

})*/


//HABILITAR/DESHABILITAR LA CREACION DE CUENTAS
Accounts.config({
  forbidClientAccountCreation: false
});

//ESTO ES PARA CREAR UN USUARIO ADMINISTRADOR
//TODOS LOS OTROS USUARIOS SON USUARIOS NORMALES Y SOLO PUEDEN CREAR TURNOS COMUNES
/*var users = [
      //{name:"Normal User",email:"normal@example.com",roles:[]},
      //{name:"View-Secrets User",email:"view@example.com",roles:['view-secrets']},
      //{name:"Manage-Users User",email:"manage@example.com",roles:['manage-users']},
      {name:"Admin User",email:"admin@sacarunturno.com",roles:['admin']}
    ];

  _.each(users, function (user) {
    var id;

    id = Accounts.createUser({
      email: user.email,
      password: "aT40fg2ne7",
      profile: { name: user.name }
    });

    Roles.addUsersToRoles(id, 'adminTotal');

   

  });*/


// Genera una lista de tareas para cada nuevo usuario 
//---CON ESTE CODIGO GENERO UN USER Y LO INSERTO EN LA COLECCION DE USUARIOS PARA LUEGO A TRAVES DEL MENU DE LA PAGINA ASIGNARLE PERMISOS Y EL CONSULTORIO DONDE VA A TRABAJAR


var idUsuario;


idUsuario = Accounts.onCreateUser((options, user) => {
  // Generate a user ID ourselves // Generamos una identificación de usuario nosotros mismos 
  user._id = Random.id(); // Need to add the `random` package // Necesito agregar el paquete `random` 
  //idUsuario = user._id;
  // Use the user ID we generated // Usa la identificación de usuario que generamos 
  //Lists.createListForUser(user._id);
  // Don't forget to return the new user object at the end! // ¡No olvides devolver el nuevo objeto de usuario al final! 

  //roles:['internet'];
  //consultorio:['todos']; 
  Usuarios.insert({idUser:user._id, email: user.emails[0].address});

  //Roles.addUsersToRoles(user._id, 'internet', Roles.GLOBAL_GROUP);
  return user;
  
});



//Roles.addUsersToRoles(idUsuario, 'adminTotal');




//Roles.addUsersToRoles(idUsuario, 'internet', 'default-group');



/*var users = [
      {name:"Normal User",email:"normal@example.com",roles:[]},
      {name:"View-Secrets User",email:"view@example.com",roles:['view-secrets']},
      {name:"Manage-Users User",email:"manage@example.com",roles:['manage-users']},
      {name:"Admin User",email:"admin@example.com",roles:['admin']}
    ];

_.each(users, function (user) {
  var id;

  id = Accounts.createUser({
    email: user.email,
    password: "apple1",
    profile: { name: user.name }
  });

  if (user.roles.length > 0) {
    // Need _id of existing user record so this call must come
    // after `Accounts.createUser` or `Accounts.onCreate`
    Roles.addUsersToRoles(id, user.roles, 'default-group');
  }

});*/

