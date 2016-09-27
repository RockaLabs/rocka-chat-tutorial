import { Meteor } from 'meteor/meteor';


if (Meteor.isServer) {
	// ----- Methods -----
	Meteor.publish('users.friends', function () {
	    return Meteor.users.find({}, { fields: { services: false } });
	});
}
