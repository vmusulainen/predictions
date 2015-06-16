describe('Accounts', function () {
    'use strict';
    beforeEach(function () {
/*        Meteor.users.find().forEach(function (each) {
            Meteor.users.remove(each)
        });*/
    });

    afterEach(function () {

    });

    describe('Account creation', function () {
        it('should append 100 credits on user account', function () {
            var userId =  Accounts.createUser({
                email: 'user@gmail.com',
                password: 'password'
            });
            Meteor.users.insert({username: 'test'});
            expect(Meteor.users.findOne({_id: userId}).profile.account).toBe(100);

        });
    });


});