Accounts.onCreateUser(function(options, user){
    user.profile = options.profile;
    user.profile.account = 100;
    user.profile.isAdmin = options.profile.isAdmin || false;
    user.profile.created = new Date();
    return user;
})