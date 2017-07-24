/// <reference path="../../../typings/app.d.ts" />
/// <reference path="../../../typings/tsd.d.ts" />

module Core.Services {

	export class RouterService {

		static $inject: Array<string> = ['$location', '$routeParams', '$route'];

        constructor(public $location: ng.ILocationService, public $routeParams: any, public $route: ng.route.IRouteService ) {

        }

        getCurrentRoute(): string {
            return (<any>this.$route.current).$$route.originalPath as string;
        }

        redirectTo(route: string) {
            if (route[0] !== '/') route = '/' + route;
            window.location.replace(window.location.origin + window.location.pathname + '#' + route);
        }

		routeToPage(pageName: string): void {
			pageName = '/' + pageName;
			this.$location.path(pageName);
		}

		getRouteParameter<T>(name: string): T {
			return this.$routeParams[name] as T;
        }

        updateParams(params: any) {
            return this.$route.updateParams(params);
        }

        reload(): void {
            this.$route.reload();
        }
	}

}