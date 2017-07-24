module App {
    import Services = Core.Services;
    import StorageService = Core.Services.StorageService;

    export class UserAccountPageController {
        static controllerName = 'UserAccountPageController';
        static $inject: string[] = ['$scope','storageService'];
        private $scope: ng.IScope;
        private $storage: StorageService;
        private loggedInUser :Object = {};
        userName: string = '';

        constructor($scope: ng.IScope, storageService: Services.StorageService) {
            this.$scope = $scope;
            this.$storage = storageService;
            this.loggedInUser = this.$storage.getItem('userInfo',false);
            this.$scope
            .$on('$locationChangeStart', () =>
                    this.$scope.$applyAsync(() => this.onLocationChanged()));
            this.onLocationChanged();
        }
         onLocationChanged() {
            this.loggedInUser = this.$storage.getItem('userInfo',false);
            if(this.loggedInUser)
                this.userName = this.loggedInUser['FirstName'] + " " + this.loggedInUser['LastName'];
        }
    }
}