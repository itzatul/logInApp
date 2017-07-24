module App {
    import Services = Core.Services;
    import RouterService = Core.Services.RouterService;
    import StorageService = Core.Services.StorageService;

    export class LoginController {
        static controllerName = 'LoginController';
        static $inject: string[] = ['routerService', 'storageService', LoginService.serviceName, '$scope'];
        private $router: RouterService;
        private $storage: StorageService;
        private $loginService: LoginService;
        public user:any;
        constructor(
            routerService: Services.RouterService,
            storageService: StorageService,
            loginService: LoginService,
            $scope: ng.IScope
            ) {
                this.$router = routerService;
                this.$loginService = loginService;
                this.$storage = storageService;
                if(this.$storage.getItem('userInfo',false)) {
                    this.$router.$location.url(`/account`);
                }
        }
        loginSubmit(){
            if(this.user.username === undefined || this.user.password === undefined){
                return;
            }
            this.$loginService.validateUser(this.user)
            .then(() => {
                if(this.$storage.getItem('userInfo',false) != 'undefined' && this.$storage.getItem('userInfo',false) != null ){
                    this.$router.$location.url(`/account`);
                }
                else{
                    this.$router.$location.url(`/login`);
                }
            });
        }
        cancel(){
             this.$router.$location.url(`/`);
        }
    }
}