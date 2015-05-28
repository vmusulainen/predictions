Template.editPrediction.helpers({
    events: function () {
        return Events.find({})
    },

    selected: function (a, b) {
        return (a === b) ? 'selected' : undefined
    },

    predictionTruly: function () {
        return this.truly ? 'checked' : undefined
    }
});

Template.editPrediction.events({
    'submit form': function (event, ui) {
        event.preventDefault();

        var prediction;
        if (this) {
            prediction = this;
        }
        else {
            prediction = {}
            prediction.userID = Meteor.userId();
        }
        prediction.name = $(event.target).find('[name="prediction"]').val();
        prediction.eventID = $(event.target).find('[name="event"]').val();
        if ($(event.target).find('[name="event-occurred"]').is(":checked")) {
            prediction.truly = $(event.target).find('[name="truly"]').is(":checked");
        }
        else {
            prediction.truly = prediction.truly
        }
        Predictions.upsert({_id: prediction._id}, prediction);

        Router.go('managePredictions');
    },

    'click [name="event-occurred"]': function (event, ui) {
        $(ui.find('#truly')).toggleClass('invisible');
    }
});