/**
 * Created by mva on 22/03/15.
 */

Meteor.publish('events', function() {
    return Events.find();
});