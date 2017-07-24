module App {
    export class Login extends Page {
        static directiveName = 'login';
        controller = LoginController.controllerName;
        templateUrl = 'templates/pages/login/template.html';
    }
}