Market = {};

Market.increaseUserBalance = function (aUser, value) {
    aUser.profile.account = aUser.profile.account + value;
    Meteor.users.update({_id: aUser._id}, {$set: {profile: aUser.profile}});
};

Market.decreaseUserBalance = function (aUser, value) {
    aUser.profile.account = aUser.profile.account - value;
    Meteor.users.update({_id: aUser._id}, {$set: {profile: aUser.profile}});
}

Market.putOnPredictionDeposite = function (aUser, aPrediction, value) {
    Market.decreaseUserBalance(aUser, value);
    Deposits.insert({userID: aUser._id, predictionID: aPrediction._id, sum: value});
};

Market.issueShortShares = function (aUser, prediction, qty) {
    var shares = {predictionID: prediction._id, userID: aUser._id, quantity: qty};
    shares._id = Shares.insert(shares);
    return shares;
};

Market.issueAdditionalShortShares = function (aUser, prediction, qty, shares) {
    shares.quantity = shares.quantity + qty;
    Shares.update({_id: shares._id}, {$set: {quantity: shares.quantity}});
};

Market.transferMoneyBetweenUsers = function (fromUser, toUser, sum) {
    Market.increaseUserBalance(toUser, sum);
    Market.decreaseUserBalance(fromUser, sum);
};

Market.processMatchedOrders = function (sellOrder, buyOrder) {

    var seller = Meteor.users.findOne({_id: sellOrder.userID});
    var buyer = Meteor.users.findOne({_id: buyOrder.userID});
    var prediction = Predictions.findOne({_id: buyOrder.predictionID});
    var orderQty = buyOrder.quantity;
    var orderSum = buyOrder.price * orderQty;

    Market.transferMoneyBetweenUsers(buyer, seller, orderSum);

    var shares = Shares.findOne({_userID: seller._id, predictionID: prediction._id});
    // Has seller shares?
    if (shares == undefined) {
        // Seller hasn't  shares at all
        var totalSum = orderQty * Constants.Shares.pricePerEach;
        var depositeSum = totalSum - orderSum;
        Market.putOnPredictionDeposite(seller, prediction, depositeSum);
        shares = Market.issueShortShares(seller, prediction, orderQty);
    }
    else {
        var inStock = shares.quantity;
        var shortage = orderQty - inStock;
        if (shortage > 0) {
            // Seller hasn't enough shares
            var sum = shortage * Constants.Shares.pricePerEach;
            Market.putOnPredictionDeposite(seller, sum);
            Market.issueAdditionalShortShares(seller, prediction, shortage, shares);
        }
    }
    shares.userID = buyer._id;
    console.log(shares);
    Shares.update({_id: shares._id}, {$set: {userID: shares.userID}});
    Orders.update({_id: buyOrder._id}, {$set: {state: Constants.Order.States.closed}});
    Orders.update({_id: sellOrder._id}, {$set: {state: Constants.Order.States.closed}});
};

Market.processBuyOrder = function (anOrder) {
    var matchedOrder = Orders.findOne({
        predictionID: anOrder.predictionID,
        type: Constants.Order.Types.sell,
        price: anOrder.price,
        quantity: anOrder.quantity,
        state: Constants.Order.States.opened
    });
    if (matchedOrder == undefined) {
        console.log('Matched order is not found'.blue);
        return;
    }
    Market.processMatchedOrders(matchedOrder, anOrder);
};

Market.processSellOrder = function (anOrder) {
    var matchedOrder = Orders.findOne({
        predictionID: anOrder.predictionID,
        type: Constants.Order.Types.buy,
        price: anOrder.price,
        quantity: anOrder.quantity,
        state: Constants.Order.States.opened
    });
    if (matchedOrder == undefined) {
        console.log('Matched order is not found'.blue);
        return;
    }
    Market.processMatchedOrders(anOrder, matchedOrder);
};