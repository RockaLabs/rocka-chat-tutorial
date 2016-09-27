import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { ReactiveDict } from 'meteor/reactive-dict';
import { Accounts } from 'meteor/accounts-base';

import { ValidationsAccountForm } from '/imports/client/services/validationsAccountForm.js';

import faker from 'faker';

// ----- Template -----
import './register.html';

// ----- Events -----

Template.register.onCreated(function () {
	// Form vars
	this.formValues = new ReactiveDict();
	this.formErrors = new ReactiveDict();
	this.formIsValid = new ReactiveVar();
});


Template.register.onRendered(function () {

});

Template.register.events({
	'submit #registerForm'(event, instance) {
		event.preventDefault();
		instance.formValues.set('username', instance.$('#username').val().toLowerCase());
		instance.formValues.set('password', instance.$('#password').val());

		if (ValidationsAccountForm.validate(instance)) {
			let userData = {
				username: instance.formValues.get('username'),
				password: instance.formValues.get('password'),
				profile: {
					picture: faker.internet.avatar()
				},
			};
			// Creating user
			Accounts.createUser(userData, (err) => {
				if (err) {
					console.log(err.reason);
					instance.formErrors.set('form', err.reason);
				} else {
					console.log('User created');
				}
			})
		} else {
			console.log('Error');
		}
	}
});


// ----- Helpers -----

Template.register.helpers({
	errors() {
		const instance = Template.instance();
		return {
			username: instance.formErrors.get('username'),
			password: instance.formErrors.get('password'),
			form: instance.formErrors.get('form'),
		};
	},
});
