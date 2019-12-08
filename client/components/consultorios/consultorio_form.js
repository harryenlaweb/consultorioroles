import { Consultorios } from '../../../lib/collections/consultorios';
import { Router } from 'meteor/iron:router';
import SimpleSchema from 'simpl-schema';
// Required AutoForm setup
SimpleSchema.extendOptions(['autoform']);



Template.consultorioForm.helpers({
	formCollection() {
		return Consultorios;
	}
})

Template.consultorioForm.onCreated(function()
{
	AutoForm.addHooks(['consultorioForm'],{
		onSuccess: function(operation, result, template)
		{
			Router.go('/consultorios');
		}
	});
})