/**
 * Created by mva on 22/03/15.
 */

Meteor.subscribe('events');

Template.eventList.helpers({
    events: Events.find()
});


Template.eventItem.helpers({
    saleOffers: function(){return _.select(this.offers, function(each){return each.type === 'buy'} )},
    buyOffers:  function(){return _.select(this.offers, function(each){return each.type === 'sale'} )}
});