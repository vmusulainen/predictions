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