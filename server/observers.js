Orders.find().observe({
    added: function (anOrder) {
        if (anOrder.state == Constants.Order.States.closed) {
            console.log('Order is already closed'.grey);
        }
        else {
            console.log('Order was added'.blue, anOrder);
            if (anOrder.type == Constants.Order.Types.sell) {
                Market.processSellOrder(anOrder);
            }
            else {
                Market.processBuyOrder(anOrder);
            }
        }
    }
});