Template.adminUserList.helpers({
    users: function () {
        return Meteor.users.find()
    },
    emails: function () {
        return _.collect(this.emails, function (each) {
            return each.address + '\n'
        })
    },
    created: function () {
        return this.profile.created
    },
    isAdmin: function () {
        console.log(this);
        return this.profile.isAdmin === true ? "true" : "false"
    }
})