/**
 * Created by mva on 22/03/15.
 */

Meteor.subscribe('events');

Template.eventList.helpers({
    events: Events.find()
});


Template.eventItem.helpers({
    highestBuy: function () {
        var result = _.chain(this.orders)
            .select(function (each) {
                return each.type === 'buy'
            })
            .max(function (each) {
                return each.price
            })
            .value();
        return result.price;
    },
    lowestSell: function () {
        var result = _.chain(this.orders)
            .select(function (each) {
                return each.type === 'sell'
            })
            .min(function (each) {
                return each.price
            })
            .value();
        return result.price;
    }
});


Template.eventView.helpers({});

Template.eventTopCurrentOrders.helpers({
    buyOrders: function () {
        return _.select(this.orders, function (each) {
            return each.type === 'buy'
        })

    },
    sellOrders: function () {
        return _.select(this.orders, function (each) {
            return each.type === 'sell'
        })

    }
});

Template.eventTrade.events({
    'submit': function (event, template) {
        var order = {}
        order.quantity = event.target.inputQuantity.value;
        order.price = event.target.inputPrice.value;
        order.type = template.find('input:radio[name=type]:checked').value;
        this.orders.push(order);
        Events.update({_id: this._id}, {$set: {orders: this.orders}})
        Router.go('eventView', {_id: this._id});
        return false
    }
})