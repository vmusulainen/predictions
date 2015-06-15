Template.adminPredictionList.helpers({
    predictions: function () {
        return Predictions.find()
    },
    eventName: function(){return Events.findOne(this.eventID).name},
    truly: function(){if (this.truly === undefined) {
        return 'Not yet come'
    }
    return this.truly ? i18n('came true') : i18n('came false') }
})