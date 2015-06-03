Template.profile.helpers({
    balance: function () {
        return Meteor.user() && Meteor.user().profile.account;
    }
});

Template.userShares.helpers({
    shares: function () {
        return Shares.find({userID: Meteor.userId()});
    },
    prediction: function () {
        return Predictions.findOne({_id: this.predictionID});
    },
    event: function () {
        var prediction = Predictions.findOne({_id: this.predictionID});
        return Events.findOne({_id: prediction.eventID});
    }
});

Template.userDeposits.helpers({
    deposites: function () {
        return Deposits.find({userID: Meteor.userId()});
    },
    deposite: function () {
        var deposite = {};
        deposite.sum = this.sum;
        deposite.prediction = Predictions.findOne({_id: this.predictionID});
        deposite.event = Events.findOne(deposite.prediction.eventID);
        return deposite;
    }
});

Template.userOpenedOrders.helpers({
    openedOrders: function () {
        return Orders.find({userID: Meteor.userId(), state: 'opened'});
    },
    order: function () {
        var order = {};
        order.quantity = this.quantity;
        order.price = this.price;
        order.type = this.type;
        order.prediction = Predictions.findOne({_id: this.predictionID});
        order.event = Events.findOne(order.prediction.eventID);
        return order
    }
});