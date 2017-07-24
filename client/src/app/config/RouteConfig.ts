/// <reference path="../../../typings/app.d.ts" />
/// <reference path="../../../typings/tsd.d.ts" />

// Fix IRoute declaration
declare namespace angular.route {
    export interface IRoute {
        label?: string;
    }
}

module App {
    import RouteProvider = ng.route.IRouteProvider;
    import LocationProvider = ng.ILocationProvider;

    export class RouteConfig {
        static $inject: Array<string> = ['$routeProvider', '$locationProvider'];
        private $routeProvider: RouteProvider;
        private $locationProvider: LocationProvider;

        constructor($routeProvider: RouteProvider, $locationProvider: LocationProvider) {
            this.$routeProvider = $routeProvider;
            this.$locationProvider = $locationProvider;
            const resolve = undefined; // AuthorizationService.resolve;

            this.$routeProvider

                .when('/login', {
                    template: '<login />',
                    label: 'login',
                })
                .when('/account', {
                    template: '<user-account-page />',
                    label: 'User'
                })
                .when('/', {
                    template: '<home-page />',
                    label: 'Home',
                })
                
            this.$locationProvider.html5Mode({
                enabled: false,
                requireBase: false
            });
        }
    }

}