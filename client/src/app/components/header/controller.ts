module App {
    import Services = Core.Services;
    import NetworkService = Core.Services.NetworkService;
    import RouterService = Core.Services.RouterService;
    import StorageService = Core.Services.StorageService;

    export class HeaderController extends ComponentController {
        static controllerName = 'HeaderController';
        static $inject: string[] = ['$scope', '$location','networkService','routerService','storageService'];
        private $scope: ng.IScope;
        private $storage: StorageService;
        private $network: NetworkService;
        private $router: RouterService;
        private loggedInUser :Object = {};
        isOpen = false;
        private session:any;
        userName: string = '';
        toggleDropdown() {
            this.isOpen = !this.isOpen;
        }
        private $location: ng.ILocationService;
        constructor($scope: ng.IScope, $location: ng.ILocationService, public networkService: Services.NetworkService, routerService: Services.RouterService, storageService: Services.StorageService) {
            super()
            this.$scope = $scope;
            this.$location = $location;
            this.$storage = storageService;
            this.$router = routerService;
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
        //Log out
        onLogOut() {
            //clear the session 
            this.loggedInUser = {};
            this.$storage.setItem('userInfo',"",false);
            this.$storage.setItem('access_token',"",false);
            //redirect user to login page
            this.$router.$location.url(`/`);
        }
        onLogIn(){
            this.$router.$location.url(`/login`);
        }
    }
}