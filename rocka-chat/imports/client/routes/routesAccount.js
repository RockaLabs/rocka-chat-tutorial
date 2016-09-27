import { Meteor } from 'meteor/meteor';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';


// ----- Group -----

var AccountRoutes = FlowRouter.group({
    triggersEnter: [ function(){
        // Do something
    }],
    triggersExit: [ function(){
        // Do something
    }]
});


// ----- Routes -----

AccountRoutes.route( '/login', {
    name: 'account.login',
    action: function (params) {
        BlazeLayout.render("layoutAccount", { content: "login" });
    }
});

AccountRoutes.route( '/register', {
    name: 'account.register',
    action: function (params) {
        BlazeLayout.render("layoutAccount", { content: "register" });
    }
});