/**
 * Created by mva on 22/03/15.
 */

if (Events.find().count() === 0) {
    Events.insert({
        title: 'War with the Martians will begin before the end of 2015 year',
        offers: [{type: 'buy', qty: 100, price: 0.4}, {type: 'sale', qty: 100, price: 0.6}]
    });

    Events.insert({
        title: 'Red Socks will win at July',
        offers: []
    });

    Events.insert({
        title: 'The movie "Territory" will be the best movie of 2015 year',
        offers: []
    });
}

