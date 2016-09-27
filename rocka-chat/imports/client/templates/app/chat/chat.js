import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Chats } from '/imports/api/chats/chats.collection.js';
import { Messages } from '/imports/api/messages/messages.collection.js';
import moment from 'moment';

// ----- Template -----
import './chat.html';


// ----- Events -----

Template.chat.onCreated(function () {
	this.chatActive = new ReactiveVar();
	this.friendChat = new ReactiveVar();


	var self = this;
    self.autorun(function() {
        self.subscribe('users.friends');
        self.subscribe('chats');
        self.subscribe('messages.friend', self.chatActive.get());
    });
});


Template.chat.onRendered(function () {

});

Template.chat.events({
	'click #userLogout'(event, instance) {
		event.preventDefault();
		Meteor.logout();
	},
	'click #listFriends a'(event, instance) {
		event.preventDefault();
		instance.friendChat.set(this);
		$('#ui_menu_profile').click();

		let chatActive = Chats.findOne({ usersIds: this._id });
		instance.chatActive.set(chatActive);

		instance.$('#openRightMenu').click();
		Meteor.setTimeout(function () {
			$('html, body').scrollTop($(document).height());
			Meteor.setTimeout(function () {
				instance.$('#message').focus();
			}, 300);
		}, 100);
	},
	'click #listLastChats a'(event, instance) {
		event.preventDefault();
		let friendId;
		this.usersIds.forEach(function (userId) {
			if (userId !== Meteor.userId()) {
				friendId = userId;
			}
		});
		instance.friendChat.set(Meteor.users.findOne(friendId));

		let chatActive = Chats.findOne({ usersIds: friendId });
		instance.chatActive.set(chatActive);

		let menuLeftOpened = instance.$('.menu.menu-left.in').length;
		if (menuLeftOpened) {
			instance.$('#openLeftMenu').click();
		}

		Meteor.setTimeout(function () {
			$('html, body').scrollTop($(document).height());
			Meteor.setTimeout(function () {
				instance.$('#message').focus();
			}, 300);
		}, 100);
	},
	'submit #chatForm'(event, instance) {
		event.preventDefault();

		let message = instance.$('#message').val().trim();
		if (message) {
			instance.$('#message').val('');
			Meteor.call('messages.insert', message, instance.friendChat.get(), function (error, result) {
				if (!error) {
					if (!instance.chatActive.get()) {
						instance.chatActive.set(Chats.findOne(result));
					}

					Meteor.setTimeout(function () {
						$('html, body').scrollTop($(document).height());
					});
				}
			});
		}
	},
	'click .delete-msg'(event, instance) {
		Meteor.call('messages.remove', this._id, function (error, result) {
			if (error) {
				console.log(error.reason);
			} else {
				console.log(result);
			}
		});
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
	friendChat() {
		const instance = Template.instance();
		return instance.friendChat.get();
	},
	chats() {
		return Chats.find({},{ sort: { updatedAt: -1 } });
	},
	getFriendDataChat(usersIds) {
		let friendId;
		usersIds.forEach(function (userId) {
			if (userId !== Meteor.userId()) {
				friendId = userId;
			}
		});
		return Meteor.users.findOne(friendId);
	},
	fromNowDate(date) {
		let formatDate = new moment(date);
		return formatDate.fromNow();
	},
	messages() {
		return Messages.find();
	},
	ownerMsg() {
		return this.ownerId === Meteor.userId();
	},
	msgDateFormat(date) {
		let formatDate = new moment(date);
		return formatDate.format('hh:mm');
	}
});
