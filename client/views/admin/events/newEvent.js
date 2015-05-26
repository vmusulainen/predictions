Template.newEvent.onRendered(function () {
    this.$('.datetimepicker').datetimepicker();
});

Template.newEvent.helpers({
    eventStates: function () {
        return Constants.Event.States
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
        newEvent.state = $(event.target).find('[name="state"]').val();
        newEvent.userID = Meteor.userId();

        console.log(newEvent);
        Events.insert(newEvent);
        Router.go('manageEvents');
    }
});

