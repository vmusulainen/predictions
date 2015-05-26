Template.predictionTrade.helpers({
    hasOpenedOrders: function () {
        return Orders.find({predictionID: this._id, userID: Meteor.userId(), state: Constants.Order.States.opened}).count() != 0;
    },

    openedOrders: function () {
        return Orders.find({predictionID: this._id, userID: Meteor.userId(), state: Constants.Order.States.opened});
    }
});


Template.predictionTrade.events({
    'click #sellButton': function (event, ui) {
        var user = Meteor.user();
        var prediction = Predictions.findOne({_id: this._id});
        var qty = Number($(ui.find('#sellQuantity')).val());
        var price = Number($(ui.find('#sellPrice')).val());
        sellDialog(user, prediction, qty, price);
        return false
    },
    'click #buyButton': function (event, ui) {
        var user = Meteor.user();
        var prediction = Predictions.findOne({_id: this._id});
        var qty = Number($(ui.find('#buyQuantity')).val());
        var price = Number($(ui.find('#buyPrice')).val());
        buyDialog(user, prediction, qty, price);
        return false
    }

});

var sellDialog = function (user, prediction, qty, price) {
    bootbox.dialog({
        title: 'Order Summary',
        message: '<p> You are selling ' + qty + ' long shares for ' + price + ' m฿ each. </p>' +
        '<p>If you don\'t have any long shares to sell when this order is executed, up to ' + qty + ' short shares will be bought for ' + (10 - price) + ' m฿ each.</p>' +
        '<p>The order will expire at 11/30/2015 23:00.</p>',
        buttons: {
            cancel: {
                label: 'Cancel',
                className: "btn-default",
                callback: function (ui) {

                }

            },
            success: {
                label: 'Confirm',
                className: "btn-primary",
                callback: function (ui) {
                    var order = {
                        created: new Date(),
                        userID: user._id,
                        type: Constants.Order.Types.sell,
                        predictionID: prediction._id,
                        quantity: qty,
                        price: price,
                        state: Constants.Order.States.opened
                    };
                    Orders.insert(order);
                }
            }
        }
    })
};

var buyDialog = function (user, prediction, qty, price) {
    bootbox.dialog({
        title: 'Order Summary',
        message: '<p> You are buying ' + qty + ' long shares for ' + price + ' m฿ each. </p>' +
        '<p> If you have short shares when this order is executed, up to ' + qty + 'short shares will be sold for ' + (10 - price) + ' m฿ each.</p>' +
        '<p>The order is good till cancelled.</p>',
        buttons: {
            cancel: {
                label: 'Cancel',
                className: "btn-default",
                callback: function (ui) {

                }

            },
            success: {
                label: 'Confirm',
                className: "btn-primary",
                callback: function (ui) {
                    var order = {
                        created: new Date(),
                        userID: user._id,
                        type: Constants.Order.Types.buy,
                        predictionID: prediction._id,
                        quantity: qty,
                        price: price,
                        state: Constants.Order.States.opened
                    };
                    Orders.insert(order);
                }
            }
        }
    })
};