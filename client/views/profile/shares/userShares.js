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