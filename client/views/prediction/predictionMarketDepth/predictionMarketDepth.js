Template.predictionMarketDepth.helpers({
    sellOrders: function () {
        return Orders.find({predictionID: this._id, type: 'sell'}, {sort: {price: 1}})
    },
    buyOrders: function () {
        return Orders.find({predictionID: this._id, type: 'buy'}, {sort: {price: -1}})
    }
});