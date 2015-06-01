Accounts.onCreateUser(function(options, user){
    user.profile = options.profile;
    user.profile.account = 100
    return user;
})