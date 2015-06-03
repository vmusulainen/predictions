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

Predictions.find().observe({
    changed: function (newPrediction, oldPrediction) {

        if (newPrediction.truly === undefined) {
             return
        }

        var deposites = Deposits.find({predictionID: newPrediction._id}).fetch();
        var shares = Shares.find({predictionID: newPrediction._id}).fetch();

        _.each(deposites, function(aDeposite){
            if (!newPrediction.truly) {
                var user = Meteor.users.findOne(aDeposite.userID);
                Market.increaseUserBalance(user, aDeposite.sum);
            }
            console.log('removing', aDeposite)
            Deposits.remove(aDeposite._id);
        });

        _.each(shares, function(aShare){
            if (newPrediction.truly) {
                var user = Meteor.users.findOne(aShare.userID);
                Market.increaseUserBalance(user, aShare.quantity * Constants.Shares.pricePerEach);
            }
            console.log('removing', aShare);
            Shares.remove(aShare._id);
        });
    }
});