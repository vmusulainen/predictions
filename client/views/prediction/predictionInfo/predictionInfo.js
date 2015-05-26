Template.predictionInfo.helpers({
    event: function () {
        return Events.findOne(this.eventID)
    }
});