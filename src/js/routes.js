;
/*
    ANGULAR ROUTES for Single Page Applications
 */

// TODO: Customize
templateApp.config(function($routeProvider) {

    $routeProvider
        .when('/', {
            templateUrl: 'routes/home.html',
            controller: 'homeController'
        });

});