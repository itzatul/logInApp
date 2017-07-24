/// <reference path="../../typings/app.d.ts" />
/// <reference path="../../typings/tsd.d.ts" />


module Core {
    'use strict';
    ((): void => {

        var coremodule = angular.module('app.core', [])
            .service('networkService', Services.NetworkService)
            .service('routerService', Services.RouterService)
            .service('storageService', Services.StorageService)
            .service('viewService', Services.ViewService);

        //coremodule.config(['$httpProvider', ($httpProvider: ng.IHttpProvider) => {
        //    $httpProvider.interceptors.push($q => ({
        //        'responseError': reason => {
        //            const deferred = $q.defer();
        //            if (reason.status === 401 || reason.status === 403) alert('Access denied');
        //            deferred.reject(reason);
        //            return deferred.promise;
        //        }
        //    }));
        //}]);
    })();
}