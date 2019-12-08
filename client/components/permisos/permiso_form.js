import { Permisos } from '../../../lib/collections/permisos';
import { Router } from 'meteor/iron:router';
import SimpleSchema from 'simpl-schema';
// Required AutoForm setup
SimpleSchema.extendOptions(['autoform']);



Template.permisoForm.helpers({
	formCollection() {
		return Permisos;
	}
})

Template.permisoForm.onCreated(function()
{
	AutoForm.addHooks(['permisoForm'],{
		onSuccess: function(operation, result, template)
		{
			Router.go('/permisos');
		}
	});
})