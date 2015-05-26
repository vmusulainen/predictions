Template.newPrediction.helpers({
    events: function(){return Events.find()}
});

Template.newPrediction.events({
    'submit form': function (event, ui) {
        event.preventDefault();


        var newPrediction = {};
        newPrediction.name = $(event.target).find('[name="prediction"]').val();
        newPrediction.eventID = $(event.target).find('[name="event"]').val();
        newPrediction.userID = Meteor.userId();

        console.log(newPrediction);
        Predictions.insert(newPrediction);
        Router.go('managePredictions');
    }
});