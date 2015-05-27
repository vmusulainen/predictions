Template.newEvent.onRendered(function () {
    this.$('.datetimepicker').datetimepicker();
});

Template.newEvent.helpers({
    eventStates: function () {
        var states = [];
        return states;
    }
});

Template.newEvent.events({
    'submit form': function (event, ui) {
        event.preventDefault();
        var newEvent = {};
        newEvent.name = $(event.target).find('[name="name"]').val();
        newEvent.tradingStart = new Date($(event.target).find('[name="tradingStart"]').val());
        newEvent.tradingEnd = new Date($(event.target).find('[name="tradingEnd"]').val());
        newEvent.date = new Date($(event.target).find('[name="date"]').val());
        newEvent.state = Constants.Event.States.inactive;
        newEvent.userID = Meteor.userId();
        Events.insert(newEvent);
        Router.go('manageEvents');
    }
});

