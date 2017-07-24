/// <reference path="../../../typings/app.d.ts" />
/// <reference path="../../../typings/tsd.d.ts" />


module Core.Services {

	export class NetworkService {
		static $inject: Array<string> = ['$http', '$log','$q', 'storageService'];
		constructor(public $http: ng.IHttpService, public $log: ng.ILogService, public $q: ng.IQService, public $storage: StorageService) {
		}

		private onError(error: any): void {
			// generic handling for all error, including authorization realted stuff
			this.$log.error(error);
		}

		private getConfig(url: string, config?: ng.IRequestShortcutConfig): ng.IRequestConfig {
			var httpConfig = <ng.IRequestConfig>{};

			if(!this.isAuthTokenInHeaders()) {
				var accessToken = this.$storage.getItem('access_token', false);
				if(accessToken) {
					this.setAccessToken(accessToken);
				}
			}

			if (config != null) {
				angular.extend(httpConfig, config);
			}
			httpConfig.url = url;
			return httpConfig;
		}

		private getOrDelete<T>(url: string, methodType: string, config?: ng.IRequestShortcutConfig): ng.IPromise<T> {

			var httpConfig = this.getConfig(url, config);
			httpConfig.method = methodType;
			return this.getResponse<T>(httpConfig);
		}

		private getResponse<T>(config: ng.IRequestConfig): ng.IPromise<T> {
            config.withCredentials = false;
            var deferred = this.$q.defer();

			this.$http(config).success(
				(result : any) => {
					deferred.resolve(result);
				}).error( error => {
					this.onError(error);
					deferred.reject(error);
				});

			return deferred.promise;
		}

		setAccessToken(token: string) {
			this.$http.defaults.headers.common.Authorization = 'bearer ' + token;
		}

		isAuthTokenInHeaders() {
			return this.$http.defaults.headers.common.Authorization;
		}

		get<T>(url: string, config?: ng.IRequestShortcutConfig): ng.IPromise<T> {

				//this.$http.get(url);
			return this.getOrDelete<T>(url, 'GET', config);
			// var httpConfig = this.getConfig(url, config);
			// httpConfig.method = "GET";
			// return this.getResponse(httpConfig);
		}

		delete<T>(url: string, config?: ng.IRequestShortcutConfig): ng.IPromise<T> {

			return this.getOrDelete<T>(url, 'DELETE', config);
		}

        post<T>(url: string, data: any, config?: ng.IRequestShortcutConfig): ng.IPromise<T> {
            const httpConfig = this.getConfig(url, config);
            httpConfig.method = 'POST';
            httpConfig.data = data;
            if (!data || !data.constructor || (data.constructor.name !== 'FormData'))
                return this.getResponse<T>(httpConfig);
            httpConfig.transformRequest = angular.identity;
            httpConfig.headers = { 'Content-Type': undefined };
            return this.getResponse<T>(httpConfig);
        }

		put<T>(url: string, data: any, config?: ng.IRequestShortcutConfig): ng.IPromise<T> {

			var httpConfig = this.getConfig(url, config);
			httpConfig.method = 'PUT';
			httpConfig.data = data;
			return this.getResponse<T>(httpConfig);
		}

		patch<T>(url: string, data: any, config?: ng.IRequestShortcutConfig): ng.IPromise<T> {

			var httpConfig = this.getConfig(url, config);
			httpConfig.method = 'PATCH';
			httpConfig.data = data;
			return this.getResponse<T>(httpConfig);
		}
	}
}