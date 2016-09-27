import { Meteor } from 'meteor/meteor';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { Accounts } from 'meteor/accounts-base';
import { Tracker } from 'meteor/tracker';

Accounts.onLogin(function () {
	FlowRouter.go('app.chat');
});

Tracker.autorun(function () {
	// Redirect to login when user logout
	if (!Meteor.userId()) {
		var routeName = FlowRouter.getRouteName();
		if (routeName && routeName.indexOf('app') !== -1) {
			FlowRouter.go('account.login');
		}
	}
});

FlowRouter.notFound = {
    action: function() {
    	if (Meteor.userId()) {
    		FlowRouter.go('app.chat');
    	} else {
    		FlowRouter.go('account.login');
    	}
    }
};