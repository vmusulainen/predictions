if (Events.find().count() == 0) {

    var userID = Accounts.createUser({
        email: 'admin@gmail.com',
        password: 'abc',
        profile: {
            isAdmin: true,
            account: 100
        }
    });

    Accounts.createUser({
        email: 'seller@gmail.com',
        password: 'abc',
        profile: {
            isAdmin: false,
            account: 100
        }
    });

    Accounts.createUser({
        email: 'buyer@gmail.com',
        password: 'abc',
        profile: {
            isAdmin: false,
            account: 100
        }
    });

    var eventID;
    eventID = Events.insert({
        name: 'Выборы президента России 2018 г.',
        tradingStart: new Date('2017-01-11'),
        tradingEnd: new Date('2018-05-01'),
        date: new Date('2018-05-11'),

    });

    var predictionID;
    predictionID = Predictions.insert({
        eventID: eventID,
        name: 'Навальный станет президентом в 2018 г.',
        details: 'Детальные условия контракта'
    });

    Predictions.insert({
        eventID: eventID,
        name: 'Путин станет президентом в 2018 г.',
        details: 'Детальные условия контракта'
    });

}