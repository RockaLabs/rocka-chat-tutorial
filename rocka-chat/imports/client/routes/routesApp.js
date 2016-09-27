import { Meteor } from 'meteor/meteor';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';

// ----- Group -----

var AppRoutes = FlowRouter.group({
    triggersEnter: [ function(){
        // Do something
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