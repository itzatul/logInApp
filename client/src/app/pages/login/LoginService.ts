module App {
    import NetworkService = Core.Services.NetworkService;
    import StorageService = Core.Services.StorageService;
    import ToasterService = ngtoaster.IToasterService;

    export class LoginService {
        static $inject: string[] = ['networkService', 'storageService', 'toaster'];
        static serviceName = 'LoginService';
        private $network: NetworkService;
        private $storage: StorageService;
        private $toaster: ToasterService;
        private $api: string;
        public isUserLoggedIn: boolean;
        public session: any = {};
        constructor(
            networkService: NetworkService,
            storageService: StorageService,
            toasterService: ToasterService) {
            this.$toaster = toasterService;
            this.$network = networkService;
            this.$storage = storageService;
            this.$api = Common.AppConstants.factory().loginApi.url;
        }
        validateUser(userData: any): Promise<any[]> {
            userData.grant_type = 'password';
            const config = {
                headers: {
                    'Content-type': 'application/x-www-form-urlencoded'
                }
            };

            return this.$network
            .post(this.$api, $.param(userData), config)
                .then(response => {
                    this.$storage.setItem('userInfo',response['user'],false);
                    this.$storage.setItem('access_token',response['access_token'],false);
                })
                .catch((error) => {
                    this.$toaster.error(error);
                    return undefined as any[];
                });
        }
        setAccessToken(token: string) {
            this.$network.setAccessToken(token);
        }
    }
}