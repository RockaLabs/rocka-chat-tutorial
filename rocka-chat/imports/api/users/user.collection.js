import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

Accounts.onCreateUser(function (options, user) {
	user.createdAt = new Date();
	user.updatedAt = new Date();
	user.profile   = options.profile;

	// Get index
	var lastUser = Meteor.users.findOne({}, { sort: { 'profile.index': -1}});
	user.profile.index = (lastUser)? lastUser.profile.index + 1 : 1;

	return user;
});