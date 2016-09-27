import { Meteor } from 'meteor/meteor';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';

// ----- Group -----

var AppRoutes = FlowRouter.group({
    triggersEnter: [ function(){
        // Redirect to index when user doesn't exist
        if (!Meteor.userId()) {
            FlowRouter.go('account.login');
        }
    }],
    triggersExit: [ function(){
        // Do something
    }]
});


// ----- Routes -----

AppRoutes.route( '/chat', {
    name: 'app.chat',
    action: function (params) {
        BlazeLayout.render("layoutApp", { content: "chat" });
    }
});