module App {
    export class UserAccountPage extends Page {
        static directiveName = 'userAccountPage';
        controller = UserAccountPageController.controllerName;
        templateUrl = 'templates/pages/user-account/template.html';
    }
}