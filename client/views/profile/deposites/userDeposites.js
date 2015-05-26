Template.userDeposites.helpers({
    deposites: function () {
        return Deposites.find({userID: Meteor.userId()});
    },
    deposite: function(){
        var deposite = {};
        deposite.sum = this.sum;
        deposite.prediction = Predictions.findOne({_id: this.predictionID});
        deposite.event = Events.findOne(deposite.prediction.eventID);
        return deposite;
    }
});