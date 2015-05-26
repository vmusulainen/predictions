Template.adminPredictionList.helpers({
    predictions: function () {
        return Predictions.find()
    },
    eventName: function(){return Events.findOne(this.eventID).name}
})