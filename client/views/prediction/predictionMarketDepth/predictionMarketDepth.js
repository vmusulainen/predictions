Template.predictionMarketDepth.helpers({
    sellOrders: function () {
        return Orders.find({
            predictionID: this._id,
            type: Constants.Order.Types.sell,
            state: Constants.Order.States.opened
        }, {sort: {price: 1}})
    },
    buyOrders: function () {
        return Orders.find({
            predictionID: this._id,
            type: Constants.Order.Types.buy,
            state: Constants.Order.States.opened
        }, {sort: {price: -1}})
    }
});