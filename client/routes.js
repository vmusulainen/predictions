/**
 * Created by mva on 22/03/15.
 */
Router.route('main', {path: '/'});
Router.route('eventView', {path: 'events/:_id', template: 'eventView', data: function() {return Events.findOne(this.params._id);}});