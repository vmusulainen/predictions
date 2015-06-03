Router.configure({
    layoutTemplate: 'layout',
    loadingTemplate: 'loading',
    notFoundTemplate: 'notFound'
});

Router.route('home', {path: '/', template: 'eventList'});
Router.route('events', {path: '/events', template: 'eventList'});

Router.route('predictionInfo', {
        path: '/predictions/:_id/info',
        template: 'predictionInfoWrapper',
        data: function () {
            return Predictions.findOne(this.params._id)
        }
    }
);

Router.route('predictionTrade', {
        path: '/predictions/:_id/trade',
        template: 'predictionTradeWrapper',
        data: function () {
            return Predictions.findOne(this.params._id)
        }
    }
);

Router.route('predictionMarketDepth', {
        path: '/predictions/:_id/marketDepth',
        template: 'predictionMarketDepthWrapper',
        data: function () {
            return Predictions.findOne(this.params._id)
        }
    }
);

Router.route('profile', {
        path: '/profile',
        template: 'profile'
    }
);

Router.route('manageUsers', {
        path: '/admin/users',
        template: 'adminUserList'
    }
);

Router.route('manageEvents', {
        path: '/admin/events',
        template: 'adminEventList'
    }
);

Router.route('newEvent', {
        path: '/admin/events/new',
        template: 'newEvent'
    }
);

Router.route('managePredictions', {
        path: '/admin/predictions',
        template: 'adminPredictionList'
    }
);

Router.route('newPrediction', {
        path: '/admin/predictions/new',
        template: 'editPrediction'
    }
);

Router.route('editPrediction', {
    path: '/predictions/:_id/edit', template: 'editPrediction', data: function () {
        return Predictions.findOne(this.params._id);
    }
});