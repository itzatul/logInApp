module App.Common {
    export class AppConstants {
        static factory(): AppConstants {
            return new AppConstants();
        }
        public loginApi: Api = new LoginApi();
	}
}
