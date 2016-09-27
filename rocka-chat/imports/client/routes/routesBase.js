import { Meteor } from 'meteor/meteor';
import { FlowRouter } from 'meteor/kadira:flow-router';

FlowRouter.notFound = {
    action: function() {
    	if (Meteor.userId()) {
    		FlowRouter.go('app.chat');
    	} else {
    		FlowRouter.go('account.login');
    	}
    }
};