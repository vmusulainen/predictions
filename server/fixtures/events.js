if (Events.find().count() === 0) {
    Events.insert({
        title: 'War with the Martians will begin before the end of 2015 year',
        longDescription: 'This contract  pays $1 if a war with Martians will begin before 2016.01.01, otherwise this contract pays $0',
        judgingCriteria: 'The purpose of this contract is to forecast the probability that a war with Martians will begin before the end of 2015 year.',
        orders: [{type: 'buy', quantity: 100, price: 0.4}, {type: 'sell', quantity: 100, price: 0.6}]
    });

    Events.insert({
        title: 'Red Socks will win at July',
        longDescription: '',
        judgingCriteria: '',
        orders: []
    });

    Events.insert({
        title: 'The movie "Territory" will be the best movie of 2015 year',
        longDescription: '',
        judgingCriteria: '',
        orders: []
    });
}

