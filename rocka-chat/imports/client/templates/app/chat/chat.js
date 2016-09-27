import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

// ----- Template -----
import './chat.html';


// ----- Events -----

Template.chat.onCreated(function () {
	var self = this;
    self.autorun(function() {
        self.subscribe('users.friends');
    });
});


Template.chat.onRendered(function () {

});

Template.chat.events({
	'click #userLogout'(event, instance) {
		event.preventDefault();
		Meteor.logout();
	},
});


// ----- Helpers -----

Template.chat.helpers({
	myUserData() {
		return Meteor.user();
	},
	friends() {
		return Meteor.users.find({ _id: { $ne: Meteor.userId() } });
	},
});
