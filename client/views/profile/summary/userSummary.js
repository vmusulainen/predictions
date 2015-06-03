Template.userSummary.helpers({
    balance: function () {
        return Meteor.user() && Meteor.user().profile.account;
    },
    deposites: function () {
        var result = 0;
        var deposites = Deposits.find({userID: Meteor.userId()});
        deposites.forEach(function (each) {
            result = result + each.sum
        });
        return result;
    }
});