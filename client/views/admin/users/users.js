Template.adminUserList.helpers({
    users: function(){return Meteor.users.find()},
    emails: function(){return _.collect(this.emails, function(each){return each.address + '\n' })}
})