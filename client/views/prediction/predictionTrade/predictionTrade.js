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
        title: i18n("Order Summary"),
        message: "<p>" + i18n("You are selling N long shares for M each", qty, price) + "</p>" +
        "<p>" + i18n("WarningAboutShortShares", qty, (10 - price)) + "</p>",
        buttons: {
            cancel: {
                label: i18n("Cancel"),
                className: "btn-default",
                callback: function (ui) {

                }

            },
            success: {
                label: i18n("Confirm"),
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
        title: i18n("Order Summary"),
        message: "<p>" + i18n("You are buying N long shares for M each", qty, price) + "</p>" +
        "<p>" + i18n("WarningAboutShortSharesInOwn", qty, (10 - price)) + "</p>",
        buttons: {
            cancel: {
                label: i18n("Cancel"),
                className: "btn-default",
                callback: function (ui) {

                }

            },
            success: {
                label: i18n("Confirm"),
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