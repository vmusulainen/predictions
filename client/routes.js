/**
 * Created by mva on 22/03/15.
 */

Router.configure({
    loadingTemplate: 'loading',
    notFoundTemplate: 'notFound',
    layoutTemplate: 'layout'
});

Router.route('eventList', {path: '/'});
Router.route('eventView', {path: 'events/:_id', data: function() {return Events.findOne(this.params._id);}});
Router.route('eventTrade', {path: 'events/:_id/trade',  data: function() {return Events.findOne(this.params._id);}});