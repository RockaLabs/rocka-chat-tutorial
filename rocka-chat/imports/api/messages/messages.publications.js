import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Messages } from '/imports/api/messages/messages.collection.js';

if (Meteor.isServer) {
	// ----- Publications -----
	Meteor.publish('messages.friend', function (chatActive) {
		if (chatActive) {
	    	return [Messages.find({ chatId: chatActive._id })];
		}
		this.ready();
	});
}