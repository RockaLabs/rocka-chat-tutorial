import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { ReactiveDict } from 'meteor/reactive-dict';
import { ValidationsAccountForm } from '/imports/client/services/validationsAccountForm.js';


// ----- Template -----
import './login.html';

// ----- Events -----

Template.login.onCreated(function () {
	// Form vars
	this.formValues = new ReactiveDict();
	this.formErrors = new ReactiveDict();
	this.formIsValid = new ReactiveVar();
});


Template.login.onRendered(function () {

});

Template.login.events({
	'submit #loginForm'(event, instance) {
		event.preventDefault();
		instance.formValues.set('username', instance.$('#username').val().toLowerCase());
		instance.formValues.set('password', instance.$('#password').val());

		if (ValidationsAccountForm.validate(instance)) {
			Meteor.loginWithPassword(instance.formValues.get('username'), instance.formValues.get('password'), (err) => {
				if (err) {
					console.log(err.reason);
					instance.formErrors.set('form', err.reason);
				} else {
					console.log('User logged');
				}
			})
		} else {
			console.log('Error');
		}
	}
});


// ----- Helpers -----

Template.login.helpers({
	errors() {
		const instance = Template.instance();
		return {
			username: instance.formErrors.get('username'),
			password: instance.formErrors.get('password'),
			form: instance.formErrors.get('form'),
		};
	},
});
