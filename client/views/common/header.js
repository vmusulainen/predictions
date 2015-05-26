Template.header.helpers({
    isAdmin: function () {
        var user = Meteor.user();
        return user != null && user.profile.isAdmin
    },
    username: function () {
        return Meteor.user().emails[0].address
    }
});

Template.header.events({
    'click #logout': function () {
        Meteor.logout()
    }
})