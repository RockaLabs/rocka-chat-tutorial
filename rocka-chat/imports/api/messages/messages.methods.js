import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Chats } from '/imports/api/chats/chats.collection.js';
import { Messages } from '/imports/api/messages/messages.collection.js';

if (Meteor.isServer) {
	// ----- Methods -----
	Meteor.methods({
		'messages.insert'(text, friendChat) {
		    // Make sure the user is logged in before inserting a task
		    if (!Meteor.userId()) {
				throw new Meteor.Error('not-authorized');
		    }

		    check(text, String);
		    check(friendChat, {
		    	_id: String,
		    	username: String,
		    	createdAt: Date,
		    	updatedAt: Date,
		    	profile: Object,
		    });

		    // Get chatId && create new chat if doesn't exist
		    let chat = Chats.findOne({
		    	$and: [
		    		{ usersIds: Meteor.userId() },
		    		{ usersIds: friendChat._id }
		    	]
		    });

		    let chatId;
		   	if (chat) {
		   		chatId = chat._id;
		   	} else {
		   		chatId = Chats.insert({
		   			usersIds: [Meteor.userId(), friendChat._id],
		   			lastMsg: text,
		   			createdAt: new Date(),
		   			updatedAt: new Date()
		   		});
		   	}

		   	Chats.update(chatId, { $set: { lastMsg: text, updatedAt: new Date() } });

		   	// ----- Create Message -----
		   	let messageId = Messages.insert({
		   		chatId: chatId,
		   		ownerId: Meteor.userId(),
		   		text: text,
		   		createdAt: new Date(),
			   	updatedAt: new Date()
		   	});

		   	return chatId;
		},
		'messages.remove'(messageId) {
		    // Make sure the user is logged in before inserting a task
		    if (!Meteor.userId()) {
				throw new Meteor.Error('not-authorized');
		    }

		    check(messageId, String);

			let result = Messages.remove({ _id: messageId, ownerId: Meteor.userId() });
		   	return result;
		},
	});
}