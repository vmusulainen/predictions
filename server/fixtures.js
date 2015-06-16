if (Events.find().count() == 0) {

    Accounts.createUser({
        email: 'admin@gmail.com',
        password: 'abc',
        username: 'admin',
        profile: {
            isAdmin: true,
            account: 100,
            created: new Date()
        }
    });

    Accounts.createUser({
        email: 'seller@gmail.com',
        password: 'abc',
        username: 'seller',
        profile: {
            isAdmin: false,
            account: 100,
            created: new Date()
        }
    });

    Accounts.createUser({
        email: 'buyer@gmail.com',
        password: 'abc',
        username: 'buyer',
        profile: {
            isAdmin: false,
            account: 100,
            created: new Date()
        }
    });

    var eventID;
    eventID = Events.insert({
        name: 'Выборы президента России 2018 г.',
        tradingStart: new Date('2017-01-11'),
        tradingEnd: new Date('2018-05-01'),
        date: new Date('2018-05-11'),
        state: Constants.Event.States.active

    });

    var predictionID;
    predictionID = Predictions.insert({
        eventID: eventID,
        name: 'Навальный станет президентом в 2018 г.',
        details: 'Детальные условия контракта',
        truly: undefined
    });

    Predictions.insert({
        eventID: eventID,
        name: 'Путин станет президентом в 2018 г.',
        details: 'Детальные условия контракта',
        truly: undefined
    });

}