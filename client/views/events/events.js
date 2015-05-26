Template.eventList.helpers({
    events: function () {
        return Events.find()
    },
    predictions: function () {
        return Predictions.find({eventID: Session.get('selectedEventID')});
    },
    predictionCount: function () {
        return Predictions.find({eventID: this._id}).count()
    },
    isActive: function () {
        return this._id == Session.get('selectedEventID');
    }

});

Template.eventList.events({
    'click .event': function () {
        Session.set('selectedEventID', this._id);
    }
})

