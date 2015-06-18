Template.predictionTrade.helpers({
    hasOpenedOrders: function () {
        return Orders.find({
                predictionID: this._id,
                userID: Meteor.userId(),
                state: Constants.Order.States.opened
            }).count() != 0;
    },

    openedOrders: function () {
        return Orders.find({predictionID: this._id, userID: Meteor.userId(), state: Constants.Order.States.opened});
    }
});


Template.predictionTrade.events({

    "keyup form": function (event, ui) {
        var quantityValue = $(event.target).closest('form').find('.quantity').val();
        var priceValue = $(event.target).closest('form').find('.price').val();
        var errorDisplayingElement = $(event.target).closest('div.well').find('.validation-error');
        var buttonElement = $(event.target).closest('form').find('button.btn');
        validateInput(quantityValue, priceValue, errorDisplayingElement, buttonElement);
    },


    "keyup .price": function (event, ui) {
        var inputElement = $(event.target).closest('form').find('.price');

        var errorDisplayingElement = $(event.target).closest('div.well').find('.validation-error');
        var buttonElement = $(event.target).closest('form').find('button.btn');

        var value = inputElement.val();
        var qty = Number(value);

        if ((value != '') && ((isNaN(qty) || (qty <= 0)))) {
            errorDisplayingElement.removeClass('invisible');
            errorDisplayingElement.text(i18n("The price must be between 0 and 1.0"));
            buttonElement.addClass('disabled');
        } else {
            errorDisplayingElement.addClass('invisible');
            buttonElement.removeClass('disabled');
            errorDisplayingElement.text("&nbsp");
        }
    },

    'click button.sell': function (event, ui) {
        var user = Meteor.user();
        var prediction = Predictions.findOne({_id: this._id});
        var qty = Number($(ui.find('form.sell input.quantity')).val());
        var price = Number($(ui.find('form.sell input.price')).val());
        sellDialog(user, prediction, qty, price);
        return false
    },

    'click button.buy': function (event, ui) {
        var user = Meteor.user();
        var prediction = Predictions.findOne({_id: this._id});
        var qty = Number($(ui.find('form.buy input.quantity')).val());
        var price = Number($(ui.find('form.buy input.price')).val());
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

var validateInput = function (qtyValue, priceValue, errorElement, button) {

    var canPressButton = true;

    if ((qtyValue === '') && (priceValue === '')) {
        errorElement.addClass('invisible');
        errorElement.text("&nbsp");
        button.addClass('disabled');
        return;
    }

    if (qtyValue != '') {
        var qty = Number(qtyValue);
        if ((isNaN(qty) || (qty <= 0))) {
            errorElement.removeClass('invisible');
            errorElement.text(i18n("The quantity must be an integer greater than 0"));
            button.addClass('disabled');
            return;
        }
    }
    else {
        canPressButton = false;
    }

    if (priceValue != '') {
        var price = Number(priceValue);
        if ((isNaN(price) || (price <= 0) || (price > 1))) {
            errorElement.removeClass('invisible');
            errorElement.text(i18n("The price must be between 0 and 1.0"));
            button.addClass('disabled');
            return;
        }
    }
    else {
        canPressButton = false;
    }

    errorElement.addClass('invisible');
    errorElement.text("&nbsp");

    canPressButton === true ? button.removeClass('disabled') : button.addClass('disabled');

};