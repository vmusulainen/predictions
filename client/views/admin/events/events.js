Template.adminEventList.helpers({
    events: function () {
        return Events.find()
    },
    predictionCount: function () {
        return Predictions.find({eventID: this._id}).count()
    }

});