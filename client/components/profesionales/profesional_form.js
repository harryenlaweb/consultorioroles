import { Profesionales } from '../../../lib/collections/profesionales';
import { Router } from 'meteor/iron:router';
import SimpleSchema from 'simpl-schema';
// Required AutoForm setup
SimpleSchema.extendOptions(['autoform']);



Template.profesionalForm.helpers({
	formCollection() {
		return Profesionales;
	},
})

Template.profesionalForm.onCreated(function()
{
	AutoForm.addHooks(['profesionalForm'],{
		onSuccess: function(operation, result, template)
		{			
			Router.go('/profesionales');
		}
	});
})